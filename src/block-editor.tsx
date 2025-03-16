import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

export default function BlockEditor(props: {onChange: any}) {
  // エディターインスタンスを作成
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "ここにテキストを入力してください..."
      }
    ]
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.shiftKey && event.key === ' ') {
        event.preventDefault();
        editor.openSuggestionMenu('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);

  const onChange = async ( ) => {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const markdown = await editor.blocksToMarkdownLossy(editor.document)
    props.onChange(markdown);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <BlockNoteView editor={editor} onChange={onChange} theme="light" />
    </div>
  );
}