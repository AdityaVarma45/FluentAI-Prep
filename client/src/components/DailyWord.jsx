import { useEffect, useState } from "react";

export default function DailyWord() {
  const words = [
    {
      word: "Meticulous",
      meaning: "Showing great attention to detail",
      example: "She was meticulous while preparing the report.",
    },
    {
      word: "Abundant",
      meaning: "Existing in large quantities",
      example: "The region has abundant natural resources.",
    },
    {
      word: "Innovative",
      meaning: "Introducing new ideas",
      example: "The company is known for innovative products.",
    },
  ];

  const [todayWord, setTodayWord] = useState(null);

  useEffect(() => {
    const index = new Date().getDate() % words.length;
    setTodayWord(words[index]);
  }, []);

  if (!todayWord) return null;

  return (
    <div className="bg-white p-4 border rounded mb-6">
      <h3 className="font-semibold mb-2">Word of the Day</h3>

      <p className="text-lg font-bold">{todayWord.word}</p>

      <p className="text-sm text-gray-600">{todayWord.meaning}</p>

      <p className="text-sm mt-2 italic">{todayWord.example}</p>
    </div>
  );
}
