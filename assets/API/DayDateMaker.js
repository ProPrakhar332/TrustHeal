function DayDateMaker(item) {
  var d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var days = [];
  var cd = item.availableDates == undefined ? item : item.availableDates;
  var i = 0;
  while (i < cd.length) {
    let p = {
      date: cd[i],
      day: d[new Date(cd[i]).getDay()],
    };
    days.push(p);
    ++i;
  }
  return days;
}

export default DayDateMaker;
