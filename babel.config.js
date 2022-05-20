module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
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
