import RecommendationCard from "./RecommendationCard";

export default function ScrollingRecommendations({ recommendations }) {
  return (
    <div className="overflow-hidden relative w-full">
      <div className="flex gap-6 animate-scroll whitespace-nowrap">
        {[...recommendations, ...recommendations].map((rec, i) => (
          <div key={i} className="min-w-[320px]">
            <RecommendationCard course={rec} />
          </div>
        ))}
      </div>
    </div>
  );
}
