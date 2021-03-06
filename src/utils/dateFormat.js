const daysOfMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const utils = {
  dateFormat: date =>{
    const year =  date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + (new Date().getDate())).slice(-2);
    return year + '-' + month + '-' + day
  },

  toDualDigit : day => {
    if (day < 10) return '0' + day;
    return day;
  },

  format : (y, idx) => y + '-' + ('0' + (idx + 1)).slice(-2),

  days : (y,m) => {
    if (((((y % 4 === 0) && (y % 100 !== 0)) || ((y % 400 === 0)) )&& (m === 2))) {
      return 29
    }else{
      return  daysOfMonth[m];
    }
  },
};

export default utils;
