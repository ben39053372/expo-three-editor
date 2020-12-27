module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@Editor": "./src/Editor",
            "@Canvas": "./src/Canvas",
            "@Components": "./src/components",
            "@EventManager": "./src/EventManager"
          }
        }
      ]
    ]
  }
}
