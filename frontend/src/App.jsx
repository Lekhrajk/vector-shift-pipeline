import { Toolbar } from './components/Toolbar/Toolbar';
import { Canvas } from './components/Canvas/Canvas';
import { FooterArea } from './components/FooterArea/FooterArea';
import { JsonPreview } from './components/Sidebar/JsonPreview';

function App() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[var(--vs-bg-primary)]">
      <Toolbar />
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <div className="flex-1 flex flex-col min-w-0 relative">
          <Canvas />
          <div className="absolute bottom-0 w-full z-50">
            <FooterArea />
          </div>
        </div>
      </div>

      <JsonPreview />
    </div>
  );
}

export default App;
