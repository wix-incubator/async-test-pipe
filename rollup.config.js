import nodeResolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

export default {
  input: 'src/index.js',
  output: [
    {file: pkg.main, format: 'cjs'},
    {file: pkg.module, format: 'es'}
  ],
  plugins: [nodeResolve()],
};
