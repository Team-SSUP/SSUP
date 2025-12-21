import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Section from "../components/common/Section";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function MainPage() {
  const navigate = useNavigate();

  // 🔥 핵심: category는 null이 기본값
  const [category, setCategory] = useState(null);
  const [type, setType] = useState("전체"); // 전체 | 정규 | 번개

  const [hotMeetings, setHotMeetings] = useState([]);
  const [newMeetings, setNewMeetings] = useState([]);

  // 🔥 type 바뀌면 category 조건 제거 (정규/번개 단독 필터 보장)
  useEffect(() => {
    setCategory(null);
  }, [type]);

  useEffect(() => {
    // 🔥 핫한 모임 (전체 + 전체일 때만)
    if (type === "전체" && category === null) {
      api.get("/api/meetings/hot")
        .then(res => setHotMeetings(res.data))
        .catch(err => console.error(err));
    } else {
      setHotMeetings([]);
    }

    // ⏳ 필터 모임
    const params = {};

    if (type !== "전체") params.type = type;
    if (category !== null) params.category = category;

    api.get("/api/meetings", { params })
      .then(res => setNewMeetings(res.data))
      .catch(err => console.error(err));

  }, [type, category]);

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header />

      <div className="flex">
        <Sidebar
          category={category}
          setCategory={setCategory}
          type={type}
          setType={setType}
        />

        <main className="flex-1 px-14 py-10">
          <div className="mt-10 flex items-center justify-between">
            <p className="text-red-600 text-lg max-w-5xl">
              "시흥시 대학생들의 연결을 돕는 모임 플랫폼, 시흥시 놀이터"
            </p>

            <button
              onClick={() => navigate("/meetings/create")}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl"
            >
              + 모임 등록
            </button>
          </div>

          <div className="mt-10">
            {/* 🔥 핫한 모임 */}
            {type === "전체" && category === null && (
              <Section
                title="🔥 지금 핫한 모임"
                layout="grid"
                groups={hotMeetings}
              />
            )}

            {/* ⏳ 필터된 모임 */}
            <Section
              title={
                type === "전체" && category === null
                  ? "⏳ 신규 모임"
                  : `⏳ ${category ?? type} 모임`
              }
              layout="grid"
              groups={newMeetings}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
