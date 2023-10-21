const FullStar = () => <span className="star">&#9733;</span>;

const ThreeQuarterStar = () => (
  <span className="star">&#9733;</span>
  // Add styling to show only 3/4 of the star
);

const HalfStar = () => (
  <span className="star">&#9733;</span>
  // Add styling to show only 1/2 of the star
);

const QuarterStar = () => (
  <span className="star">&#9733;</span>
  // Add styling to show only 1/4 of the star
);

const Star = () => <span className="star">&#9734;</span>;

const Rating = ({ n }) => {
  const fullStars = Math.floor(n);
  const decimalPart = n - fullStars;
  const quarter = Math.round(decimalPart * 4);

  return (
    <div className="mt-2 flex items-center">
      {[...Array(5)].map((e, i) => {
        if (i < fullStars) {
          return <FullStar key={i} />;
        } else if (i === fullStars) {
          if (quarter === 1) {
            return <QuarterStar key={i} />;
          } else if (quarter === 2) {
            return <HalfStar key={i} />;
          } else if (quarter === 3) {
            return <ThreeQuarterStar key={i} />;
          }
        }
        return <Star key={i} />;
      })}
    </div>
  );
};

export default Rating;
