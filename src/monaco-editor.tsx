import Editor from "@monaco-editor/react";

export default function MonacoEditor() {
  return (
    <div style={{ height: "500px", margin: "20px auto", maxWidth: "800px" }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// ここにコードを入力してください"
        theme="vs-dark"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: "on",
          automaticLayout: true,
        }}
      />
    </div>
  );
}