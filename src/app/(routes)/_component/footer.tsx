import { HR } from 'flowbite-react'
import CustomButton from './CustomButton'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t pt-16 pb-10 flex flex-col gap-4 lg:grid grid-cols-2 mt-5 px-5 md:px-10 lg:px-20">
      <div>
        Truyện Plus – Trang đọc truyện online, thường xuyên cập nhật những bộ
        truyện hay nhất thuộc các thể loại đặc sắc như: truyện ngôn tình, truyện
        tiên hiệp, truyện kiếm hiệp, truyện đam mỹ, light novel…
        <br />
        {/* <span className={styles.textFoot}>truyenchomonline@gmail.com</span> */}
      </div>
      <div>
        <div className="flex flex-wrap lg:grid grid-cols-4 gap-1">
          <CustomButton
            href="/some-page"
            title="Go to some page"
            text="Truyện Full"
          />
          <CustomButton
            href="/some-page"
            title="Go to some page"
            text="Truyện Hot"
          />
          <CustomButton
            href="/some-page"
            title="Go to some page"
            text="Ngôn Tình Hay"
          />
          <CustomButton
            href="/some-page"
            title="Go to some page"
            text="Ngôn Tình Hài"
          />
          {/* Hàng 2 */}
          <CustomButton
            href="/some-page"
            title="Go to some page"
            text="Ngôn Tình Hài"
          />
          <CustomButton
            href="/some-page"
            title="Go to some page"
            text="Ngôn Tình Hài"
          />
          <CustomButton
            href="/some-page"
            title="Go to some page"
            text="Ngôn Tình Hài"
          />
          <CustomButton
            href="/some-page"
            title="Go to some page"
            text="Ngôn Tình Hài"
          />
        </div>
      </div>
      <div>
        <HR></HR>
        &copy; truyenchom
      </div>
    </footer>
  )
}
