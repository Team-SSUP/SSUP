export default function Sidebar({
  category,
  setCategory,
  type,
  setType,
}) {
  return (
    <aside className="w-[180px] h-full border-r bg-white px-5 py-6 flex flex-col gap-6">


      <div className="text-lg font-bold text-gray-800">
        메뉴
      </div>
      {/* 정규 / 번개 */}
      <nav className="flex flex-col gap-3">
        {["전체", "정규", "번개"].map(t => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`text-left px-3 py-2 rounded-md transition
              ${
                type === t
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
          >
            {t === "전체" ? "전체 모임" : `${t}모임`}
          </button>
        ))}
      </nav>

      <hr />

      {/* 카테고리 */}
      <div className="flex flex-col gap-2">
        {["전체", "운동", "스터디", "독서", "게임"].map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`text-left px-3 py-2 rounded-md transition
              ${
                category === c
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
          >
            {c}
          </button>
        ))}
      </div>
    </aside>
  );
}
