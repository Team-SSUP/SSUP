import { useState } from "react";
import api from "../api/axios"; // axios instance
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/login", {
        username: email,
        password,
      });

      // 토큰 저장
      const token = response.data.token;
      localStorage.setItem("token", token);

      // 유저 정보
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("name", response.data.name);

      console.log("로그인 성공:", response.data);
      alert("로그인 성공");

      // 메인 페이지 이동
      navigate("/");

    } catch (error) {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-white">
      <div className="w-[380px] bg-white rounded-2xl p-12 shadow-xl border border-gray-200">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 tracking-tight">
          로그인
        </h1>

        {/* 이메일 */}
        <div className="flex flex-col mb-6">
          <label className="text-sm font-semibold mb-1 text-gray-600">
            이메일
          </label>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 text-[15px] border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col mb-6">
          <label className="text-sm font-semibold mb-1 text-gray-600">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 text-[15px] border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-500 text-white rounded-lg text-[17px] font-semibold mt-2 transition hover:bg-blue-600"
        >
          로그인
        </button>

        {/* 회원가입 버튼 */}
        <button
          onClick={() => navigate("/signup")}
          className="w-full py-3 bg-blue-500 text-white rounded-lg text-[17px] font-semibold mt-2 transition hover:bg-blue-600"
        >
          회원가입
        </button>

      </div>
    </div>
  );
}
