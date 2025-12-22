import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const email = localStorage.getItem("email"); // 표시용

  const handleUpdate = async () => {
    if (!nickname && !password) {
      alert("수정할 내용을 입력하세요.");
      return;
    }

    try {
      await api.put("profile/update", {
        nickname: nickname || null,
        password: password || null,
      });

      alert("프로필이 수정되었습니다.");
      navigate("/");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("프로필 수정 실패");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[400px] bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6 text-center">내 프로필</h2>

        {/* 닉네임 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">닉네임</label>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="새 닉네임"
          />
        </div>

        {/* 이메일 (읽기 전용) */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">이메일</label>
          <input
            value={email || ""}
            disabled
            className="w-full p-2 border rounded bg-gray-200 text-gray-500"
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">새 비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="변경할 경우에만 입력"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full py-3 bg-blue-500 text-white rounded"
        >
          수정하기
        </button>
      </div>
    </div>
  );
}
