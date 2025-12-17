//Section.jsx
import GroupCard from "../group/GroupCard";

export default function Section({ title, groups }) {
  return (
    <section className="mb-20">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {title}
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-6"> 
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
          />
        ))}
      </div>
    </section>
  );
}
