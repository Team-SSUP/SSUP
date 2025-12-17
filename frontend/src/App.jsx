import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import MeetingDetailPage from "./pages/MeetingDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<ProfilePage />} />
        <Route path="/meetings/:id" element={<MeetingDetailPage />} />

      </Routes>
    </BrowserRouter>
  );
}
