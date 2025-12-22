//Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Header() {
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // 2. 토큰이 있을 때만 서버에 확인 요청을 보냅니다.
    const token = localStorage.getItem("token");
    
    if (token) {
      api.get("/api/me")
        .then(() => {
          // 3. 서버 응답이 성공(200 OK)하면 로그인 상태로 변경합니다.
          setIsLoggedIn(true);
        })
        .catch(() => {
          // 4. 실패(토큰 만료, 서버 재시작 등)하면 토큰을 지우고 로그아웃 상태를 유지합니다.
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("nickname");
          setIsLoggedIn(false);
        });
    }
  }, []); // 페이지 로드 시 한 번만 실행

  const handleLogout = () => {
    localStorage.clear(); // 모든 정보 삭제
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  // 엔터키 눌렀을 때 검색 실행
  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
    }
  };

  
  return (
    <header className="w-full h-20 bg-white flex items-center justify-between px-12 border-b border-gray-200">

      <div className="text-2xl font-bold text-red-600 cursor-pointer"
      onClick={() => navigate("/")}
      >
        시흥시 놀이터
      </div>
      
      {/* 검색창 */}
      <input 
        type="text" 
        className="w-[400px] px-5 py-2.5 rounded-full border focus:ring-2 focus:ring-blue-400"
        placeholder="원하는 모임을 검색하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleSearch}
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
          //비로그인 상태
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