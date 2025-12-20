//Header.jsx
import { Link,useNavigate } from "react-router-dom";

export default function Header() {
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate=useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <header className="w-full h-20 bg-white flex items-center justify-between px-12 border-b border-gray-200">

      <div className="text-2xl font-bold text-red-600 cursor-pointer"
      onClick={() => navigate("/")}
      >
        시흥시 놀이터
      </div>
      
      <input 
        type="text" 
        className="w-[400px] px-5 py-2.5 rounded-full border focus:ring-2 focus:ring-blue-400"
        placeholder="원하는 모임을 검색하세요"
      />

  
      <div className="flex gap-4">
        {isLoggedIn ? (
           <>
            {/* 마이페이지 */}
            <Link
              to="/mypage"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold"
            >
              마이페이지
            </Link>

            {/* 로그아웃 */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              로그아웃
            </button>
          </>
        ) : (
          // ❌ 비로그인 상태
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-gray-600"
            >
              로그인
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold"
            >
              회원가입
            </Link>
          </>
        )}
      </div>

    </header>
  );
}