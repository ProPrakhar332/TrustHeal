function DaysCreator() {
  var d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var days = [];
  var i = 1;
  var p = new Date().getDay();
  if (p == 6) {
    i = 2;
    p = -1;
  }
  while (p + i <= 6) {
    var cur = new Date();
    cur.setDate(cur.getDate() + i);
    var day = d[cur.getDay() - 1];
    days.push({
      date: JSON.stringify(cur).substring(1, 11),
      day: day,
    });
    ++i;
  }
  console.log(days);
  return days;
}

export default DaysCreator;
