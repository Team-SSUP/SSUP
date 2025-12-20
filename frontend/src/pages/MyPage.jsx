import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function MyPage() {
  const navigate = useNavigate();

  const [joinedMeetings, setJoinedMeetings] = useState([]);
  const [createdMeetings, setCreatedMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyMeetings = async () => {
      try {
        // 두 API를 동시에 호출
        const [joinedRes, createdRes] = await Promise.all([
          api.get("/meetings/my/joined"),
          api.get("/meetings/my/created"),
        ]);

        setJoinedMeetings(joinedRes.data || []);
        setCreatedMeetings(createdRes.data || []);
      } catch (error) {
        console.error("내 모임 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyMeetings();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-gray-500">
        로딩중...
      </div>
    );
  }

  // 공통 UI
  const EmptyState = ({ text }) => (
    <div className="w-full h-32 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-xl">
      {text}
    </div>
  );

  const MeetingGrid = ({ meetings, emptyText }) => (
    meetings.length === 0 ? (
      <EmptyState text={emptyText} />
    ) : (
      <div className="grid grid-cols-4 gap-5">
        {meetings.map((m) => (
          <div
            key={m.id}
            onClick={() => navigate(`/meeting/${m.id}`)}
            className="h-32 bg-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-300 transition"
          >
            <h4 className="font-semibold truncate">{m.title}</h4>
          </div>
        ))}
      </div>
    )
  );

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-[1100px] bg-white rounded-xl shadow-lg p-8">

        {/* 상단 */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">마이 페이지</h2>
          <button
            onClick={() => navigate("/profile")}
            className="px-5 py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200"
          >
            프로필 변경
          </button>
        </div>

        {/* 내가 참여한 모임 */}
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">내가 참여한 모임</h3>
          <MeetingGrid
            meetings={joinedMeetings}
            emptyText="참여한 모임이 없습니다"
          />
        </section>

        {/* 내가 만든 모임 */}
        <section>
          <h3 className="text-xl font-bold mb-4">내가 만든 모임</h3>
          <MeetingGrid
            meetings={createdMeetings}
            emptyText="내가 만든 모임이 없습니다"
          />
        </section>

      </div>
    </div>
  );
}
