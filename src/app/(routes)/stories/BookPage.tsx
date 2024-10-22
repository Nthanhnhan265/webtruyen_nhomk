"use client";

import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Import icon từ Heroicons
import { getStories } from "@/app/_api/story.api"; // Import StoryService
// import Image from "next/image";

interface Story {
  story_name: string;
  author_name: string;
  keywords: string;
  total_chapters: number;
  source?: string;
  cover: string;
}

const BookPage = () => {
  // Removed storyId prop and used a hardcoded value (2) directly in fetch function
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDanhSachOpen, setDanhSachOpen] = useState(false);
  const [isTheLoaiOpen, setTheLoaiOpen] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await getStories(2); // Call the function to fetch the story by ID (hardcoded as 2)
        setStory(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error: unknown) {
        setError("Error fetching story");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, []); // Removed storyId from dependencies since it's hardcoded

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error if occurred
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            truyen <span className="text-red-500">chom</span>
          </div>
          <nav className="flex-grow flex justify-center space-x-6">
            <div
              className="relative"
              onMouseEnter={() => setDanhSachOpen(true)}
              onMouseLeave={() => setDanhSachOpen(false)}
            >
              <a href="#" className="hover:text-gray-700">
                Danh Sách
              </a>
              {isDanhSachOpen && (
                <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg rounded w-48">
                  <ul className="p-2">
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                        Mục 1
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                        Mục 2
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                        Mục 3
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setTheLoaiOpen(true)}
              onMouseLeave={() => setTheLoaiOpen(false)}
            >
              <a href="#" className="hover:text-gray-700">
                Thể Loại
              </a>
              {isTheLoaiOpen && (
                <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg rounded w-48">
                  <ul className="p-2">
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                        Thể loại 1
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                        Thể loại 2
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                        Thể loại 3
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Thanh Tìm Kiếm */}
          <div className="flex items-center mx-4">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-red-500 text-white rounded-r px-4 py-2 hover:bg-red-600 flex items-center">
              <MagnifyingGlassIcon className="w-5 h-5 mr-1" /> Tìm
            </button>
          </div>

          {/* Nút Đăng Nhập và Đăng Ký */}
          <div className="flex space-x-6">
            <a href="#" className="text-blue-500 hover:underline">
              Đăng Nhập
            </a>
            <a href="#" className="text-blue-500 hover:underline">
              Đăng Ký
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow max-w-7xl mx-auto py-8 px-4 space-x-6">
        {/* Left Column - Book Details and Chapter List */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow">
          {/* Book Details */}
          <div className="flex space-x-4">
            <div className="rounded w-48 h-64">
              {/* <Image
                className="absolute"
                src={story?.cover || "/default-cover.jpg"}
                alt="cover"
                fill
                style={{
                  objectFit: "cover",
                }}
              /> */}
              <img
                src={story?.cover || "/default-cover.jpg"} // Use the story cover or a default image
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
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Đọc truyện
              </button>
            </div>
          </div>

          {/* Chapter List */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Danh sách chương</h2>
            <ul className="grid grid-cols-2 gap-4 mt-4">
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 1: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 2: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 3: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 4: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 5: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 6: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 7: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 8: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 9: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 10: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 11: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 12: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 13: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 14: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 15: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 16: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 17: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 18: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 19: Title
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Chương 20: Title
                </a>
              </li>
            </ul>

            {/* Pagination */}
            <div className="mt-4 flex justify-center space-x-2">
              {/* Pagination logic can be added here */}
              <button className="px-3 py-1 border rounded">1</button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
            </div>
          </div>
        </div>

        {/* Right Column - Related Books */}
        <div
          className="w-1/3 bg-white p-3 rounded-lg shadow"
          style={{ height: "380px" }}
        >
          <h2 className="text-2xl font-semibold text-orange-500 drop-shadow-md">
            Top Truyện Đề Cử
          </h2>
          {/* Related books with scrollbar after 9 books */}
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Sách 1
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Sách 2
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Sách 3
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Sách 4
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Sách 5
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Sách 6
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Sách 7
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Sách 8
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Sách 9
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default BookPage;
