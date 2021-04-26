module.exports = {
  transpileDependencies: ["vuetify"],
  // CORS - https://medium.com/js-dojo/how-to-deal-with-cors-error-on-vue-cli-3-d78c024ce8d3
  // Enable CORS on the backend - https://firebase.google.com/docs/storage/web/download-files?hl=es#cors_configuration
  devServer: {
    proxy: "https://firebasestorage.googleapis.com/"
    //proxy: "http://bus.itam.mx/"
  }
};
