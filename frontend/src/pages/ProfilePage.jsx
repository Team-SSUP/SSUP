import { useEffect, useState } from "react";
import api from "../api/axios"; // axios instance 사용
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 마이페이지 진입 시 내 정보 불러오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/profile");
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error("프로필 조회 실패", error);
        // 토큰 없거나 만료 → axios interceptor에서 /login 이동
      }
    };

    fetchProfile();
  }, []);

  // 이름 변경
  const handleNameUpdate = async () => {
    try {
      await api.put("/api/profile/name", {
        name,
      });
      alert("이름이 변경되었습니다.");
    } catch (error) {
      alert("이름 변경 실패");
    }
  };

  // 비밀번호 변경
  const handlePasswordUpdate = async () => {
    if (!password) {
      alert("새 비밀번호를 입력해주세요.");
      return;
    }

    try {
      await api.put("/api/profile/password", {
        password,
      });
      alert("비밀번호가 변경되었습니다.");
      setPassword("");
    } catch (error) {
      alert("비밀번호 변경 실패");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[700px] h-[450px] bg-white rounded-2xl shadow-xl p-10 flex gap-10">

        {/* 프로필 이미지 */}
        <div className="w-1/3 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            이미지
          </div>

          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            이미지 업로드
          </button>

          <button className="mt-2 px-4 py-2 bg-red-100 text-red-500 rounded-lg">
            이미지 삭제
          </button>
        </div>

        {/* 정보 수정 */}
        <div className="w-2/3 flex flex-col gap-6">

          {/* 이름 */}
          <div>
            <label className="block text-sm font-semibold mb-1">이름</label>
            <div className="flex gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 p-2 border rounded-lg bg-gray-100"
              />
              <button
                onClick={handleNameUpdate}
                className="px-4 bg-gray-200 rounded-lg"
              >
                수정
              </button>
            </div>
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-semibold mb-1">이메일</label>
            <input
              value={email}
              disabled
              className="w-full p-2 border rounded-lg bg-gray-200 text-gray-500"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-semibold mb-1">비밀번호</label>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="새 비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-2 border rounded-lg bg-gray-100"
              />
              <button
                onClick={handlePasswordUpdate}
                className="px-4 bg-gray-200 rounded-lg"
              >
                변경
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}