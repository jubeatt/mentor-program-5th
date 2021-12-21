function reverse(str) {
  var result = ''
  var i = str.length - 1
  while(i>=0) {
    result += str[i]
    i-- 
  }
  console.log(result)
}

reverse('1abc2')