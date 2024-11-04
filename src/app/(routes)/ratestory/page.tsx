"use client";

import Link from "next/link";
import Navbar from "../../../components/navbar-auth";
import { useState } from "react";

export default function StoryDetail() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0); // Rating state
  const [hover, setHover] = useState(0);   // Hover state for star rating
  const [comment, setComment] = useState(""); // State for comment input
  const [comments, setComments] = useState([]); // State for list of comments

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 flex space-x-4">
        {/* Left Column: Story Detail */}
        <div className="w-2/3">
          <div className="flex items-start space-x-4">
            {/* Image */}
            <img src="/path-to-image.jpg" alt="Story Cover" className="w-32 h-48 object-cover rounded" />

            {/* Story Info */}
            <div>
              <h1 className="text-2xl font-bold">Rẽ Nghèo Thành Tỷ Phú</h1>
              {/* Star Rating */}
              <div className="text-center mt-2">
                <div className="flex justify-center space-x-1 mb-2">
                  {[...Array(10)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={starValue <= (hover || rating) ? '#f39c12' : '#e0e0e0'}
                        width="24"
                        height="24"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        className="cursor-pointer"
                      >
                        <path d="M12 .587l3.668 7.431L24 9.588l-6 5.847 1.415 8.251L12 18.896 4.585 23.686 6 15.435l-6-5.847 8.332-1.57z" />
                      </svg>
                    );
                  })}
                </div>
                <p>Đánh giá cho truyện này</p>
              </div>
              <p className="text-gray-600">Tác giả: Đang cập nhật</p>
              <p>Thể loại: Ngôn Tình, Sắc, Đô Thị, ...</p>
              <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 bg-red-500 text-white rounded">Đọc từ đầu</button>
                <button className="px-4 py-2 bg-gray-200 rounded">Đọc mới nhất</button>
              </div>
            </div>
          </div>

          {/* Story Description */}
          <div className="mt-6 text-gray-700">
            <h2 className="font-bold">Giới thiệu nội dung:</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec risus id mi ultricies blandit.
            </p>
          </div>

          {/* Chapter List */}
          <div className="mt-6">
            <h2 className="font-bold text-lg">Danh sách chương</h2>
            <ul className="grid grid-cols-2 gap-2 text-gray-600">
              {Array.from({ length: 100 }, (_, i) => (
                <li key={i}>
                  <Link legacyBehavior href={`/story/chapter/${i + 1}`}>
                    <a>Chương {i + 1}: Tên chương {i + 1}</a>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 bg-gray-200 rounded">Previous</button>
              <button onClick={() => handlePageChange(currentPage + 1)} className="px-2 py-1 bg-gray-200 rounded">Next</button>
            </div>
          </div>

          {/* Comment Section */}
          <div className="mt-6">
            <h2 className="font-bold text-lg">Bình luận</h2>
            <div className="mt-4">
              {/* Comment Input */}
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Bình luận..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={handleCommentSubmit}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Đăng
              </button>
            </div>

            {/* Comment List */}
            <div className="mt-4">
              {comments.length === 0 ? (
                <p className="text-gray-500">Chưa có bình luận nào.</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="mt-2 p-2 border-b border-gray-200">
                    <p>{comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="w-1/3">
          {/* Top Stories */}
          <div className="bg-white p-4 shadow-md rounded mb-4">
            <h2 className="font-bold text-lg">TOP Truyện Đề Cử</h2>
            <ul className="mt-2 text-gray-600">
              <li><Link legacyBehavior href="/story/1"><a>Tiểu Tục Bảo Đăng (Full)</a></Link></li>
              <li><Link legacyBehavior href="/story/2"><a>Thần Y Trở Lại</a></Link></li>
            </ul>
          </div>

          {/* Reading History */}
          <div className="bg-white p-4 shadow-md rounded">
            <h2 className="font-bold text-lg">Truyện đang đọc</h2>
            <p className="mt-2 text-gray-600">Danh sách các truyện mà bạn đang theo dõi.</p>
          </div>
        </div>
      </div>
    </>
  );
}
