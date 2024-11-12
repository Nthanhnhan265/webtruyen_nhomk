// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Pagination } from "flowbite-react";

// import {
//   getAllStories,
//   getAllStorieView,
//   getAllStorieNew,
// } from "../../_api/story.api";

// export default function HomePage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [hotStories, setHotStories] = useState([]);
//   const [newStories, setNewStories] = useState([]);

//   const fetchStories = async () => {
//     const params = {
//       author_storie: "",
//       description: "",
//       sort: "ASC",
//       page: currentPage,
//     };

//     try {
//       const response = await getAllStorieView(params);
//       const responseNew = await getAllStorieNew(params);
//       setNewStories(responseNew.stories || []);
//       setHotStories(response.stories || []);
//       setTotalPages(response.totalPages || 1);
//     } catch (error) {
//       console.error("Error fetching stories:", error);
//     }
//   };
//   const handleClick = (slug) => {
//     window.location.href = `/stories/${slug}`;
//   };
//   const onPageChange = (page) => {
//     setCurrentPage(page);
//   };

//   useEffect(() => {
//     fetchStories();
//   }, [currentPage]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Header */}
//       <header className="bg-white shadow py-4">
//         <div className="container mx-auto px-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold">Truyen Chom</h1>
//           <div className="space-x-4">
//             <button className="text-gray-700">Tác Giả</button>
//             <button className="text-gray-700">Thể Loại</button>
//           </div>
//           <div>
//             <button className="text-blue-500">Đăng nhập</button>
//           </div>
//         </div>
//       </header>

//       {/* Featured Image Section */}
//       <section className="py-8 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-xl font-semibold mb-4 ms-28">TRUYỆN HOT 🔥</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 px-28 lg:grid-cols-5 gap-4 justify-center">
//             {hotStories.map((story, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleClick(story.slug)}
//                 className="flex flex-col items-center"
//               >
//                 <Image
//                   src={
//                     story?.cover
//                       ? `http://localhost:3000/${story.cover}`
//                       : "/default-cover.jpg"
//                   }
//                   alt={story.story_name || "Story Image"}
//                   width={140}
//                   height={200}
//                   className="rounded-lg shadow-md"
//                 />
//                 <p className="text-center mt-2 text-sm font-medium text-gray-800 w-24 truncate">
//                   {story.story_name || "No Title"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Latest Updates Section */}
//       <section className="py-8">
//         <div className="container mx-auto px-4">
//           <h2 className="text-xl font-semibold mb-4">Truyện Mới Cập Nhật</h2>
//           <div className="bg-white rounded shadow-lg">
//             <div className="divide-y divide-gray-200">
//               {newStories.map((story, i) => (
//                 <div key={i} className="flex items-center justify-between p-4">
//                   <span className="text-gray-700 font-semibold">
//                     {story.story_name || "No Title"}
//                   </span>
//                   <span className="text-gray-500">
//                     {story.keywords || "No Keywords"}
//                   </span>
//                   <span className="text-red-500">
//                     {story.total_chapters
//                       ? `${story.total_chapters} Chương`
//                       : "0"}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Pagination */}
//       <div className="flex overflow-x-auto sm:justify-center mt-4">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={onPageChange}
//         />
//       </div>

//       {/* Footer */}
//       <footer className="mt-8 py-4 bg-gray-100 text-center text-gray-500 text-sm">
//         <p>© 2023 Truyen Chom. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }
