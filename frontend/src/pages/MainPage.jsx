import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Section from "../components/common/Section";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainPage() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("전체");
  const [type, setType] = useState("전체"); // 전체 | 정규 | 번개
  const [hotMeetings, setHotMeetings] = useState([]);
  const [newMeetings, setNewMeetings] = useState([]);

  useEffect(() => {
    // 🔥 전체 + 전체일 때만 핫한 모임
    if (category === "전체" && type === "전체") {
      axios
        .get("http://localhost:8080/api/meetings/hot")
        .then((res) => setHotMeetings(res.data))
        .catch((err) => console.error(err));
    } else {
      setHotMeetings([]);
    }

    // ⏳ 신규 / 필터된 모임
    axios
      .get("http://localhost:8080/api/meetings", {
        params: {
          ...(category !== "전체" && { category }),
          ...(type !== "전체" && { type }),
        },
      })
      .then((res) => setNewMeetings(res.data))
      .catch((err) => console.error(err));
  }, [category, type]); // ✅ type 추가

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header />

      <div className="flex">
        {/* 🔥 type도 내려줘야 함 */}
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
            {/* 🔥 전체 + 전체일 때만 표시 */}
            {category === "전체" && type === "전체" && (
              <Section
                title="🔥 지금 핫한 모임"
                layout="grid"
                groups={hotMeetings}
              />
            )}

            {/* ⏳ 신규 / 필터된 모임 */}
            <Section
              title={
                category === "전체" && type === "전체"
                  ? "⏳ 신규 모임"
                  : `⏳ ${category !== "전체" ? category : type} 모임`
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
