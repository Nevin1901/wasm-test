import { init, WASI } from "@wasmer/wasi";
import { useEffect } from "react";
import { Buffer } from "buffer";

function App() {
  useEffect(() => {
    const myFun = async () => {
      window.Buffer = Buffer;
      await init();
      let wasi = new WASI({ env: {}, args: [] });

      let bytes = fetch("http://localhost:3001/wasm-test.wasm");
      let module = await WebAssembly.compileStreaming(bytes);

      await wasi.instantiate(module);
      let exitCode = wasi.start();

      console.log(wasi.getStdoutString());
    };

    myFun();
  }, []);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
