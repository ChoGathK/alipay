const  fs = require('fs');
const { resolve } = require('path');

const path = resolve(__dirname, '../package.json');

// 读取版本

const package = JSON
  .parse(
    fs
      .readFileSync(path)
      .toString(),
  );

const list = package.version.split('.');

// 版本自增

list[2]++;

if (list[2] > 30) {
  list[1]++;
  list[2] = 0;
}  

if (list[1] > 30) {
  list[0]++;
  list[1] = 0;
}  

// 更新版本

package.version = list.join('.');

console.log('--------- version: ' + package.version + ' ---------')

fs
  .writeFileSync(
    path,
    JSON.stringify(package, null, '\t'),
  );
