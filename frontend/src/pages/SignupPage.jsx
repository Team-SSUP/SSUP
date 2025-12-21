import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [nickname, setNickname] = useState(""); // name → nickname
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!nickname || !email || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await api.post("/api/signup", {
        email: email,          // SignupDto.email
        nickname: nickname,    // SignupDto.nickname
        password: password,    // SignupDto.password
      });

      alert("회원가입 성공! 로그인 해주세요.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("이미 존재하는 이메일이거나 서버 오류입니다.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-white">
      <div className="w-[380px] bg-white rounded-2xl p-12 shadow-xl border border-gray-200">

        <h1 className="text-3xl font-bold text-center mb-10">회원가입</h1>

        {/* 닉네임 */}
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />

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
          className="w-full p-3 mb-4 border rounded"
        />

        {/* 비밀번호 확인 */}
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          className="w-full p-3 mb-6 border rounded"
        />

        <button
          onClick={handleSignUp}
          className="w-full py-3 bg-blue-500 text-white rounded"
        >
          회원가입
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 mt-3 border rounded"
        >
          로그인하러 가기
        </button>
      </div>
    </div>
  );
}
