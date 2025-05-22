import { useTips } from './Context/TipsContext';

const TrendingTips = () => {
  const { tips, likeTip } = useTips();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tips.map((tip) => (
        <div key={tip._id} className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">{tip.title}</h2>
          <p>{tip.description}</p>
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={() => likeTip(tip._id)}
              className="btn btn-sm bg-gradient-to-r from-blue-500 to-green-500 text-white"
            >
              👍 Like
            </button>
            <span>{tip.totalLiked} Likes</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingTips;
