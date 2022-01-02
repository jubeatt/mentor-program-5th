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