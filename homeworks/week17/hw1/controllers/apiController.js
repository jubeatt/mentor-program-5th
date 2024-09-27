const { Prize } = require('../models');

const apiController = {
  draw: async (req, res) => {
    // 1. 去 db 拿出 JSON 資料
    // 2. 根據權重設定抽獎機制
    // 3. 把抽出來的結果丟回 response 
    const prizes = await Prize.findAll();

    const draw = (prizes) => {
      const randomArray = []
      let weightTotal = 0
      for (let i=0; i<prizes.length; i++) {
        weightTotal += prizes[i].weight
        for (let j=0; j<prizes[i].weight; j++) {
          randomArray.push(i)
        }
      }
      return prizes[randomArray[Math.floor(Math.random() * weightTotal)]]
    }
    const prize = draw(prizes)
    res.json(prize)
  }
}
module.exports = apiController