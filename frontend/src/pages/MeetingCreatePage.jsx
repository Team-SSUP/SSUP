import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // axios instance

export default function MeetingCreatePage() {
  const navigate = useNavigate();

  // 🔹 meetingDate를 제외한 form
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    location: "",
    maxMembers: 2,
    imageUrl: "",
  });

  // 🔹 meetingDate는 따로 관리 (팀원 방식)
  const [meetingDate, setMeetingDate] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...form,
        // 🔥 핵심 로직
        meetingDate: meetingDate === "" ? null : meetingDate,
      };

      await api.post("meetings", submitData);

      alert("모임이 등록되었습니다!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("모임 등록 실패");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-14 py-10">
          <h1 className="text-2xl font-bold mb-8">모임 등록</h1>

          <div className="bg-white rounded-2xl shadow p-8 max-w-2xl">
            {/* 제목 */}
            <div className="mb-5">
              <label className="block mb-1 font-semibold">모임 이름</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="모임 이름 입력"
              />
            </div>

            {/* 카테고리 */}
            <div className="mb-5">
              <label className="block mb-1 font-semibold">카테고리</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="스터디 / 운동 / 취미"
              />
            </div>

            {/* 소개 */}
            <div className="mb-5">
              <label className="block mb-1 font-semibold">모임 소개</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-lg p-3"
                placeholder="모임에 대한 설명을 입력하세요"
              />
            </div>

            {/* 장소 */}
            <div className="mb-5">
              <label className="block mb-1 font-semibold">장소</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* 모임 날짜 (datetime-local) */}
            <div className="mb-5">
              <label className="block mb-1 font-semibold">모임 날짜</label>
              <input
                type="datetime-local"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* 인원 */}
            <div className="mb-5">
              <label className="block mb-1 font-semibold">최대 인원</label>
              <input
                type="number"
                name="maxMembers"
                value={form.maxMembers}
                onChange={handleChange}
                min={2}
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* 이미지 */}
            <div className="mb-8">
              <label className="block mb-1 font-semibold">
                대표 이미지 URL (없을경우 지도가 대표이미지로 등록됩니다.)
              </label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="이미지 URL 입력"
              />
            </div>

            {/* 버튼 */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              모임 등록하기
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
