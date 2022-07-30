module.exports = {
  webpack: {
    configure: {
      externals: {
        "wasmer_wasi_js_bg.wasm": true,
      },
    },
  },
};
