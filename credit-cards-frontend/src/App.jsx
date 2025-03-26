import {BrowserRouter, Route, Routes} from "react-router";
import LandingPage from "./LandingPage";
import SessionPage from "./SessionPage";
import JoinPage from "./JoinPage";

function App () {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/session/:sessionCode" element={<SessionPage />} />
                <Route path="/join-existing" element={<JoinPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;