// team-ssup/ssup/SSUP-han/frontend/src/components/group/GroupCard.jsx

import { MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function GroupCard({ group }) {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [coords, setCoords] = useState(null);

  // 이미지 URL이 없을 때만 지도를 그리기 위해 좌표 검색
  useEffect(() => {
    if (group.imageUrl || !group.location || !window.kakao) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(group.location, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setCoords(new window.kakao.maps.LatLng(result[0].y, result[0].x));
      }
    });
  }, [group.imageUrl, group.location]);

  // 좌표가 구해지면 StaticMap(정적 지도) 렌더링
  useEffect(() => {
    if (!coords || !mapRef.current || !window.kakao) return;

    const staticMapContainer = mapRef.current;
    const staticMapOption = {
      center: coords, // 지도 중심좌표
      level: 3,       // 확대 레벨
      marker: {
        position: coords // 마커 표시
      }
    };

    new window.kakao.maps.StaticMap(staticMapContainer, staticMapOption);
  }, [coords]);

  return (
    <div
      onClick={() => navigate(`/meetings/${group.id}`)} 
      className="w-full bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white"
    >
      
      {/* 이미지 영역 */}
      <div className="relative w-full h-44 bg-gray-100">
        {group.imageUrl ? (
          // 1. 이미지가 있는 경우: 기존대로 이미지 표시
          <img
            src={group.imageUrl}
            alt={group.title}
            className="w-full h-full object-cover"
          />
        ) : (
          // 2. 이미지가 없는 경우: 카카오 정적 지도 표시
          <div 
            ref={mapRef} 
            className="w-full h-full"
            style={{ pointerEvents: 'none' }} // 드래그/클릭 방지 (이미지처럼 보이게)
          >
            {/* 지도가 로딩되기 전 표시할 텍스트 */}
            {!coords && (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                지도 로딩중...
              </div>
            )}
          </div>
        )}

        {/* 카테고리 배지 */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full z-10">
          {group.category}
        </span>
      </div>

      {/* 콘텐츠 영역 (기존 코드 유지) */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {group.title}
        </h3>

        <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
          <MapPin size={14} />
          <span className="truncate">{group.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <Clock size={14} />
          <span>{group.date || "날짜 미정"}</span>
        </div>

        <div className="flex items-center justify-end text-sm text-gray-700 gap-1 mt-2">
          <span className="font-semibold">
            {group.currentMembers}/{group.maxMembers}명
          </span>
        </div>
      </div>
    </div>
  );
}