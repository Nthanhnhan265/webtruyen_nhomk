
"use client";
import React, { useState } from 'react';
import styles from './GenreDropdown.module.css';
import Link from 'next/link';

// Hàm xóa dấu tiếng Việt
const removeVietnameseTones = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

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

  return (
    <div
      className={styles.dropdownContainer}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={styles.dropdownButton}>Thể Loại</div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {genres.map((genre, index) => (
            <Link className={styles.genreItem} key={index} href={`/the-loai/${genre.slug}`}>
              {genre.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;

