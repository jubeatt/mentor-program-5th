function solve(lines) {
  // ['5 200'] => ['5', '200']
  let l = lines[0].split(' ')
  let start = Number(l[0])
  let end = Number(l[1])
  for(let i=start; i<=end; i++) {
    if(isNString(i)) console.log(i)
  }
}
// 解法一（數學版）
function isNarcissistic(n) {
  // 幾位數
  let digit = digitsCount(n)
  // 複製數字
  let m = n
  // 儲存總和
  let sum = 0
  // 取出每一位數
  while(m) {
    // 單一位數的次方
    sum += (m%10) ** digit
    // 去掉最後一位數
    m = Math.floor(m/10)
  }
  // 回傳判斷結果
  return sum === n
}
// 解法二（字串版）
function isNString(n) {
  // 數字轉字串
  let str = (n + '')
  // 幾位數
  let digit = str.length
  let sum = 0
  for(let i=0; i<str.length; i++) {
    sum += Number(str[i]) ** digit
  }
  return sum === n
}
// 計算位數
function digitsCount(n) {
  // eage case
  if(n === 0) return 1
  let result = 0
  while(n) {
    // 去掉最後一位數
    n = Math.floor(n/10)
    result++
  }
  return result
}