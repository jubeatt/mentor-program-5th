// 解法一 => 一般解法
function solve(lines) {
  // 輸入規則：0 ~ 100個連續英文字母（大小寫）
  const isValidInput = /^[a-zA-Z]{1,100}$/.test(lines[0])
  // 判斷輸入是否合法
  if( !(isValidInput) ) return false
  // 判斷迴文
  console.log(isPalindrome(lines[0]) ? 'True' : 'False')
}
function isPalindrome(str) {
  // 若頭尾字元不同，可直接回傳 false
  if(str[0] !== str[str.length-1]) return false
  // 儲存反轉後的字串
  let temp = ''
  // 反轉字串
  for(let i=str.length-1; i>=0; i--) {
    temp += str[i]
  }
  // 回傳結果
  return temp === str
}

// 解法二 => 帥氣解法
function solve(lines) {
  // 輸入規則：0 ~ 100個連續英文字母（大小寫）
  const isValidInput = /^[a-zA-Z]{1,100}$/.test(lines[0])
  // 判斷輸入是否合法
  if( !(isValidInput) ) return false
  // 判斷迴文
  console.log(isPalindrome(lines[0]) ? 'True' : 'False')
}
function isPalindrome(str) {
  return str === str.split('').reverse().join('')
}