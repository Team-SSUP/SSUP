import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Section from "../components/common/Section";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">

      {/* 상단 헤더 */}
      <Header />

      <div className="flex">

        {/* 사이드바 */}
        <Sidebar />

        {/* 메인 컨텐츠 */}
        <main className="flex-1 px-14 py-10">


        <div className="mt-10 text-center">
          <p className="text-red-600 text-lg leading-relaxed">
            "시흥시 대학생들의 연결을 돕는 모임 플랫폼, 시흥시 놀이터.
다양한 관심사 모임을 만들고 함께 활동해보세요."
          </p>
        </div>


          <div className="mt-10">
            <Section
          
            
            title="🔥 활동이 활발한 모임"
            layout="grid"
            groups={[
              { title: "헬스 같이해요", imageUrl: "https://picsum.photos/600?1" },
              { title: "스터디 모임", imageUrl: "https://picsum.photos/600?2" },
              { title: "독서 정모", imageUrl: "https://picsum.photos/600?3" },
              { title: "새로운 모임 2", imageUrl: "https://picsum.photos/600?4" },
            ]}
          />

          <Section
            title="⏳ 마감 임박 모임"
            layout="grid"
            groups={[
              { title: "풋살 팀원 모집", imageUrl: "https://picsum.photos/600?5" },
              { title: "PT 그룹 모임", imageUrl: "https://picsum.photos/600?6" },
            ]}
          />
          </div>

            
        </main>
      </div>
    </div>
  );
}
