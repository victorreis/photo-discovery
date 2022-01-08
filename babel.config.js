module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-typescript', { targets: { node: 'current' } }],
    ['@babel/preset-react', { targets: { node: 'automatic' } }],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    [
      'babel-plugin-styled-components',
      {
        namespace: 'photo-discovery',
        displayName: true,
        fileName: false,
      },
    ],
  ],
};
