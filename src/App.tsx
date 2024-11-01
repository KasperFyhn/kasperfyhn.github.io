import "./App.css";
import {HashRouter, Route, Routes} from "react-router-dom";


function FrontPage() {
    return (
        <div className="frontpage">
            <h1>kasperfyhn.github.io</h1>
        </div>
    );
}

function App() {
    return (
        <HashRouter>
            <div className="root">
                <Routes>
                    <Route path="/" element={<FrontPage/>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
