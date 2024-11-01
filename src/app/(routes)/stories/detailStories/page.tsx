"use client";

import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getStories } from "@/app/_api/story.api"; // Import API functions
import { getChapters } from "@/app/_api/chapter.api"; // Import API functions

interface Chapter {
  chapter_title: string;
  chapter_id: number;
}

interface Story {
  story_name: string;
  author_name: string;
  keywords: string;
  total_chapters: number;
  source?: string;
  cover: string;
}

const page = () => {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [chapters, setChapters] = useState<Chapter[]>([]); // State for chapters
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const [totalPages, setTotalPages] = useState<number>(1); // State for total pages

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await getStories(2);
        setStory(data);
      } catch (_error: unknown) {
        setError("Error fetching story");
      } finally {
        setLoading(false);
      }
    };

    const fetchChapters = async (page: number) => {
      try {
        const { chapters, totalPages } = await getChapters(page, 20, 2); // Fetch chapters based on page
        setChapters(chapters);
        setTotalPages(totalPages); // Set total pages
      } catch (_error: unknown) {
        setError("Error fetching chapters");
      }
      console.log("check chapter", chapters);
    };

    fetchStory();
    fetchChapters(currentPage); // Fetch chapters for the current page
  }, [currentPage]); // Re-fetch chapters when the page changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const readBook = (chapterId = 1) => {
    // Navigate to the desired URL with the chapterId
    window.location.href = `/stories/ChapterDetailPage?chapter_id=${chapterId}`;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Update the current page when pagination buttons are clicked
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            truyen <span className="text-red-500">chom</span>
          </div>
          {/* Other elements */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow max-w-7xl mx-auto py-8 px-4 space-x-6">
        {/* Left Column - Book Details and Chapter List */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow">
          {/* Book Details */}
          <div className="flex space-x-4">
            <div className="rounded w-48 h-64">
              <img
                src={story?.cover || "/default-cover.jpg"}
                alt="Book Cover"
                className="w-48 h-64 object-cover rounded"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{story?.story_name}</h1>
              <p className="text-gray-600">Tác giả: {story?.author_name}</p>
              <p className="text-gray-600">Thể loại: {story?.keywords}</p>
              <p className="text-gray-600">
                Số chương: {story?.total_chapters}
              </p>
              <p className="text-gray-600">
                Nguồn: {story?.source || "Sưu tầm"}
              </p>
              <button
                onClick={() => readBook()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Đọc truyện
              </button>
            </div>
          </div>

          {/* Chapter List */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Danh sách chương</h2>
            <ul className="grid grid-cols-2 gap-4 mt-4">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <a
                    href={`/stories/ChapterDetailPage?chapter_id=${chapter.id}`} // Truyền chapter_id qua query string
                    className="text-blue-500 hover:underline"
                  >
                    {chapter.chapter_name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div className="mt-4 flex justify-center space-x-2">
              <button
                className="px-3 py-1 border rounded"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border rounded ${
                    i + 1 === currentPage ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 border rounded"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          className="w-1/3 bg-white p-3 rounded-lg shadow"
          style={{ height: "380px" }}
        >
          <h2 className="text-2xl font-semibold text-orange-500 drop-shadow-md">
            Top Truyện Đề Cử
          </h2>
          {/* Other elements */}
        </div>
      </main>
    </div>
  );
};

export default page;
