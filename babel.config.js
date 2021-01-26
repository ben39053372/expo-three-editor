module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@Editor": "./src/Editor",
            "@Canvas": "./src/Canvas",
            "@Components": "./src/Components",
            "@Style": "./src/Style",
            "@Theme": "./src/theme",
            "@Utils": "./src/utils"
          }
        }
      ]
    ]
  }
}
