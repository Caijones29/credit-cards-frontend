import {BrowserRouter, Route, Routes} from "react-router";
import LandingPage from "../landingPageUI/landingPage/LandingPage";
import SessionPage from "../sessionPageUI/sessionPage/SessionPage";
import JoinPage from "../landingPageUI/joinPage/JoinPage";
import SessionTypePage from "../landingPageUI/sessionTypePage/SessionTypePage";
import ErrorPage from "../ErrorPage";

function App () {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/session/:sessionCode" element={<SessionPage />} />
                <Route path="/join-existing" element={<JoinPage />} />
                <Route path="/session-type" element={<SessionTypePage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;