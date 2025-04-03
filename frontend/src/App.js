import React from "react";  //import react
import Navbar from "./components/Navbar"; //import navbar componenet
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom"; //this imports routes so we can access different pages
import Home from "./pages";  //import pages
import Artists from "./pages/Artists";
import Songs from "./pages/Songs";
import Albums from "./pages/Albums";

function App() {// fill Navbar with links to the other pages, path / means main page (so http://localhost:3000)
    return (
        <Router> 
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/Artists" element={<Artists />} />
                <Route path="/Albums" element={<Albums />}/>
                <Route path="/Songs" element={<Songs />} />
                
            </Routes>
        </Router>
    );
}

export default App;
