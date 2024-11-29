// components/Pagination.js
{
  /* <i class="fa-solid fa-angle-left"></i> */
}
{
  /* <i class="fa-solid fa-angle-right"></i> */
}
import Link from 'next/link'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        {/* Previous Button */}
        <li>
          <Link
            href={`?page=${currentPage - 1}`}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === 1 && 'pointer-events-none opacity-50'
            }`}
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
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === totalPages && 'pointer-events-none opacity-50'
            }`}
          >
            <GrFormNext />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
