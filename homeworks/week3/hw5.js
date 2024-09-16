// 解法一 => BigInt 
function solve(lines) {
  // 總共有幾組 => 3
  const total = Number(lines[0])
  // i from 1 to 3
  for(let i=1; i<=total; i++) {
    const [A, B, K] = lines[i].split(' ')
    // 轉成 BigInt 型態
    const BigIntA = BigInt(A)
    const BigIntB = BigInt(B)
    // A 跟 B 平手的情況
    if(BigIntA === BigIntB) {
      console.log('DRAW')
      // 跳下一圈
      continue
    }
    const bigger = BigIntA > BigIntB ? 'A' : 'B'
    const samller = BigIntA < BigIntB ? 'A' : 'B'
    // 比誰大
    if(K === '1') {
      console.log(bigger)
    // 比誰小
    } else {
      console.log(samller)
    }
  }
}

// 解法二 => 利用字串長度 + 字典序
function solve(lines) {
  // 總共有幾組 => 3
  const total = Number(lines[0])
  for(let i=1; i<=total; i++) {
    let [a, b, k] = lines[0].split(' ')
    console.log(compare(a, b, k))
  }
}

function compare(a, b, k) {
  if(a === b ) return 'DRAW'
  // 如果比小，把 a 跟 b 的值對調，就可以不用改變判斷邏輯
  if(k === '-1') {
    // 暫存 b 的值
    let temp = b
    // 把 a 的值給 b
    b = a 
    // 把暫存的 b 給 a
    a = temp
  }
  // 儲存字串長度
  const lengthA = a.length
  const lengthB = b.length

  // 不一樣長的時候，判斷誰比較長
  if(lengthA !== lengthB) return lengthA > lengthB ? 'A' : 'B'
  // 一樣長的時候，用字典序自動比對每個字元
  return a > b ? 'A' : 'B'
}