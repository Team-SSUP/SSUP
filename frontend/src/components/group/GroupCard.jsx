// GroupCard.jsx
export default function GroupCard({ title, imageUrl }) {
  return (
    <div className="w-64 rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white">
      
      {/* 이미지 */}
      <div className="h-32 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800">
          {title}
        </h3>
      </div>
    </div>
  );
}