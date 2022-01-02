// 拿到所有資料
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