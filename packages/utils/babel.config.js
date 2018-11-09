module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['@babel/env', '@babel/preset-react'],

    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-object-rest-spread',
      [
        '@babel/plugin-proposal-class-properties',
        {
          spec: true,
        },
      ],
      'lodash',
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
      'babel-plugin-add-module-exports',
    ],
  };
};
