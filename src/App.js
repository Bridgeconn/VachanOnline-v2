import React, { Suspense } from "react";
import Landing from "./components/landing/Landing";
import ReadBible from "./components/read/ReadBible";
import StudyBible from "./components/read/StudyBible";
import Stories from "./components/stories/Stories";
import PrivacyPolicy from "./components/privacypolicy/PrivacyPolicy";
import "./components/common/common.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Songs from "./components/songs/Songs";
import AudioBible from "./components/audio/AudioBible";
import UILanguageDialog from "./components/common/UILanguageDialog";

function Loading() {
  return <>Loading...</>;
}
const App = () => (
  <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <CssBaseline />
      <UILanguageDialog />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/read" element={<ReadBible />} />
        <Route path="/study" element={<StudyBible />} />
        <Route path="/biblestories" element={<Stories />} />
        <Route path="/audiobible" element={<AudioBible />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route render={() => <h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </Suspense>
);
export default App;
