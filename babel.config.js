module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@constant': './src/constant',
          '@styles': './src/constant/styles.ts',
          '@components': './src/components',
          '@routes': './src/routes',
          '@images': './src/assets/images',
          '@screens': './src/screens',
          '@context': './src/context',
          '@hooks': './src/hooks',
          '@util': './src/util',
          '@type': './src/type',
          '@api': './src/api',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console', 'transform-remove-debugger'],
    },
  },
};
