// components/GenreDropdown.js
import { useState } from 'react';
import Link from 'next/link';
// import styles from ''
import styles from '../styles/GenreList.module.css'; // Import CSS module

const genres = [
  { id: 1, name: 'Tiên Hiệp', slug: 'tien-hiep' },
  { id: 2, name: 'Kiếm Hiệp', slug: 'kiem-hiep' },
  { id: 3, name: 'Ngôn Tình', slug: 'ngon-tinh' },
  { id: 4, name: 'Quân Sự', slug: 'quan-su' },
  { id: 5, name: 'Lịch Sử', slug: 'lich-su' },
  { id: 6, name: 'Trinh Thám', slug: 'trinh-tham' },
  // Thêm các thể loại khác
];

const GenreDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div className={styles.dropdown} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.dropdownToggle}>
      <i className="fa-solid fa-list"></i>  Thể Loại
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {genres.map((genre) => (
            <li key={genre.id} className={styles.dropdownItem}>
              <Link href={`/the-loai/${genre.slug}`}>
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
   
    </div>
    
  );
};

export default GenreDropdown;
