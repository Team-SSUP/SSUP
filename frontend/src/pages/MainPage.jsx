import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Section from "../components/common/Section";
import { useEffect, useState } from "react";
import axios from "axios";


export default function MainPage() {
  const [hotMeetings, setHotMeetings] = useState([]);
  const [newMeetings, setNewMeetings] = useState([]);


  useEffect(()=>{
    //활동이 활발한 모임
    axios
    .get("http://localhost:8080/api/meetings/hot")
    .then((res)=>setHotMeetings(res.data))
    .catch((err)=>console.error("hot meetings error",err));

    // 신규 모임
    axios
      .get("http://localhost:8080/api/meetings/new")
      .then((res) => setNewMeetings(res.data))
      .catch((err) => console.error("new meetings error", err));
  },[]);
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
            groups={hotMeetings}
          />
            
          <Section
            title="⏳ 신규 모임"
            layout="grid"
            groups={newMeetings}/>
        </div>  
        </main>
      </div>
    </div>
  );
}
