import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MarkdownNavigator } from "./markdown/MarkdownNavigator";
import { MarkdownComponent, MarkdownRenderer } from "./markdown/MarkdownRenderer";

function App() {
  return (
    <div>
      <header className="App-page">
        <h1>kasperfyhn.github.io</h1>
      </header>

      <Routes>
        <Route exact path="/" element={<div>Root page</div>}>
        </Route>
        <Route path="/:page/*" element={<MarkdownRenderer />}>
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
