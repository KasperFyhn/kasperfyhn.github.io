import "./App.css";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { MarkdownRenderer } from "./markdown/MarkdownRenderer";
import { useState } from "react";


function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [isPinned, setSidebarPinned] = useState(false);
  const pinSidebar = () => {
    setSidebarPinned(!isPinned);
  };

  let sidebarState = " ";
  if (isPinned) {
    sidebarState += "";
  } else {
    sidebarState += "sidebar--unpinned ";
    if (isSidebarOpen) {
      sidebarState += "sidebar--open";
    }
  }

  return (
    <>
      <div
        className={"sidebar" + sidebarState}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <Link to="/"><b>kasperfyhn.github.io</b></Link>
        <button className="pin-button" onClick={pinSidebar}>
        ⟟
        </button>
        <hr />
        <Link to="/gai-course%2FREADME">Generative AI Course</Link>
      </div>
      <div
        className={"sidebar__button " + (isSidebarOpen ? "sidebar--open" : "")}
      >
        <button className="hamburger-button" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
    </>
  );
}

function PaddedContent({ children }) {
  return (
    <div className="padded-content__container">
      <div className="padded-content__box">{children}</div>
    </div>
  );
}

function FrontPage() {
  return (
    <div className="frontpage">
      <h1>kasperfyhn.github.io</h1>
    </div>
  );
}

function App() {
  return (
    <div className="root">
        
        <Sidebar />

        <Routes>
          <Route exact path="/" element={<FrontPage />} />
          <Route
            path="/:page"
            element={
              <PaddedContent>
                <MarkdownRenderer />
              </PaddedContent>
            }
          />
        </Routes>
    </div>
  );
}

export default App;
