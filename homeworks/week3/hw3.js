// 函式結構寫法
function solve(lines) {
  // 建立數字陣列
  let numberArray = lines.slice(1).map(elem => elem * 1)
  // 遍歷所有數字
  numberArray.forEach((elem) => {
    // 印出輸出訊息
    console.log(isPrime(elem) ? 'Prime' : 'Composite')
  })
}
function isPrime (number) {
  // edge case: 數字 1 不算質數
  if(number === 1) return false
  // 儲存開根號後的值
  const sqrtNum = Math.sqrt(number)
  // 遍歷 2 ~ n-1
  for(let i=2; i<=sqrtNum; i++) {
    // 可以整除就代表不是質數
    if( number%i === 0 ) return false
  }
  // 都不能整除就代表是質數
  return true
}


// 雙層迴圈寫法
function solve(lines) {
  // 建立數字陣列
  let numberArray = lines.slice(1).map(elem => elem * 1)
  // 遍歷所有數字
  for(let i=0; i<numberArray.length; i++) {
    // 預設為質數
    let isPrime = true
    // edge case: 1
    if(numberArray[i] === 1) {
      isPrime = false
    }
    // 儲存開根號後的值
    const sqrtNum = Math.sqrt(numberArray[i])
    // 判斷質數
    for(let j=2; j<=sqrtNum; j++) {
      if(numberArray[i] % j === 0) {
        isPrime = false
        break
      }
    }
    // 印出結果
    console.log(isPrime ? 'Prime' : 'Composite') 
  }
}