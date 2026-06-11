export default function calculateScore(answers: Record<number, number | null>) {
  let score = 0;
  for (const key in answers) {
    const value = answers[key];
    if (value !== null) {
      score += value;
    }
  }
  return score;
}