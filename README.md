Nextjs v14.2.15
Cấu trúc thư mục nextjs ()

- src
  app/
  (routes)/
  tên_thư_mục/page.tsx (bắt buộc)
  - (routes): nhóm các thư mục route lại
  - tên thư mục: ứng với tên route, ví dụ đặt tên là about thì sẽ truy cập vào localhost/about để render ra trang page.tsx
- src/api: nơi gọi api
- src/auth: nơi xác thực liên quan đến authentication-'Thư mục src/auth trong dự án của bạn sẽ được dùng để chứa các logic và xử lý liên quan đến xác thực người dùng (authentication), không phải để quản lý các route. Thư mục này sẽ lưu giữ các file liên quan đến việc xử lý đăng nhập, đăng ký, xác thực token, phân quyền, và các tiện ích khác phục vụ cho quá trình xác thực người dùng.'
- src/fonts: chứa fonts của web

- components: nơi chứa client component( phân biệt client component vs server component để đặt cho đúng nơi)
  - client component là components được renders ở phía client ví dụ như component gọi api - tóm lại là dữ liệu sẽ thay đổi liên tục cần render lại giao diện
  - server component là component ít thay đổi, được render phía server, cho server render để xử lý nhanh hơn, ví dụ như thanh footer ...
- context + hooks: quản lý trạng thái và tái sử dụng

## Cách chạy ứng dụng

## Tham khảo:

- Flowbite React thư viện có sẵn components: (https://flowbite-react.com/docs/)
- React hook form thư viện xác thực dữ liệu đầu vào cho form: (https://react-hook-form.com/docs)
- TailwindCss cung cấp class css có sẵn: (https://tailwindcss.com/docs/grid-column)
- Toastify react thư viện thông báo lỗi: (https://github.com/fkhadra/react-toastify)
- React icon: (https://react-icons.github.io/react-icons/icons/sl/)
- Tip Tap: thư viện text editor siêu xịn: (https://tiptap.dev/docs)
- Tailwind Typhography: Plugin này đặc biệt hữu ích khi bạn cần định dạng một khối văn bản lớn một cách nhất quán mà không cần phải gán lớp CSS cho từng phần tử: (https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file)
