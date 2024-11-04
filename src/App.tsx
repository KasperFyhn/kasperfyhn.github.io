import "./App.css";
import "./common.css";
import LinkedIn from "./logos/LI-In-Bug.png";
import GitHub from "./logos/github-mark.png";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import React, { PropsWithChildren } from "react";
import { AboutPage } from "./about/AboutPage";

function NavBar() {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const paths = [];
  for (let i = 1; i < parts.length; i++) {
    if (!parts[i]) {
      continue;
    }
    paths.push({ name: parts[i], url: parts.slice(0, i + 1).join("/") });
  }

  return (
    <div className={"navbar"}>
      {/*<button>MENU</button>*/}
      <div>
        <Link to={"/"}>
          <b>Home </b>
        </Link>
        {/*{paths.map((item) => <Link to={item.url}>/ {item.name}</Link>)}*/}
      </div>

      <Link to={"/about"}>About</Link>

      <Link to={"https://www.linkedin.com/in/kasper-fyhn/"} target={"_blank"}>
        <img
          className={"white-image"}
          height={"20px"}
          src={LinkedIn}
          alt={"LinkedIn"}
        />
      </Link>
      <Link to={"https://github.com/KasperFyhn"} target={"_blank"}>
        <img
          className={"white-image"}
          height={"20px"}
          src={GitHub}
          alt={"LinkedIn"}
        />
      </Link>
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

const Content: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={"content__container"}>
      <div className={"content__pane"}>{children}</div>
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <NavBar />
      <div className="root">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route
            path="/about"
            element={
              <Content>
                <AboutPage />
              </Content>
            }
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
