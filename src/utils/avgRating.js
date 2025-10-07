// export default function GetAvgRating(ratingArr) {
//   if (ratingArr.length === 0) {
//     return 0;
//   }

//   const totalReviewCount = ratingArr.reduce((acc, curr) => {
//     acc += curr.rating;
//     return acc;
//   }, 0);

//   const multiplier = Math.pow(10, 1); // This is equivalent to 10
//   const avgReviewCount = Math.round((totalReviewCount / ratingArr.length) * multiplier) / multiplier;

//   return avgReviewCount;
// }

export default function GetAvgRating(ratingArr = []) {
  if (!Array.isArray(ratingArr) || ratingArr.length === 0) {
    return 0;
  }

  const validRatings = ratingArr
    .map((r) => r?.rating)
    .filter((r) => typeof r === "number" && !isNaN(r));

  if (validRatings.length === 0) return 0;

  const total = validRatings.reduce((acc, curr) => acc + curr, 0);
  const avg = total / validRatings.length;

  // Round to 1 decimal place
  return Math.round(avg * 10) / 10;
}
