function reverse(str) {
  var result = ''
  var i = str.length - 1
  while(i>=0) {
    result += str[i]
    i-- 
  }
  return result
}

console.log(reverse('1abc2'))