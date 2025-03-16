import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export default function BlockEditor() {
  // エディターインスタンスを作成
  const editor = useCreateBlockNote({});

  return (
    <div style={{ margin: "20px auto", maxWidth: "800px" }}>
      <BlockNoteView editor={editor} />
    </div>
  );
}