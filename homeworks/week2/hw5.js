function join(arr, concatStr) {
  var result = ''
  for(var i=0; i<arr.length; i++) {
    if(i !== arr.length-1) {
      result += arr[i] + concatStr
    } else {
      result += arr[i]
    }
  }
  return result
}

function repeat(str, times) {
  var result = ''
  for(var i=0; i<times; i++) {
    result += str
  }
  return result
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));