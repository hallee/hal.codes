module.exports = {
  presets: [[
    '@babel/preset-env',
    {
      useBuiltIns: 'false'
    }
  ]],
  plugins: ['@babel/plugin-syntax-dynamic-import']
};