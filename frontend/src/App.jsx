import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import ProfilePage from "./pages/ProfilePage";
import MeetingDetailPage from "./pages/MeetingDetailPage";
import MeetingCreatePage from "./pages/MeetingCreatePage";
import MeetingEditPage from "./pages/MeetingEditPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/meetings/create" element={<MeetingCreatePage />} />
        <Route path="/meetings/:id" element={<MeetingDetailPage />} />
        <Route path="/meetings/:id/edit" element={<MeetingEditPage />} />
        <Route path="/search" element={<SearchPage />} />

      </Routes>
    </BrowserRouter>
  );
}