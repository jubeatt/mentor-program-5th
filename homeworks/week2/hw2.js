function capitalize(str) {
  var tempArray = str.split('')
  var firstLetter = tempArray[0]
  var isCorrectLetter = checkSheet(firstLetter)

  if(!isCorrectLetter) return str
  
  if(firstLetter>='a' && firstLetter<='z') {
    tempArray[0] = upperCaseMap(firstLetter)
    return transformToString(tempArray)
  } else {
    return transformToString(tempArray)
  }
}
function checkSheet(char) {
  if((char>='A' && char<='Z') || (char>='a' && char<='z')) {
    return true
  } else {
    return false
  }
}
function upperCaseMap(key) {
  var map = {
    a: 'A', b: 'B', c: 'C',
    d: 'E', e: 'E', f: 'F',
    g: 'G', h: 'H', i: 'I',
    j: 'J', k: 'K', l: 'L',
    m: 'M', n: 'N', o:'O',
    p: 'P', q: 'Q', r: 'R',
    s: 'S', t: 'T', u: 'U',
    v: 'V', w: 'W', x: 'X',
    y: 'Y', z: 'Z',
  }
  return map[key]
}
function transformToString(arr) {
  var str = ''
  for(var i=0; i<arr.length; i++) {
    str += arr[i]
  }
  return str
}

console.log(capitalize(',hello'))
