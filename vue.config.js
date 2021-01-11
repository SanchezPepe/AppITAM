module.exports = {
  transpileDependencies: ["vuetify"],
  // CORS - https://medium.com/js-dojo/how-to-deal-with-cors-error-on-vue-cli-3-d78c024ce8d3
  devServer: {
    proxy: "https://firebasestorage.googleapis.com/"
  }
};
