import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

const NuevoEditor = () => {
  const [code, setCode] = useState("");
  return (
    <div className="backgroundEditor">
      <CodeEditor
        value={code}
        language="js"
        placeholder="Por favor escribe el código aquí"
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "black",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </div>
  );
};

export default NuevoEditor;
