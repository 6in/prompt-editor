import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";
import "./block-editor.css";

import { BlockNoteEditor, PartialBlock, filterSuggestionItems } from "@blocknote/core";
import { SuggestionMenuController, getDefaultReactSlashMenuItems, DefaultReactSuggestionItem } from "@blocknote/react";
import { HiOutlineTable } from "react-icons/hi";

/**
 * ヘッダー付きテーブルを挿入する関数
 * @param editor BlockNoteEditorのインスタンス
 */
function insertHeaderTable(editor: BlockNoteEditor) {
  const tableBlock: PartialBlock = {
    type: "table",
    content: {
      type: "tableContent",
      headerRows: 1,
      rows: [
        { cells: ["", "", ""] },
        { cells: ["", "", ""] },
        { cells: ["", "", ""] },
      ],
    },
  };

  const currentBlock = editor.getTextCursorPosition().block;
  const insertedBlocks = editor.insertBlocks([tableBlock], currentBlock);

  // 挿入されたテーブルのブロックIDを取得
  const tableBlockId = insertedBlocks[0]?.id;
  if (!tableBlockId) return;

  editor.setTextCursorPosition(tableBlockId, "start");

}

/**
 * カスタムスラッシュメニューの項目を作成
 * @param editor BlockNoteEditorのインスタンス
 * @returns DefaultReactSuggestionItem
 */
const insertHeaderTableItem = (editor: BlockNoteEditor): DefaultReactSuggestionItem => ({
  title: "ヘッダ付きテーブル(h-table)",
  onItemClick: () => insertHeaderTable(editor),
  aliases: ["header table", "h-table"],
  group: "Customized",
  icon: <HiOutlineTable size={18} />,
  subtext: "3列×3行のヘッダー付きテーブルを挿入",
});

/**
 * デフォルトのスラッシュメニュー項目にカスタム項目を追加
 * @param editor BlockNoteEditorのインスタンス
 * @returns DefaultReactSuggestionItem[]
 */
const getCustomSlashMenuItems = (editor: BlockNoteEditor): DefaultReactSuggestionItem[] => {
  const defaultItems = getDefaultReactSlashMenuItems(editor);
  const ignoreTitles = [ "Video", "Audio", "File", "Emoji"];
  const newItems = defaultItems.filter((item) => !ignoreTitles.includes(item.title));

  return [
    ...newItems,
    insertHeaderTableItem(editor),
  ];
}

export default function BlockEditor(props: { onChange: any , shortCut: string}) {
  // エディターインスタンスを作成
  const editor = useCreateBlockNote({
    placeholders: {
      paragraph: "/ あるいは ショートカット でコマンドを入力"
    },
    // テーブルのデフォルト設定
    tables: {
      splitCells: true, // セルの分割を有効化
      headers: true, // ヘッダー行を有効化
    },
    initialContent: [
      {
        type: "paragraph",
        content: "起動時のurlパラメータ(?shortCut=XXX)で、メニューのショートカットを変更できます。"
      },
      {
        type: "bulletListItem",
        content: "s-s: Shift + Space (デフォルト) ",
      },
      {
        type: "bulletListItem",
        content: "c-s: Ctrl + Space",
      },
      {
        type: "bulletListItem",
        content: "a-s: Alt + Space",
      },
      {
        type: "bulletListItem",
        content: "m-s: Meta + Space",
      },
      {
        type: "bulletListItem",
        content: "c-s-s: Ctrl + Shift + Space",
      },
      {
        type: "bulletListItem",
        content: "m-s-s: Meta + Shift + Space",
      }
    ]
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      let showMenu = false;
      if (props.shortCut === "s-s" && event.shiftKey && event.key === ' ') {
        showMenu = true;
      }
      else if (props.shortCut === "c-s" && event.ctrlKey && event.key === ' ') {
        showMenu = true;
      }
      else if (props.shortCut === "a-s" && event.altKey && event.key === ' ') {
        showMenu = true;
      }
      else if (props.shortCut === "m-s" && event.metaKey && event.key === ' ') {
        showMenu = true;
      }
      else if (props.shortCut === "c-s-s" && event.ctrlKey && event.shiftKey && event.key === ' ') {
        showMenu = true;
      }
      else if (props.shortCut === "m-s-s" && event.metaKey && event.shiftKey && event.key === ' ') {
        showMenu = true;
      }

      if (showMenu) {
        event.preventDefault();
        editor.openSuggestionMenu('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);

  const onChange = async () => {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const markdown = await editor.blocksToMarkdownLossy(editor.document)
    props.onChange(markdown);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <BlockNoteView editor={editor} onChange={onChange} theme="light" slashMenu={false}>
        <SuggestionMenuController
          triggerCharacter="/"
          getItems={async (query) =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>
    </div>
  );
}