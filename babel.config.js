module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components/types': './src/components/types',
          '@components': './src/components',
          '@navigator': './src/navigator',
          '@images': './component/assets/images',
          '@icons': './component/assets/icons',
          '@constants': './src/constants',
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
      plugins: [
        'transform-remove-console',
        'transform-remove-debugger',
        'react-native-paper/babel',
      ],
    },
  },
};
