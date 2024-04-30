const fs = require('fs');
const path = require('path');

// 设定目标目录
const targetDirectory = path.join(__dirname, 'node_modules', '@mc');

// 读取目录中的所有包
fs.readdir(targetDirectory, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.isDirectory()) {
      const packageJsonPath = path.join(targetDirectory, file.name, 'package.json');
      // 检查每个包中是否有 package.json 文件
      fs.readFile(packageJsonPath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading package.json:', err);
          return;
        }

        try {
          const json = JSON.parse(data);
          // 添加 "type": "module"
          json.type = 'module';

          // 将修改后的 JSON 写回文件
          fs.writeFile(packageJsonPath, JSON.stringify(json, null, 2), 'utf8', err => {
            if (err) {
              console.error('Error writing package.json:', err);
              return;
            }
            console.log(`Updated ${packageJsonPath}`);
          });
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      });
    }
  });
});