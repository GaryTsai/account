import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import utils from "../../utils/dateFormat";
import eventEmitter from "../../eventTracking/eventEmitter";
import DetailOfMonth from "../detailOfMonth";
const initialState = {
  AnnualCost: 0,
  AnnualMonthCost: "",
  monthItems: [],
  annualMonth: [],
  monthDetailClick: false,
  toggleIndex: []
};
class AnnualExpense extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  setAnnualCost = (result) => {
    if (!result) return;
    const cost = {};
    Object.keys(result).map((y) => {
      let accumulator = 0;
      Object.keys(result[y]).map((v, idx) => (accumulator += result[y][idx]));
      return (cost[y] = parseInt(accumulator));
    });
    this.setState({ AnnualCost: cost });
  };

  annualMonthCost = () => {
    const { allitems } = this.props;
    if (!allitems) return;
    const initYear = allitems[allitems.length-1] && allitems[allitems.length-1].date.slice(0,4)
    let result = {};
    let dateYear = new Date().getFullYear() + "-";
    const month = new Date().getMonth();
    for (let y = initYear; y <= parseInt(dateYear); y++) {
      result[y.toString()] = {};
      const endMonth = parseInt(y) === parseInt(dateYear) ? month + 1 : 12;
      for (let m = 1; m <= endMonth; m++) {
        result[y.toString()][m - 1] = 0;
        let dateYearAndMonth = y.toString() + "-" + utils.toDualDigit(m);
        let filterMonthItem = allitems.filter(function (item) {
          return item.date.includes(dateYearAndMonth);
        });
        for (let i = 0; i < filterMonthItem.length; i++) {
          result[y][m - 1] += parseInt(filterMonthItem[i].itemValue);
        }
      }
    }
    this.setState({ AnnualMonthCost: result});
    this.setAnnualCost(result);
  };

  componentDidMount() {
    this.annualMonthCost();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allitems === this.props.allitems) return;
    else {
      this.annualMonthCost();
    }
  }

  detailOfMonth = (dateArray) => {
    const { allitems } = this.props;
    const days = utils.days(dateArray[0], dateArray[1] + 1);
    const dateAndMonth = utils.format(dateArray[0], dateArray[1]);
    let array = {};
    for (let d = 1; d <= days; d++) {
      let dateOfTheMonth = dateAndMonth + "-" + utils.toDualDigit(d);
      let filterMonthItem = allitems.filter(function (item) {
        return item.date.includes(dateOfTheMonth);
      });
      if (filterMonthItem.length !== 0) {
        array[d] = filterMonthItem;
      }
    }

    eventEmitter.dispatch("detailOfMonth", dateAndMonth.toString());
    this.setState({
      monthItems: array,
      annualMonth: dateArray,
      monthDetailClick: true,
    });
  };
  
  handleToggleIndex = idx =>{
    const { toggleIndex } = this.state;
    console.log(toggleIndex);
    if(toggleIndex.includes(idx)){
      toggleIndex.splice(toggleIndex.indexOf(idx), 1);
    }else{
      toggleIndex.push(idx)
    }
    this.setState({toggleIndex})
  }

  render() {
    const {
      AnnualCost,
      AnnualMonthCost,
      monthItems,
      annualMonth,
      monthDetailClick,
      toggleIndex
    } = this.state;

    return (
      <div
        style={{ display: "inline-block", textAlign: "left", width: "100%", height: window.innerHeight - 88,
        overflowY: "scroll", position: "relative"}}
      >
        {!monthDetailClick &&
          Object.keys(AnnualMonthCost).map((key, idx) => (
            <div key={"AnnualCost" + key}>
              {AnnualCost[key] !== 0 && (
                <li style={{ listStyleType: "none", ...styles.styleOfYear }} onClick={()=> this.handleToggleIndex(idx)}>
                  {key + "年 : "}
                  {AnnualCost[key]}$NT
                </li>
              )}
              <styles.MonthContainer show={toggleIndex.includes(idx)} >{Object.keys(AnnualMonthCost[key]).map(
                (month, idx) =>
                  AnnualMonthCost[key][idx] !== 0 && (
                    <styles.MonthExpense
                      key={"monthOfCost" + key + idx}
                      onClick={() => this.detailOfMonth([key, idx])}
                    >
                      {parseInt(month) +
                        1 +
                        "月 : " +
                        AnnualMonthCost[key][month]}
                      $NT
                    </styles.MonthExpense>
                  )
              )}</styles.MonthContainer> 
            </div>
          ))}
        {monthDetailClick && (
          <DetailOfMonth monthItems={monthItems} annualMonth={annualMonth} />
        )}
      </div>
    );
  }
}
export default connect(({ itemList }) => ({
  allitems: itemList.allitems,
}))(AnnualExpense);
