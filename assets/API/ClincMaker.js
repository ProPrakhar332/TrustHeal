function clinicMaker(item) {
  var clinc = [];
  var i = 0;
  while (i < item.length) {
    let p = {
      key: item[i].clinicId,
      value: item[i].clinicName + ' | ' + item[i].clinicAddress,
    };
    clinc.push(p);
    ++i;
  }
  return clinc;
}

export default clinicMaker;
