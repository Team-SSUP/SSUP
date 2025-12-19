import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MeetingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setMeeting] = useState(null);

  // 임시 멤버 데이터
  const members = [
    { id: 1, name: "정찬우", imageUrl: "https://picsum.photos/100?1" },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/meetings/${id}`)
      .then((res) => setMeeting(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!group) {
    return (
      <div className="min-h-screen bg-[#f7f9fb]">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-10">로딩중...</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      {/* 상단 헤더 */}
      <Header />

      <div className="flex">
        {/* 사이드바 */}
        <Sidebar />

        {/* 메인 컨텐츠 */}
        <main className="flex-1 px-14 py-10">
          {/* 뒤로가기 */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-sm text-gray-600 hover:underline"
          >
            ← 뒤로가기
          </button>

           {/* ✅ 대표 이미지 */}
 <div className="w-full h-[500px] rounded-2xl overflow-hidden mb-10">
  <img
    src={group.imageUrl}
    alt={group.title}
    className="w-full h-full object-contain"
  />
</div>



          {/* 상세 카드 */}
          <div className="bg-white rounded-2xl shadow p-8 mb-10">
            {/* 제목 + 카테고리 */}
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {group.title}
              </h1>
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                {group.category}
              </span>
            </div>

            {/* 메타 정보 */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{group.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>
                  {group.currentMembers} / {group.maxMembers}명
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{group.location}</span>
              </div>
            </div>

            {/* 모임 소개 */}
            <div>
              <h2 className="text-lg font-semibold mb-2">모임 소개</h2>
              <p className="text-gray-700 leading-relaxed">
                {group.content}
              </p>
            </div>
          </div>
          {/* 모임 참가 버튼 */}
<div className="mt-8">
  <button
    disabled={group.currentMembers >= group.maxMembers}
    onClick={() => {
      alert("모임 참가 요청이 완료되었습니다!");
      // 나중에 여기서 POST /api/meetings/{id}/join 같은 API 호출
    }}
    className={`w-full py-4 rounded-xl text-white font-semibold transition
      ${
        group.currentMembers >= group.maxMembers
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }
    `}
  >
    {group.currentMembers >= group.maxMembers
      ? "모집이 마감된 모임입니다"
      : "모임 참가하기"}
  </button>
</div>


          {/* 멤버 목록 */}
          <div className="bg-white rounded-2xl shadow p-8 mt-8">
            <h2 className="text-lg font-semibold mb-6">
              참여 멤버 ({members.length})
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center bg-gray-50 rounded-xl p-4"
                >
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover mb-3"
                  />
                  <span className="font-medium text-gray-800">
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
