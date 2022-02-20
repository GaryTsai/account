import React from 'react';
import styles from "./styles";
import utils from "../../utils/dateFormat";


const dailyCost = (cost_data) =>{
  if(!cost_data) return 
  let total_cost = 0;
  cost_data.map((c, idx) => (
    total_cost += parseInt(c.itemValue)
  ));

  return total_cost;
};

const DetailOfMonth = ({monthItems , annualMonth}) =>{
  return (
    <div style={{display: 'inline-block', textAlign: 'left', width: '100%'}}>
      <li style={{listStyleType: 'none', ...styles.styleOfYearMonth}}>{utils.format(annualMonth[0], annualMonth[1])}</li>
      {Object.keys(monthItems).reverse().map((c, idx) => (
        <div key={'monthCost' + idx}>
          <li style={{listStyleType: 'none', ...styles.styleOfDate}}>{c+ ' :'}<div style={styles.dailyCost} >{'    ' + dailyCost(monthItems[c])}</div></li>
          {Object.keys(monthItems[c]).reverse().map((item, idx2) => (
            <li style={{listStyleType: 'none', ...styles.styleOfItem}} key={'item' + idx2}>
              <span>{monthItems[c][item].itemClass + ':'}</span>
              <span>{(monthItems[c][item].itemContent ? (monthItems[c][item].itemContent + '') : '')}</span>
              <span>{monthItems[c][item].itemValue + '$NT'}</span>
              <span><img onClick={() => this.deleteItem(monthItems[c][item].timestamp)} style={styles.deleteIcon}
                         alt="delete item" src={require('../../assets/img/item-delete.png')}/></span>
            </li>
          ))}
        </div>
      ))}

    </div>
  )
}

export default DetailOfMonth