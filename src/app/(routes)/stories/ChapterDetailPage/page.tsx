"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getChapterById } from "@/app/_api/chapter.api";

const Page = () => {
  const searchParams = useSearchParams();
  const chapter_id = searchParams.get("chapter_id");

  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (chapter_id) {
      const fetchChapter = async () => {
        try {
          const data = await getChapterById(chapter_id);
          setChapter(data);
        } catch (err) {
          setError("Error fetching chapter");
        } finally {
          setLoading(false);
        }
      };
      fetchChapter();
    }
  }, [chapter_id]);

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 py-10 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
        {/* Chapter Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {chapter?.chapter_name}
          </h1>
          <p className="text-sm text-gray-500">{chapter?.book_title}</p>
        </div>

        {/* Navigation Buttons */}

        {/* Chapter Content */}
        <div className="text-gray-700 text-lg leading-relaxed space-y-4">
          {chapter?.content?.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-center gap-4 mt-8 border-t pt-4">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm">
            Previous Chapter
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
            Next Chapter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
