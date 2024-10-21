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

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
