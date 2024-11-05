"use client";

import Navbar from "../../../components/navbar-auth";
import React from "react";

const FavoriteStories = () => {
  const stories = [
    {
      title: "Wind Breaker",
      author: "Mô phỏng Trường hợp tên... trời",
      image: "/images/anhtruyen.jpg",
    },
    {
      title: "Yêu Em Nhiều Đến Thế",
      author: "Author Name",
      image: "/images/anhtruyen.jpg",
    },
    {
      title: "Fragrant Flower",
      author: "Author Name",
      image: "/images/anhtruyen.jpg",
    },
    {
      title: "Ánh Trăng Đầu Mùa Hạ",
      author: "Author Name",
      image: "/images/anhtruyen.jpg",
    },
    {
      title: "Quyền Sủng Ngộ Tác Y Fsadasdadasdasdasdasda",
      author: "Author Name",
      image: "/images/anhtruyen.jpg",
    },
    {
      title: "Quyền Sủng Ngộ Tác Y F",
      author: "Author Name",
      image: "/images/anhtruyen.jpg",
    },
    {
      title: "Quyền Sủng Ngộ Tác Y Fsdasdádadsdads",
      author: "Author Name",
      image: "/images/anhnen.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      
        {/* Main Content */}
        <main className="flex-1 p-14">
          <h1 className="text-2xl pl-6 border-l-4 border-l-red-600 font-semibold text-gray-500 mb-6">
            Truyện yêu thích
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {stories.map((story, index) => (
              <React.Fragment key={index}>
                <div className="bg-white shadow-md overflow-hidden hover:scale-105 transition-transform duration-200 flex flex-col relative w-[160px] h-[240px]"
                >
                  <img src={story.image}  className="w-full h-auto object-cover"/>
                  <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-80 w-full">
                    <p className="text-white font-bold text-sm">
                      {story.title}
                    </p>
                  </div>
                </div>
                {/* Dòng kẻ phân cách sau mỗi nhóm 5 ô */}
                {(index + 1) % 5 === 0 && index !== stories.length - 1 && (
                  <hr className="border-t border-gray-300 my-4 col-span-full" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Dòng kẻ phân cách ở cuối cùng nếu có ô không đầy đủ */}
          {stories.length > 0 && stories.length % 5 !== 0 && (
            <hr className="border-t border-gray-300 my-4 col-span-full" />
          )}
        </main>

    </>
  );
};

export default FavoriteStories;
