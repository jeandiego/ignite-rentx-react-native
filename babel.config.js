module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        "babel-plugin-root-import",
        {
          paths: [
            {
              rootPathSuffix: "src",
              rootPathPrefix: "~/"
            },
          ]
        }
      ]
    ],
    presets: ['babel-preset-expo']
  };
};
