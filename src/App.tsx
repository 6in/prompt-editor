import './App.css'
import BlockEditor from './block-editor'
import MonacoEditor from './monaco-editor'

function App() {
  return (
    <div className="app-container">
      <div className="editor-section">
        <BlockEditor />
      </div>
      <div className="editor-section">
        <MonacoEditor />
      </div>
    </div>
  )
}

export default App
