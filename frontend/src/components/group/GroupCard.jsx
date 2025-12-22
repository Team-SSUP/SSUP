// GroupCard.jsx
import { MapPin,Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function GroupCard({ group }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/meetings/${group.id}`)} 
      className="w-full bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white">
      
      
      {/* 이미지 */}
      <div className="relative w-full h-44 bg-gray-200">
        {group.imageUrl ? (
          <img
            src={group.imageUrl}
            alt={group.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
            이미지 없음
          </div>
        )}
        {/* 카테고리 배지 */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          {group.category}
        </span>
      </div>

    

      {/* 콘텐츠 */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800">
          {group.title}
        </h3>

        <div className="flex items-center text-sm text-gray-500 gap-2">
          <MapPin size={14} />
          <span>{group.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <Clock size={14} />
          <span>{group.date}</span>
        </div>

        <div className="flex items-center justify-end text-sm text-gray-700 gap-1">
          {/* <Users size={16} /> */}
          <span className="font-semibold">
            {group.currentMembers}/{group.maxMembers}명
          </span>
        </div>
      </div>
    </div>
  );
}