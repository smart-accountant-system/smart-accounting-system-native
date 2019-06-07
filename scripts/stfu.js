const fs = require('fs');

const problemFilePath = './node_modules/metro/src/lib/polyfills/require.js';
const problemFileContent = fs.readFileSync(problemFilePath, 'utf8');
fs.writeFileSync(
  problemFilePath,
  problemFileContent.replace(
    'initializingIndex !== -1',
    'initializingIndex === 999'
  )
);
