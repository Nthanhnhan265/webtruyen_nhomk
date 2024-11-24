// components/Pagination.js
{/* <i class="fa-solid fa-angle-left"></i> */}
{/* <i class="fa-solid fa-angle-right"></i> */}
import Link from 'next/link';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Pagination = ({ currentPage, totalPages }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        {/* Previous Button */}
        <li>
          <Link
            href={`?page=${currentPage - 1}`}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 && 'pointer-events-none opacity-50'}`}
          >
            <GrFormPrevious />
          </Link>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <li key={page}>
            <Link
              href={`?page=${page}`}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                page === currentPage
                  ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              {page}
            </Link>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <Link
            href={`?page=${currentPage + 1}`}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages && 'pointer-events-none opacity-50'}`}
          >
            <GrFormNext />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;


// import Link from 'next/link';
// import { GrFormPrevious } from "react-icons/gr";
// import { GrFormNext } from "react-icons/gr";

// const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
//   const handlePageClick = (page: number) => {
//     onPageChange(page); // Gọi callback từ parent khi thay đổi trang
//   };

//   return (
//     <div className="pagination flex justify-center">
//       <button
//         className="prev-button flex items-center px-4 py-2 bg-gray-200 rounded"
//         disabled={currentPage === 1}
//         onClick={() => handlePageClick(currentPage - 1)}
//       >
//         <GrFormPrevious />
//         <span className="ml-1">Trang trước</span>
//       </button>

//       <div className="page-info mx-2 my-3">
//         <span className="text-sm text-gray-600">Trang {currentPage} / {totalPages}</span>
//       </div>

//       <button
//         className="next-button flex items-center px-4 py-2 bg-gray-200 rounded"
//         disabled={currentPage === totalPages}
//         onClick={() => handlePageClick(currentPage + 1)}
//       >
//         <span className="mr-1">Trang tiếp</span>
//         <GrFormNext />
//       </button>
//     </div>
//   );
// };

// export default Pagination;
