import { init, WASI } from "@wasmer/wasi";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

function App() {
  useEffect(() => {
    const myFun = async () => {
      window.Buffer = Buffer;
      await init();
      let w = new WASI();
      let wasi = new WASI({ env: {}, args: [] });

      let bytes = fetch("http://localhost:3001/wasm-test.wasm");
      let module = await WebAssembly.compileStreaming(bytes);

      await wasi.instantiate(module);
      wasi.setStdinString("hello");
      let exitCode = wasi.start();

      // setOutput(output + "\n" + wasi.getStdoutString());
      setInterval(() => {
        let ostring = wasi.getStdoutString();
        console.log(ostring);
        if (ostring != undefined && output != null && ostring != "") {
          setOutput(output + "\n" + ostring);
        }
      }, 100);

      // console.log(wasi.getStdoutString());
    };

    myFun();
  }, []);
  const [wasi, setWasi] = useState();
  const [output, setOutput] = useState();
  const [input, setInput] = useState();
  return (
    <div>
      <h1>Output</h1>
      <textarea value={output} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input onChange={(e) => setInput(e.target.value)} />
        <button type="submit"></button>
      </form>
    </div>
  );
}

export default App;
