const formatNumber = (num, type = null)=> {
  if (typeof num !== 'number') {
    console.log(typeof num)
    return '0.00';
  }
  let numSplit, int, dec, sign;
  num = Math.abs(num);

  num = num.toFixed(2);
  numSplit = num.split('.');

  int = numSplit[0];
  if (int.length > 3) {
    int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
  }
  dec = numSplit[1];

  if (type === 'exp') {
    sign = '-';
    return sign + ' ' + int + '.' + dec;
  } else if (type === 'inc') {
    sign = '+';
    return sign + ' ' + int + '.' + dec;
  }
  return ' ' + int + '.' + dec;
}

export default formatNumber