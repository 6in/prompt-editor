import Editor from "@monaco-editor/react";

interface EditorProps {
  text: string;
}

export default function MonacoEditor({text}: EditorProps) {

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="markdown"
        value={text}
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