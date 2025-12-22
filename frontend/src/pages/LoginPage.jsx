import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("login", {
        email: email,        // LoginDto.email
        password: password,  // LoginDto.password
      });

      // ✅ 핵심: token 문자열만 저장
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email); // 프로필 표시용

      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-white">
      <div className="w-[380px] bg-white rounded-2xl p-12 shadow-xl border border-gray-200">

        <h1 className="text-3xl font-bold text-center mb-10">
          로그인
        </h1>

        {/* 이메일 */}
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />

        {/* 비밀번호 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded"
        />

        {/* 로그인 */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-500 text-white rounded"
        >
          로그인
        </button>

        {/* 회원가입 */}
        <button
          onClick={() => navigate("/signup")}
          className="w-full py-3 mt-3 border rounded"
        >
          회원가입
        </button>

      </div>
    </div>
  );
}
