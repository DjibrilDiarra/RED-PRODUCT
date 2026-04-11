const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

const inputPath = path.join(__dirname, 'src', 'Dashboadr.css');
const outputPath = path.join(__dirname, 'dist', 'Dashboadr.css');

const inputCSS = fs.readFileSync(inputPath, 'utf8');

postcss([tailwind, autoprefixer])
  .process(inputCSS, { from: inputPath, to: outputPath })
  .then(result => {
    fs.writeFileSync(outputPath, result.css);
    console.log('Tailwind compilé dans dist/Dashboadr.css !');
  })
  .catch(err => console.error(err));