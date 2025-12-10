import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full h-20 bg-white shadow-sm flex items-center justify-between px-12">

      <div className="text-2xl font-bold text-blue-600">
        시흥시 놀이터
      </div>

      <input 
        type="text" 
        className="w-[400px] px-5 py-2.5 rounded-full border focus:ring-2 focus:ring-blue-400"
        placeholder="원하는 모임을 검색하세요"
      />

      <div className="flex gap-4 text-sm">
        <button className="px-4 py-2 bg-gray-100 rounded-lg" 
        onClick={()=> navigate("/login")}>
          로그인 
          </button>
        <button className="px-4 py-2 bg-gray-100 rounded-lg">회원가입</button>
      </div>

    </header>
  );
}
