import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-white">
      <div className="w-[380px] bg-white rounded-2xl p-12 shadow-xl border border-gray-200">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 tracking-tight">
          회원가입
        </h1>

        {/* 이름 */}
        <div className="flex flex-col mb-6">
          <label className="text-sm font-semibold mb-1 text-gray-600">
            이름
          </label>
          <input
            type="text"
            placeholder="이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 text-[15px] border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>

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

        {/* 비밀번호 확인 */}
        <div className="flex flex-col mb-6">
          <label className="text-sm font-semibold mb-1 text-gray-600">
            비밀번호 확인
          </label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            className="p-3 text-[15px] border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>

        {/* 회원가입 버튼 */}
        <button
          onClick={() =>
            console.log("회원가입:", { name, email, password, passwordCheck })
          }
          className="w-full py-3 bg-blue-500 text-white rounded-lg text-[17px] font-semibold mt-2 transition hover:bg-blue-600"
        >
          회원가입
        </button>

        {/* 로그인 이동 */}
        <button
          onClick={()=> navigate("/login")}
          className="w-full py-3 bg-white border border-gray-300 text-gray-600 rounded-lg text-[16px] font-medium mt-3 transition hover:bg-gray-100"
        >
          로그인하러 가기
        </button>

      </div>
    </div>
  );
}
