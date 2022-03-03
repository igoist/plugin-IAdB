const fs = require('fs');
const path = require('path');

const child_process = require('child_process');

const execCommand = (arr) =>
  (Array.isArray(arr) ? arr : [arr]).forEach((c) => {
    console.log(`task: ${c}...`);
    console.log(child_process.execSync(c).toString('utf8'));
  });

const returnPath = (pathStr) => `${path.resolve(__dirname, pathStr)}`;
const pathDist = returnPath('../dist');
const pathCSS = returnPath('../public/css');

const rmExist = (tasks, pathStr) => {
  const targetPath = returnPath(pathStr);

  if (fs.existsSync(targetPath)) {
    tasks.push(`rm -r ${targetPath}`);
  }
};

const task02 = () => {
  const tasks = [];

  const updateCSS = () => {
    rmExist(tasks, '../dist/css');
    tasks.push(`cp -r ${pathCSS} ${pathDist}`);
  };

  updateCSS();

  execCommand(tasks);
};

(() => {
  // 执行 task 队列
  [
    // webpack
    // task01,
    // copy
    task02,
  ].forEach((task) => task());
})();
