import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword"); // URL에서 keyword 가져오기
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // 백엔드 검색 API 호출
        const response = await api.get(`/meetings/search?keyword=${keyword}`);
        setMeetings(response.data);
      } catch (error) {
        console.error("검색 실패", error);
      }
    };

    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword]); // keyword가 바뀔 때마다 재실행

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* 1. 상단 헤더 */}
      <Header />

      <div className="flex">
        {/* 2. 좌측 사이드바 */}
        <Sidebar />

        {/* 3. 우측 메인 콘텐츠 영역 */}
        <div className="flex-1 flex justify-center py-10">
          <div className="w-[1100px] bg-white rounded-xl shadow-lg p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">
              "{keyword}" 검색 결과 ({meetings.length}건)
            </h2>

            {meetings.length === 0 ? (
              <div className="text-center text-gray-500 py-20">
                검색 결과가 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-5">
                {meetings.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => navigate(`/meetings/${m.id}`)}
                    className="bg-gray-200 h-40 rounded-xl p-4 cursor-pointer hover:bg-gray-300 transition flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs text-blue-500 font-bold mb-1 block">
                        {m.category}
                      </span>
                      <h4 className="font-bold text-lg leading-tight line-clamp-2">
                        {m.title}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-500">
                      {m.location} | {m.currentMembers}/{m.maxMembers}명
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}