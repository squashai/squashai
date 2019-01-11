module.exports = {
  configureWebpack: {
    externals: {
      oimo: true,
      cannon: true,
      earcut: true
    }
  },
  baseUrl: process.env.VUE_APP_BASE_URL || '/'
}
