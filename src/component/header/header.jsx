import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import styles from "./styles";
import {createBrowserHistory} from 'history';
let history = createBrowserHistory();
const initialState = {
  currentTime: '',
};

export default class InputContent extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  setCurrentTime = () => window.setInterval((() => this.setState({currentTime: new Date().toLocaleTimeString()})));

  componentDidMount() {
    this.setCurrentTime();
  }

  getImage = route =>{

    switch (route) {
      case 'record':
        return <div>
            <img style={styles.costImg} alt="" onClick={()=>this.props.changePage('total')}  src={require('../../assets/img/cost-list.png')}/>
            <img style={{...styles.chartImg, zIndex: 5}} alt="" onClick={()=>this.props.changePage('chart')} src={require('../../assets/img/chart.png')}/>
            </div>;
      case 'total':
        return <div>
            <img style={styles.costImg} alt="" onClick={()=>this.props.changePage('record')} src={require('../../assets/img/record.png')}/>
          </div>;
      case 'detailOfMonth':
        return <div>
            <img style={styles.costImg} alt="" onClick={()=>this.props.changePage('total')}  src={require('../../assets/img/cost-list.png')}/>
            <img style={{...styles.recordImg, zIndex: 5}} alt="" onClick={()=>this.props.changePage('record')} src={require('../../assets/img/record.png')}/>
          </div>;
      case 'chart':
        return <div>
            <img style={styles.costImg} alt="" onClick={()=>this.props.changePage('total')}  src={require('../../assets/img/cost-list.png')}/>
            <img style={{...styles.recordImg, zIndex: 5}} alt="" onClick={()=>this.props.changePage('record')} src={require('../../assets/img/record.png')}/>
          </div>;
      default:
        return
    }
  };

  render() {
    const {currentTime} = this.state;
    const {route} = this.props;

    return (
      <div>
        <div style={styles.header}>
          {<div style={{position: 'relative'}}>
            {this.getImage(route)}
            {<div style={{position: 'relative'}}><img style={{...styles.logoutImg, right:'0px'}} alt="" onClick={()=>{
              history.push('/account/login');
              window.location.reload();
              this.props.logOut()
              }} src={require('../../assets/img/logout.png')}/>
            </div>}
          </div>}
          <div style={styles.ctime}>現在時間: {currentTime}</div>
        </div>
      </div>
    )
  }
}
