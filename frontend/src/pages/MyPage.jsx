export default function MyPage() {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      {/* 전체 박스 */}
      <div className="w-[1100px] h-[650px] bg-white rounded-xl shadow-lg flex">

        {/* 왼쪽 사이드바 */}
        <aside className="w-[320px] border-r border-gray-200 p-6">
          
          {/* 프로필 변경 */}
          <button className="w-full py-3 mb-8 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition">
            프로필 변경
          </button>

          {/* 나의 정기 모임 */}
          <section className="mb-8">
            <h3 className="font-bold mb-3">나의 정기 모임</h3>
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>
            </div>
          </section>

          {/* 나의 번개모임 */}
          <section className="mb-8">
            <h3 className="font-bold mb-3">나의 번개모임</h3>
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>
            </div>
          </section>

          {/* 내가 만든 모임 */}
          <section>
            <h3 className="font-bold mb-3">내가 만든 모임</h3>
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>
            </div>
          </section>

        </aside>

        {/* 오른쪽 메인 영역 */}
        <main className="flex-1 p-10">
          <h2 className="text-2xl font-bold mb-6">마이 페이지</h2>

          <div className="w-full h-[480px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
            선택한 항목의 상세 내용 영역
          </div>
        </main>

      </div>
    </div>
  );
}
