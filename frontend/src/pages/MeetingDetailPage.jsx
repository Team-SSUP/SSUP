import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import api from "../api/axios";

export default function MeetingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  // [추가] 상단 배너용 지도 참조 및 좌표 상태
  const bannerMapRef = useRef(null); 
  const [bannerCoords, setBannerCoords] = useState(null);

  // [추가] 배너용 좌표 검색 로직
  useEffect(() => {
    if (!group || group.imageUrl || !window.kakao) return; // 이미지가 있으면 실행 X

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(group.location, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setBannerCoords(new window.kakao.maps.LatLng(result[0].y, result[0].x));
      }
    });
  }, [group]);

  // [추가] 배너용 StaticMap 그리기
  useEffect(() => {
    if (!bannerCoords || !bannerMapRef.current || !window.kakao) return;

    new window.kakao.maps.StaticMap(bannerMapRef.current, {
      center: bannerCoords,
      level: 3,
      marker: { position: bannerCoords }
    });
  }, [bannerCoords]);

  // 상세 조회 
  const fetchMeeting = async () => {
    try {
      const res = await api.get(`meetings/${id}`);
      setGroup(res.data);
    } catch (err) {
      console.error(err);
      alert("모임 정보를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    fetchMeeting();
  }, [id]);

  // 카카오 지도 렌더링
  useEffect(() => {
    // 1. 필수 데이터 확인
    if (!group || !window.kakao) return;

    // 2. 지도를 담을 div 찾기
    const container = document.getElementById("map");
    if (!container) return; // 혹시라도 div가 없으면 종료

    container.innerHTML = "";

    // 3. 약간의 딜레이를 주어 DOM이 확실히 준비된 후 실행
    setTimeout(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 좌표
        level: 3,
      };

      // 지도 생성
      const map = new window.kakao.maps.Map(container, options);
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 주소 검색
      geocoder.addressSearch(group.location, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 마커 표시
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 지도 중심 이동
          map.setCenter(coords);
          
          // [중요] 지도가 깨지지 않도록 레이아웃 재설정
          map.relayout();
        } else {
          console.warn("주소 검색 실패:", status);
        }
      });
    }, 500); // 0.5초 뒤에 실행

  }, [group]);

  // 모임 참가
  const handleJoin = async () => {
    if (!window.confirm("이 모임에 참가하시겠습니까?")) return;

    try {
      await api.post(`meetings/${id}/join`);
      alert("참가 신청이 완료되었습니다!");
      fetchMeeting(); // 데이터 새로고침 (인원수/명단 갱신)
    } catch (error) {
      // 이미 참여했거나 인원이 꽉 찬 경우 등 에러 처리
      const msg = error.response?.data?.message || "참가 처리에 실패했습니다.";
      alert(msg);
    }
  };

  //  삭제
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await api.delete(`meetings/${id}`);
      alert("모임이 삭제되었습니다.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("삭제 권한이 없습니다.");
    }
  };

  if (!group) {
    return (
      <div className="min-h-screen bg-[#f7f9fb]">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-10">로딩중...</main>
        </div>
      </div>
    );
  }

  // 참여 여부 확인 (내 닉네임이 목록에 있는지)
  // (실제로는 ID로 비교하는 것이 정확하지만, 일단 닉네임이나 토큰 로직에 따라 유연하게 처리)
  const isJoined = false; // 필요하다면 group.participants에서 내 정보를 찾아 true로 설정

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-14 py-10">
          {/* 뒤로가기 */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-sm text-gray-600 hover:underline"
          >
            ← 뒤로가기
          </button>

          {/* 대표 이미지 영역 수정 */}
          <div className="w-full h-[500px] rounded-2xl overflow-hidden mb-10 bg-gray-100 flex items-center justify-center relative">
            {group.imageUrl ? (
              <img
                src={group.imageUrl}
                alt={group.title}
                className="w-full h-full object-contain"
              />
            ) : (
              // 이미지가 없으면 지도 표시
              <div ref={bannerMapRef} className="w-full h-full"></div>
            )}
          </div>

          {/* 상세 카드 */}
          <div className="bg-white rounded-2xl shadow p-8 mb-10">
            {/* 제목 + 카테고리 */}
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {group.title}
              </h1>
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                {group.category}
              </span>
            </div>

            {/* 메타 정보 */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>
                  {group.meetingDate
                    ? new Date(group.meetingDate).toLocaleString()
                    : "정규 모임"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>
                  {group.currentMembers} / {group.maxMembers}명
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{group.location}</span>
              </div>
            </div>

            {/* 모임 소개 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">모임 소개</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {group.content}
              </p>
            </div>

            {/*  지도 표시 영역 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">오시는 길</h2>
              <div
                id="map"
                className="w-full rounded-lg border border-gray-200"
                style={{ width: "100%", height: "350px" }} // [추가] 강제로 높이 지정
              ></div>
            </div>

            {/* 삭제 버튼 (개설자일 때만 보이도록 조건 처리 권장) */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate(`/meetings/${id}/edit`)}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                수정
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>

          {/* [수정] 참가 버튼: handleJoin 연결 */}
          <div className="mt-8">
            <button
              onClick={handleJoin}
              disabled={group.currentMembers >= group.maxMembers}
              className={`w-full py-4 rounded-xl text-white font-semibold transition
                ${
                  group.currentMembers >= group.maxMembers
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              {group.currentMembers >= group.maxMembers
                ? "모집이 마감된 모임입니다"
                : "모임 참가하기"}
            </button>
          </div>

          {/* [수정] 실제 참여자 목록 표시 */}
          <div className="bg-white rounded-2xl shadow p-8 mt-8">
            <h2 className="text-lg font-semibold mb-6">
              참여 멤버 ({group.participants?.length || 0}명)
            </h2>

            {(!group.participants || group.participants.length === 0) ? (
               <p className="text-gray-500">아직 참여한 멤버가 없습니다.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {group.participants.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col items-center bg-gray-50 rounded-xl p-4"
                  >
                    {/* 프로필 이미지가 없으므로 랜덤 아바타 사용 */}
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.nickname}`}
                      alt={member.nickname}
                      className="w-20 h-20 rounded-full object-cover mb-3 bg-white border"
                    />
                    <span className="font-medium text-gray-800">
                      {member.nickname}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}