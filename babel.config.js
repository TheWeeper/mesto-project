const { mode } = require("./webpack.config");

const presets = [
  ['@babel/preset-env', {
    targets: {
        edge: '17',
        firefox: '60',
        chrome: '64',
        safari: '11.1',
        ie: '11'
    },
    useBuiltIns: 'entry',
}]
];

module.exports = { presets };