export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-[400px]">
        <h2 className="text-2xl font-bold mb-6">로그인</h2>

        <input
          type="text"
          placeholder="아이디"
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full border p-2 rounded mb-4"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          로그인
        </button>
      </div>
    </div>
  );
}
    