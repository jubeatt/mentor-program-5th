// 解法一 => 一般解法
function solve(lines) {
  let max = Number(lines[0])
  // 遍歷 1 ~ n 行
  for(let i=1; i<=max; i++) {
    // 儲存星星的字串
    let stars = ''
    // 建立 n 個星星
    for(let j=1; j<=i; j++) {
      stars += '*'
    }
    // 印出星星
    console.log(stars)
  }
}
// 解法一 => 帥氣解法
function solve(lines) {
  // 1. 產生長度為 n 的陣列
  // 2. 用 map 填入星星
  // 3. 用 join 插入換行符
  console.log(
    Array.from({length: Number(lines[0])}).map((item, index) => '*'.repeat(index+1)).join('\n')
  )  
}