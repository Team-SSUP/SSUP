// Sidebar.jsx
export default function Sidebar() {
  return (
    <aside className="w-[180px] h-full border-r bg-white px-5 py-6 flex flex-col gap-6 flex-shrink-0">

      {/* 상단 메뉴 제목 */}
      <div className="text-lg font-bold text-gray-800">
        메뉴
      </div>

      {/* 정기모임 / 번개모임 */}
      <nav className="flex flex-col gap-3">
        <button className="text-left px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition">
          정기모임
        </button>

        <button className="text-left px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition">
          번개모임
        </button>
      </nav>

      <hr className="border-gray-300" />

      {/* 카테고리 */}
      <div>
        <div className="text-sm font-semibold text-gray-600 ml-10">카테고리</div>

        <div className="flex flex-col gap-2">
          <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100 transition">
            운동
          </button>
          <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100 transition">
            스터디
          </button>
          <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100 transition">
            독서
          </button>
          <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100 transition">
            게임
          </button>
        </div>
      </div>

    </aside>
  );
}