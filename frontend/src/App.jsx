import { useState } from "react";
import "./App.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-background">
      <div className="login-container">

        <h1 className="login-title">로그인</h1>

        <div className="input-box">
          <label>이메일</label>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-box">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="login-btn"
          onClick={() => console.log("로그인:", email, password)}
        >
          로그인
        </button>

        <button
          className="signup-btn"
          onClick={() => console.log("회원가입 이동")}
        >
          회원가입
        </button>

      </div>
    </div>
  );
}
