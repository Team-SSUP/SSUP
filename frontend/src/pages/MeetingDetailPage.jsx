import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios"; // ⭐ axios instance 사용

export default function MeetingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);

  // 임시 멤버 데이터
  const members = [
    { id: 1, name: "정찬우", imageUrl: "https://picsum.photos/100?1" },
  ];

  // ✅ 상세 조회
  useEffect(() => {
    api
      .get(`/api/meetings/${id}`)
      .then((res) => setGroup(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // ✅ 삭제
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await api.delete(`/api/meetings/${id}`);
      alert("모임이 삭제되었습니다.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("삭제 권한이 없습니다.");
    }
  };

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
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-14 py-10">
          {/* 뒤로가기 */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-sm text-gray-600 hover:underline"
          >
            ← 뒤로가기
          </button>

          {/* 대표 이미지 */}
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
                <span>
                  {group.meetingDate ? group.meetingDate : "정규 모임"}
                </span>
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

            {/* 수정 / 삭제 */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate(`/meetings/${id}/edit`)}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                수정
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>

          {/* 참가 버튼 */}
          <div className="mt-8">
            <button
              disabled={group.currentMembers >= group.maxMembers}
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
