import { MantineProvider, Checkbox, Text } from '@mantine/core';
import './App.css'
import BlockEditor from './block-editor'
import MonacoEditor from './monaco-editor'
import { useState, useEffect } from 'react'

function App() {
  const [markdown, setMarkdown] = useState<string>("");
  const [autoCopy, setAutoCopy] = useState<boolean>(true);
  const [shortCut, setShortCut] = useState<string>('s-s');
  const [isWindows, setIsWindows] = useState<boolean>(false);

  const detectWindows = () => {
    const platform = (navigator as any).userAgentData?.platform || navigator.platform;
    return platform.toLowerCase().includes('win');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shortCutParam = params.get('shortCut');

    const isWin = detectWindows();
    setIsWindows(isWin);
    if (isWin) {
      setShortCut('c-s');
    }

    if (shortCutParam) {
      setShortCut(shortCutParam);
    }

  }, []);
  
  const onChange = async (e: string) => {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const markdown = e;
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
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Checkbox
              label="自動でクリップボードにコピー"
              checked={autoCopy}
              onChange={(event) => setAutoCopy(event.currentTarget.checked)}
            />
            <Text>実行環境: {isWindows ? 'Windows' : 'その他のOS'}</Text>
          </div>
        </div>
        <div className="editors-container">
          <div className="editor-section">
            <BlockEditor onChange={onChange} shortCut={shortCut} />
          </div>
          <div className="editor-section">
            <MonacoEditor text={markdown}/>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
