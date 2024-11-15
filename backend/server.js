const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Cấu hình CORS để frontend có thể truy cập API
app.use(cors());

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Tài khoản mặc định của XAMPP
    password: '',  // Mật khẩu (nếu có)
    database: 'webtruyen'  // Tên cơ sở dữ liệu của bạn
});

// Kiểm tra kết nối
db.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err);
        return;
    }
    console.log('Kết nối thành công đến MySQL');
});

// API để lấy danh sách truyện theo thể loại (slug)
app.get('/api/genre/:slug', (req, res) => {
    const slug = req.params.slug; // Lấy slug thể loại từ URL

    // Truy vấn để lấy danh sách truyện thuộc thể loại
    const query = `
    SELECT stories.id AS story_id, 
       stories.story_name, 
       stories.slug AS story_slug, 
       authors.author_name, 
       genres.genre_name, 
       stories.cover, 
       genre_story.genre_id,
       genre_story.story_id,
        stories.description,
        authors.slug AS author_slug,
         stories.total_chapters
FROM stories
JOIN genre_story ON stories.id = genre_story.story_id
JOIN genres ON genre_story.genre_id = genres.id
JOIN authors ON stories.author_id = authors.id
WHERE genres.slug = ?;

    `;

    // Sử dụng db.execute thay vì connection.execute
    db.execute(query, [slug], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            return res.status(500).json({ message: 'Lỗi khi truy vấn cơ sở dữ liệu.' });
        }

        // Kiểm tra nếu không có dữ liệu
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không có truyện nào trong thể loại này.' });
        }

        // Trả về danh sách truyện
        res.json(results);
    });
});

// Backend (Express) - API để lấy danh sách thể loại 
app.get('/api/genres', (req, res) => {
    const query = 'SELECT id, genre_name, slug FROM genres';

    // Thực hiện truy vấn lấy danh sách thể loại từ cơ sở dữ liệu
    db.execute(query, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            return res.status(500).json({ message: 'Lỗi khi truy vấn cơ sở dữ liệu.' });
        }

        // Trả về danh sách thể loại
        res.json(results);
    });
});

// API để lấy thông tin tác giả và các sách của tác giả
app.get('/api/author/:slug', (req, res) => {
    const { slug } = req.params;

    // Truy vấn lấy thông tin tác giả và các sách của tác giả
    const query = `
      SELECT           
        authors.id AS author_id,
        authors.author_name,
        authors.slug AS author_slug,
        authors.description AS author_description,
        stories.id AS story_id,
        stories.story_name,
        stories.slug AS story_slug,
        genres.genre_name,
        genres.slug AS genre_slug,
        stories.cover,
        stories.total_chapters
      FROM authors
      JOIN stories ON authors.id = stories.author_id
      JOIN genre_story ON stories.id = genre_story.story_id
      JOIN genres ON genre_story.genre_id = genres.id
      WHERE authors.slug = ?
    `;

    db.execute(query, [slug], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            return res.status(500).json({ message: 'Lỗi khi truy vấn cơ sở dữ liệu.' });
        }

        // Kiểm tra nếu không có dữ liệu
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy tác giả này hoặc truyện của tác giả.' });
        }

        // Trả về thông tin tác giả và danh sách truyện
        const author = {
            author_id: results[0].author_id,
            author_name: results[0].author_name,
            author_slug: results[0].author_slug,
            author_description: results[0].author_description,
        };

        const books = results.map((row) => ({
            story_id: row.story_id,
            story_name: row.story_name,
            story_slug: row.story_slug,
            genre_name: row.genre_name,
            genre_slug: row.genre_slug,
            cover: row.cover,
            total_chapters: row.total_chapters,
        }));

        res.json({ author, books });
    });
});


// Chạy server Express
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
