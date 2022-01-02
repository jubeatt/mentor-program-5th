// 函式結構寫法
function solve(lines) {
  // 建立數字陣列
  let numberArray = transToNumber(lines.slice(1))
  // 遍歷所有數字
  numberArray.forEach((elem) => {
    // 判斷是否為質數
    let message = isPrime(elem) ? 'Prime' : 'Composite'
    // 印出輸出訊息
    console.log(message)
  })
}
// 陣列轉換成 Number
function transToNumber (array) {
  let result = []
  for(let i=0; i<array.length; i++) {
    result.push(Number(array[i]))
  }
  return result
}
function isPrime (number) {
  // edge case: 數字 1 不算質數
  if(number === 1) return false
  // 遍歷 2 ~ n-1
  for(let i=2; i<number; i++) {
    // 可以整除就代表不是質數
    if( number%i === 0 ) return false
  }
  // 都不能整除就代表是質數
  return true
}


// 雙層迴圈寫法
function solve(lines) {
  // 建立數字陣列
  let numberArray = transToNumber(lines.slice(1))
  // 遍歷所有數字
  for(let i=0; i<numberArray.length; i++) {
    // 預設為質數
    let isPrime = true
    // edge case: 1
    if(numberArray[i] === 1) {
      isPrime = false
    }
    // 判斷質數
    for(let j=2; j<numberArray[i]; j++) {
      if(numberArray[i] % j === 0) {
        isPrime = false
        break
      }
    }
    // 印出結果
    if(isPrime) {
      console.log('Prime')
    } else {
      console.log('Composite')
    }
  }
}