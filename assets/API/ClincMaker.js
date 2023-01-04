function clinicMaker(item) {
  var clinc = [];
  var i = 0;
  while (i < item.length) {
    let p = {
      key: item[i].clinicAddress,
      value: item[i].clinicName,
    };
    clinc.push(p);
    ++i;
  }
  return clinc;
}

export default clinicMaker;
