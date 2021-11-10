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
const pathManifest = returnPath('../manifest.json');
const pathIndependent = returnPath('../src/independent');
const pathImg = returnPath('../img');
const pathPages = returnPath('../pages');
const pathCSS = returnPath('../public/css');

const rmExist = (tasks, pathStr) => {
  const targetPath = returnPath(pathStr);

  if (fs.existsSync(targetPath)) {
    tasks.push(`rm -r ${targetPath}`);
  }
};

// webpack
const task01 = () => {
  const tasks = [];

  tasks.push(`npm run build:dll`);

  tasks.push(`npm run build`);

  execCommand(tasks);
};

/**
 * cp manifest.json dist
 * cp -r src/independent dist
 * cp -r img dist
 * cp -r pages dist
 * cp -r public/css dist
 */
const task02 = () => {
  const tasks = [];

  const updateManifest = () => {
    tasks.push(`cp ${pathManifest} ${pathDist}`);
  };

  const updateIndependent = () => {
    rmExist(tasks, '../dist/independent');
    tasks.push(`cp -r ${pathIndependent} ${pathDist}`);
  };

  const updateImg = () => {
    rmExist(tasks, '../dist/img');
    tasks.push(`cp -r ${pathImg} ${pathDist}`);
  };

  const updatePages = () => {
    rmExist(tasks, '../dist/pages');
    tasks.push(`cp -r ${pathPages} ${pathDist}`);
  };

  const updateCSS = () => {
    rmExist(tasks, '../dist/css');
    tasks.push(`cp -r ${pathCSS} ${pathDist}`);
  };

  updateManifest();
  updateIndependent();
  updateImg();
  updatePages();
  updateCSS();

  execCommand(tasks);
};

(() => {
  // 执行 task 队列
  [
    // webpack
    task01,
    // copy
    task02,
  ].forEach((task) => task());
})();
