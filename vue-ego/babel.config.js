module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  //elementUI需要配置的
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}