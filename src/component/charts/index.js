import React, { Component } from "react";
import { connect } from "react-redux";
import Radium from "radium";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import "react-circular-progressbar/dist/styles.css";
import html2canvas from "html2canvas";
import DatePicker from "react-mobile-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import saveAs from "file-saver";
import utils from "../../utils/dateFormat";
import browserUtils from "../../utils/browserUtils";

import styles from "./styles";
var chart;

const initialState = {
  dailyExpenseOfMonth: "",
  year: new Date().getFullYear(),
  time: new Date(),
  type: "dailyExpense",
};

const monthMap = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const dateConfig = {
  year: {
    format: "YYYY",
    caption: "Year",
    step: 1,
  },
  month: {
    format: (value) => monthMap[value.getMonth() + 1],
    caption: "Mon",
    step: 1,
  },
};

class DailyExpense extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getSortPieResult = (array) => {
    let temp_result = [];
    //ES7  Object.entries
    let sortable = Object.entries(array);
    sortable.sort(function (a, b) {
      return a[1] - b[1];
    });
    for (let index = sortable.length - 1; index >= 0; index--) {
      temp_result[sortable[index][0]] = sortable[index][1];
    }
    return temp_result;
  };

  getAccountPieChart = () => {
    const { allitems } = this.props;
    const { time } = this.state;
    const monthCategory = [];
    const days = utils.days(time.getFullYear(), time.getMonth() + 1);
    let category = [];
    let array = [];
    let filterMonthItem = "";
    for (let d = 0; d <= days; d++) {
      let dateOfTheMonth =
        time.getFullYear() + "-" + utils.toDualDigit(time.getMonth() + 1);
      filterMonthItem = allitems.filter(function (item) {
        return item.date.includes(dateOfTheMonth);
      });
    }
    for (let item = 0; item < filterMonthItem.length; item++) {
      if (category.includes(filterMonthItem[item]["itemClass"])) {
        array[filterMonthItem[item]["itemClass"]] += parseInt(
          filterMonthItem[item]["itemValue"]
        );
      } else {
        category.push(filterMonthItem[item]["itemClass"]);
        array[filterMonthItem[item]["itemClass"]] = parseInt(
          filterMonthItem[item]["itemValue"]
        );
      }
    }
    let result = this.getSortPieResult(array);
    // data format
    Object.entries(result).forEach(([key, value]) => {
      monthCategory.push({
        accountCategory: key,
        expense: value,
      });
    });
    // Add data
    chart.data = monthCategory;
    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "expense";
    pieSeries.dataFields.category = "accountCategory";
    pieSeries.legendSettings.valueText =
      "{value}元    [bold {color}]{value.percent.formatNumber('#.0')}%";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    // inner text
    if (window.screen.width <= 414) {
      // pieSeries.alignLabels = false;
      // pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
      pieSeries.labels.template.radius = am4core.percent(8);
      // pieSeries.labels.template.fill = am4core.color("black");
    }
    chart.legend = new am4charts.Legend();
    // chart.legendSettings.labelText = "Series: [bold {color}]{name}[/]";
    // chart.legendSettings.valueText = "{valueY.close}";
    // chart.legendSettings.itemValueText = "[bold]{valueY}[/bold]";
    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(40);
    // Put a thick white border around each Slice
    //logo disabled
    chart.logo.disabled = true;
  };

  getCategoryPieChart = () => {
    const { allitems } = this.props;
    const { time } = this.state;
    const monthCategory = [];
    const days = utils.days(time.getFullYear(), time.getMonth() + 1);
    let category = [];
    let array = [];
    let filterMonthItem = "";
    for (let d = 0; d <= days; d++) {
      let dateOfTheMonth =
        time.getFullYear() + "-" + utils.toDualDigit(time.getMonth() + 1);
      filterMonthItem = allitems.filter(function (item) {
        return item.date.includes(dateOfTheMonth);
      });
    }
    for (let item = 0; item < filterMonthItem.length; item++) {
      if (category.includes(filterMonthItem[item]["accountClass"])) {
        array[filterMonthItem[item]["accountClass"]] += parseInt(
          filterMonthItem[item]["itemValue"]
        );
      } else {
        category.push(filterMonthItem[item]["accountClass"]);
        array[filterMonthItem[item]["accountClass"]] = parseInt(
          filterMonthItem[item]["itemValue"]
        );
      }
    }
    let result = this.getSortPieResult(array);
    // data format
    Object.entries(result).forEach(([key, value]) => {
      monthCategory.push({
        accountCategory: key,
        expense: value,
      });
    });
    // Add data
    chart.data = monthCategory;
    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "expense";
    pieSeries.dataFields.category = "accountCategory";
    pieSeries.legendSettings.valueText =
      "{value}元    [bold {color}]{value.percent.formatNumber('#.0')}%";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    // inner text
    if (window.screen.width <= 414) {
      // pieSeries.alignLabels = false;
      // pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
      pieSeries.labels.template.radius = am4core.percent(8);
      // pieSeries.labels.template.fill = am4core.color("black");
    }
    chart.legend = new am4charts.Legend();
    // chart.legendSettings.labelText = "Series: [bold {color}]{name}[/]";
    // chart.legendSettings.valueText = "{valueY.close}";
    // chart.legendSettings.itemValueText = "[bold]{valueY}[/bold]";
    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(40);
    // Put a thick white border around each Slice
    //logo disabled
    chart.logo.disabled = true;
  };

  getBarChart = () => {
    const { allitems } = this.props;
    const { time } = this.state;
    const dailyExpense = [];

    const days = utils.days(time.getFullYear(), time.getMonth() + 1);

    let array = {};

    for (let d = 0; d <= days; d++) {
      let dateOfTheMonth =
        time.getFullYear() +
        "-" +
        utils.toDualDigit(time.getMonth() + 1) +
        "-" +
        utils.toDualDigit(d);
      let filterMonthItem = allitems.filter(function (item) {
        return item.date.includes(dateOfTheMonth);
      });
      if (filterMonthItem.length !== 0) {
        array[d] = filterMonthItem;
      }
    }
    for (let i = 1; i <= days; i++) {
      let formatDate =
        time.getFullYear() +
        "-" +
        utils.toDualDigit(time.getMonth() + 1) +
        "-" +
        utils.toDualDigit(i);
      let daily = allitems.filter(function (item, index, array) {
        return item.date.includes(formatDate);
      });
      dailyExpense.push({
        date:
          utils.toDualDigit(time.getMonth() + 1) + "-" + utils.toDualDigit(i),
        dailyExpense: daily.reduce(function (
          accumulator,
          currentValue,
          currentIndex,
          array
        ) {
          return accumulator + parseInt(currentValue.itemValue);
        },
        0),
      });
    }

    // Create chart instance
    chart.scrollbarX = new am4core.Scrollbar();
    // Add data
    chart.data = dailyExpense;
    prepareParetoData();
    function prepareParetoData() {
      var total = 0;

      for (let i = 0; i < chart.data.length; i++) {
        let value = chart.data[i].dailyExpense;
        total += value;
      }

      var sum = 0;
      for (let i = 0; i < chart.data.length; i++) {
        let value = chart.data[i].dailyExpense;
        sum += value;
        chart.data[i].pareto = (sum / total) * 100;
      }
    }
    // disabled
    chart.logo.disabled = true;
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 25;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    const averageValue = () => {
      let accumulator = 0
      chart.data.map((item) => accumulator += item.dailyExpense)
      const length = chart.data.filter((expense)=> expense.dailyExpense > 0).length
      return Math.floor(accumulator/length)
    }
    const average = averageValue()
    var range = valueAxis.axisRanges.create();
    range.value = average;
    range.grid.stroke = am4core.color("#eb2a2a");
    range.grid.strokeWidth = 2;
    range.grid.strokeOpacity = 1;
    range.label.inside = true;
    range.label.text = `${average} $`;
    range.label.fill = range.grid.stroke;
    range.label.align = "right";
    range.grid.above = true;
    range.label.verticalCenter = "left";
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "dailyExpense";
    series.dataFields.categoryX = "date";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      if (chart.data[target.dataItem.index].dailyExpense < 250)
        return chart.colors.getIndex(1);
      if (chart.data[target.dataItem.index].dailyExpense < 1000)
        return chart.colors.getIndex(11);
      else return chart.colors.getIndex(10);
    });

    var paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    paretoValueAxis.renderer.opposite = true;
    paretoValueAxis.min = 0;
    paretoValueAxis.max = 100;
    paretoValueAxis.strictMinMax = true;
    paretoValueAxis.renderer.grid.template.disabled = true;
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    paretoValueAxis.numberFormatter.numberFormat = "#'%'";
    paretoValueAxis.cursorTooltipEnabled = false;

    var paretoSeries = chart.series.push(new am4charts.LineSeries());
    paretoSeries.dataFields.valueY = "pareto";
    paretoSeries.dataFields.categoryX = "date";
    paretoSeries.yAxis = paretoValueAxis;
    paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
    paretoSeries.bullets.push(new am4charts.CircleBullet());
    paretoSeries.strokeWidth = 2;
    paretoSeries.stroke = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    paretoSeries.strokeOpacity = 0.5;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
  };

  getChart = (type) => {
    if (chart) chart = null;
    am4core.useTheme(am4themes_material);
    switch (type) {
      case "dailyExpense":
        am4core.unuseTheme(am4themes_material);
        chart = am4core.create("daily-expense", am4charts.XYChart);
        return this.getBarChart();
      case "categoryExpense":
        am4core.useTheme(am4themes_material);
        chart = am4core.create("category-expense", am4charts.PieChart);
        return this.getCategoryPieChart();
      case "accountExpense":
        am4core.useTheme(am4themes_material);
        chart = am4core.create("account-expense", am4charts.PieChart);
        return this.getAccountPieChart();
      default:
        return;
    }
  };
  componentDidMount() {
    this.disableTouchInMobile();
    this.getChart(this.state.type);
  }

  componentDidUpdate(prevProps, prevState) {
    const { type } = this.state;

    if (prevProps.allitems === this.props.allitems) return;
    else {
      this.disableTouchInMobile();
      this.getChart(type);
    }
  }

  componentWillUnmount() {
    if (chart) {
      chart.dispose();
    }
  }

  disableTouchInMobile = () => {
    document
      .getElementById("chart-page")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
      });
    document.getElementById("chart-page").addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();
      },
      false
    );
  };

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleCancel = () => {
    this.setState({ isOpen: false });
  };

  handleSelect = (time) => {
    const { type } = this.state;
    this.setState({ time: new Date(time), isOpen: false });
    setTimeout(() => this.getChart(type));
  };

  selectChart = (type) => {
    if (this.state.type === type) return;
    this.setState({ type }, () => this.getChart(type));
  };

  savePhoto = () =>
    this.snapshot((dataUrl) => {
      return saveAs(dataUrl, "chart.png");
    });

  canvasToBlob = (canvas) =>
    canvas.msToBlob ? canvas.msToBlob() : canvas.toDataURL("image/png");

  snapshot = (callback) => {
    html2canvas(this.chartContent, {
      dpi: 216,
      scale: 2,
      logging: false,
      width: this.chartContent.offsetWidth,
      height: this.getChartHeight(),
    }).then((canvas) => {
      canvas && callback(this.canvasToBlob(canvas));
    });
  };

  getChartHeight = () => {
    return window.innerHeight - 44 - 26.5 - 50 - 32;
  };

  render() {
    const { time, type } = this.state;
    return (
      <div style={{ background: "#ffffff" }}>
        <div className="App">
          <div style={{ cursor: "pointer" }} onClick={this.handleClick}>
            <styles.SelectTime>
              {utils.dateFormat(time).slice(0, 7)}
            </styles.SelectTime>
          </div>
          <div
            style={{
              width: "-webkit-fill-available",
              display: "flex",
              fontSize: "14px",
              color: "black",
              textAlign: "center",
            }}
          >
            <styles.ChartTab
              key={"bar-chart"}
              activeStatus={this.state.type === "dailyExpense"}
              onClick={() => this.selectChart("dailyExpense")}
            >
              每日支出圖(圖表分析)
            </styles.ChartTab>
            <styles.ChartTab
              key={"pie-chart"}
              activeStatus={this.state.type === "categoryExpense"}
              onClick={() => this.selectChart("categoryExpense")}
            >
              支出帳戶比(圖表分析)
            </styles.ChartTab>
            <styles.ChartTab
              key={"account-chart"}
              activeStatus={this.state.type === "accountExpense"}
              onClick={() => this.selectChart("accountExpense")}
            >
              支出類別比(圖表分析)
            </styles.ChartTab>
          </div>
          <DatePicker
            value={this.state.time}
            isOpen={this.state.isOpen}
            onSelect={this.handleSelect}
            dateConfig={dateConfig}
            onCancel={this.handleCancel}
          />
          {!browserUtils.isMobile() && (
            <button onClick={this.savePhoto} style={styles.snapShotButton}>
              圖表分析(截圖)
            </button>
          )}
        </div>
        <div id="chart-page" ref={(chart) => (this.chartContent = chart)}>
          {type === "dailyExpense" && (
            <div
              id="daily-expense"
              style={{
                width: "100%",
                height: this.getChartHeight(),
                transform: "scale(0.9)",
              }}
            />
          )}
          {type === "categoryExpense" && (
            <div
              id="category-expense"
              style={{
                width: "100%",
                height: this.getChartHeight(),
                transform: "scale(0.8)",
              }}
            />
          )}
          {type === "accountExpense" && (
            <div
              id="account-expense"
              style={{
                width: "100%",
                height: this.getChartHeight(),
                transform: "scale(0.8)",
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
export default connect(({ itemList }) => ({
  allitems: itemList.allitems,
}))(Radium(DailyExpense));
