import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex justify-center py-10">
      {/* 전체 박스 */}
      <div className="w-[1100px] bg-white rounded-xl shadow-lg p-8">

        {/* 상단 */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">마이 페이지</h2>
          <button
            onClick={() => navigate("/profile")}
            className="px-5 py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            프로필 변경
          </button>
        </div>

        {/* 내가 참여한 모임 */}
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">내가 참여한 모임</h3>
          <div className="grid grid-cols-4 gap-5">
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
          </div>
        </section>

        {/* 내가 만든 모임 */}
        <section>
          <h3 className="text-xl font-bold mb-4">내가 만든 모임</h3>
          <div className="grid grid-cols-4 gap-5">
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
          </div>
        </section>

      </div>
    </div>
  );
}