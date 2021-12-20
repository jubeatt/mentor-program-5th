function capitalize(str) {
  var result = ''
  var tempArray = str.split('')
  var firstLetter = tempArray[0]
  var isCorrectLetter = checkSheet(firstLetter)

  if(!isCorrectLetter) return str
  
  if(firstLetter>='a' && firstLetter<='z') {
    tempArray[0] = toUpperCase(firstLetter)
    result = transformToString(tempArray)
    return result
  } else {
    result = transformToString(tempArray)
    return result
  }
}
function checkSheet(char) {
  if((char>='A' && char<='Z') || (char>='a' && char<='z')) {
    return true
  } else {
    return false
  }
}
function toUpperCase(key) {
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
  var result = ''
  for(var i=0; i<arr.length; i++) {
    result += arr[i]
  }
  return result
}

console.log(capitalize(',hello'))
