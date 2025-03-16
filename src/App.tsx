import { MantineProvider, Checkbox } from '@mantine/core';
import './App.css'
import BlockEditor from './block-editor'
import MonacoEditor from './monaco-editor'
import { useState } from 'react'

function App() {
  const [markdown, setMarkdown] = useState<string>("ここにテキストを入力してください...");
  const [autoCopy, setAutoCopy] = useState<boolean>(true);
  
  const onChange = async ( e:string ) => {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const markdown = e;
    console.log(markdown);
    setMarkdown(markdown);
    
    // If autoCopy is enabled, copy to clipboard
    if (autoCopy) {
      await navigator.clipboard.writeText(markdown);
    }
  };

  return (
    <MantineProvider>
      <div className="app-container">
        <div className="toolbar">
          <Checkbox
            label="自動でクリップボードにコピー"
            checked={autoCopy}
            onChange={(event) => setAutoCopy(event.currentTarget.checked)}
          />
        </div>
        <div className="editors-container">
          <div className="editor-section">
            <BlockEditor onChange={onChange} />
          </div>
          <div className="editor-section">
            <MonacoEditor text={markdown}/>
          </div>
        </div>
      </div>
    </MantineProvider>
  )
}

export default App
