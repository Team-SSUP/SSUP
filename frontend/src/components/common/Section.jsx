import GroupCard from "../group/GroupCard";

export default function Section({ title, groups }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {title}
      </h2>

      <div className="flex gap-4 flex-wrap">
        {groups.map((group, index) => (
          <GroupCard
            key={index}
            title={group.title}
            imageUrl={group.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
