import { useEffect, useState } from "react";
import axios from "axios";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadBookmarks = async () => {
      const res = await axios.get("http://localhost:5000/api/bookmarks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookmarks(res.data);
    };

    loadBookmarks();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Bookmarks</h1>

      {bookmarks.map((item) => (
        <div key={item._id} className="border p-4 rounded mb-4">
          <p className="text-sm text-gray-500">Tool: {item.tool}</p>

          <p className="font-semibold">Input:</p>

          <p>{item.inputText}</p>

          <p className="font-semibold mt-2">Result:</p>

          <pre>{item.result}</pre>
        </div>
      ))}
    </div>
  );
}
