"use strict";

// 完整路徑 = D:\restaurant\models\index.js
// __dirname = D:\restaurant\models（只含資料夾）
// __filename = D:\restaurant\models\index.js（包含檔案）
// path.basename(__filename) = index.js 取得檔案名稱
// path.basename(__filename, '.js') = index 去掉附檔名

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
// 如果有 set NODE_ENV 就會儲存，不然就存 development（記得不要空格，很雷）
const env = process.env.NODE_ENV || "development";
// 引入 config.js，並讀取 env 屬性
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
// 到 config 找有沒有 use_env_variable 屬性（它的值應該代表某個環境變數）
if (config.use_env_variable) {
  // 有的話就套用它的連線資訊：mysql://root:password@mysql_host.com/database_name
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // 沒有的話就是用 username + database + ... 的格式
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

/*
  1. 讀取目前資料夾底下的所有檔案 [ 'announcement.js', 'index.js', 'prize.js', 'user.js' ]
  2. 留下是檔案的東西（.） && 不是 index.js && 是 .js 的檔案
  3. 把這些檔案引入後 call function（引入進來的東西都是 function）
  4. 把建立的 model 綁到 db[model.name] 上
  5. 讀取 db 的每個 key，如果有建立關聯（associate），就把它們綁起來
*/
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
