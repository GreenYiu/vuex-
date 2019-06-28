module.exports = {
  //预设 - 一堆插件的集合
  presets: [
    '@vue/app'
  ],

  //插件
  plugins: [
    [
       "component", {
         "libraryName": "element-ui",
         "styleLibraryName": "theme-chalk"
       }
    ]
  ]
}


