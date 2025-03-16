import { MantineProvider } from '@mantine/core';
import './App.css'
import BlockEditor from './block-editor'
import MonacoEditor from './monaco-editor'
import { useState } from 'react'

function App() {

  const [markdown, setMarkdown] = useState<string>("ここにテキストを入力してください...");
  
  const onChange = async ( e:string ) => {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const markdown = e;
    setMarkdown(markdown);
  };

  return (
    <MantineProvider>
      <div className="app-container">
        <div className="editor-section">
          <BlockEditor onChange={onChange} />
        </div>
        <div className="editor-section">
          <MonacoEditor text={markdown}/>
        </div>
      </div>
    </MantineProvider>
  )
}

export default App
