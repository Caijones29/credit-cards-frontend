import {BrowserRouter, Route, Routes} from "react-router";
import LandingPage from "./LandingPage";
import SessionPage from "./SessionPage";
import JoinPage from "./JoinPage";
import SessionTypePage from "./SessionTypePage";

function App () {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/session/:sessionCode" element={<SessionPage />} />
                <Route path="/join-existing" element={<JoinPage />} />
                <Route path="/session-type" element={<SessionTypePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;