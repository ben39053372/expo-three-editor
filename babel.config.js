// @generated: @expo/next-adapter@2.1.61
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

// module.exports = { presets: ['@expo/next-adapter/babel'] };

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          // root: ["./src"],
          alias: {
            "@Editor": "./src/Editor",
            "@Canvas": "./src/Canvas",
            "@Components": "./src/Components",
            "@Style": "./src/style",
            "@Theme": "./src/theme",
            "@Utils": "./src/utils"
          }
        }
      ]
    ]
  }
}
