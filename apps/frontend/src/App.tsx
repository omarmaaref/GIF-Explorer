import { GifProvider } from "./context/GifContext";
import { GifExplorer } from "./page/GifExplorer";

export const App: React.FC = () => (
  <GifProvider>
    <GifExplorer />
  </GifProvider>
);

export default App;
