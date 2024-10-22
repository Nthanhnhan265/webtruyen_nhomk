Cấu trúc thư mục nextjs

- src
  app/
  (routes)/
  tên_thư_mục/page.tsx (bắt buộc)
  - (routes): nhóm các thư mục route lại
  - tên thư mục: ứng với tên route, ví dụ đặt tên là about thì sẽ truy cập vào localhost/about để render ra trang page.tsx
- src/api: nơi gọi api
- src/auth: nơi xác thực liên quan đến authentication
- src/fonts: chứa fonts của web

- components: nơi chứa client component( phân biệt client component vs server component để đặt cho đúng nơi)
  - client component là components được renders ở phía client ví dụ như component gọi api - tóm lại là dữ liệu sẽ thay đổi liên tục cần render lại giao diện
  - server component là component ít thay đổi, được render phía server, cho server render để xử lý nhanh hơn, ví dụ như thanh footer ...
- context + hooks: quản lý trạng thái và tái sử dụng

## Tham khảo:

- Flowbite React thư viện có sẵn components: (https://flowbite-react.com/docs/)
- TailwindCss cung cấp class css có sẵn: (https://tailwindcss.com/docs/grid-column)
- Toastify react thư viện thông báo lỗi: (https://github.com/fkhadra/react-toastify)
- React icon: (https://react-icons.github.io/react-icons/icons/sl/)
