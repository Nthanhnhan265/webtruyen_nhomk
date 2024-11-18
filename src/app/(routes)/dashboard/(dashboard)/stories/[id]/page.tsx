/**
 * SỬ DỤNG ROUTE TẠM THỜI NÀY ĐỂ LÀM GIAO DIỆN: "XEM THÔNG TIN TRUYỆN VÀ QUẢN LÝ CHƯƠNG"
 */
'use client'
import { DeleteModal } from '@/app/(routes)/dashboard/_components/delete.modal'
import Header from '@/app/(routes)/dashboard/_components/header'
import LABEL from '@/app/(routes)/dashboard/label'
import MESSAGE from '@/app/(routes)/dashboard/message'
import { Button, Pagination, Select } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiBarChartAlt } from 'react-icons/bi'
import { BsTags } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa'
import { GoCommentDiscussion } from 'react-icons/go'
import { LuBadgeInfo } from 'react-icons/lu'
import { MdOutlineStarBorder } from 'react-icons/md'
import { TbUserPentagon } from 'react-icons/tb'
export default function DetailStory({ params }: { params: { id: number } }) {
  //====================== DECLARE VARIABLES, HOOKS ==========================//
  const [isExpand, setIsExpand] = useState<Boolean>(false)
  const [isOpenDModal, setOpenDModal] = useState<number>(-1)
  console.log(params.id)
  const router = useRouter()
  //**FAKE DATA */
  const COVER = '/images/default-cover-story.webp'
  const STORY_NAME =
    'Xuyên Không, Tôi Trở Thành Quản Lí Vàng Trong Làng Showbiz'
  const AUTHOR = 'Thiên Thiên Đế'
  const GENRES =
    'Ngôn Tình, Đô Thị, Huyền Huyễn, Dị Năng, Dã Sử, Xuyên Không, Nữ Cường, Hài Hước, Mạt Thế'
  const STATUS = 'Hoàn thành'
  const TOTAL_CHAPTERS = '555'
  const NUM_OF_VIEWS = 3400
  const NUM_OF_REVIEWS = 7
  const NUM_OF_COMMENTS = 100
  const DESCRIPTION = `<div class="desc-text">
                                        Đang tận lực đánh zombie ở thời mạt thế, zombie cấp 4 thật sự rất mạnh, Tiêu Hoà cùng tiểu đội chật vật mãi mới hạ gục được nó.<br>
<br>
Trong lần đánh zombie tiếp theo, cô và đồng đội bị thất lạc nhau, trong lúc chạy trốn sự truy đuổi của zombie, Tiêu Hoà xuyên không rồi!<br>
<br>
Cô xuyên về thế giới hoà bình, với thân phận là quản lí của các ngôi sao showbiz, nhưng những ngôi sao này lười nhác, không có chút giải thưởng gì!<br>
<br>
Tiêu Hoà ngán ngẩm, cô thầm quyết tâm sẽ đưa bọn họ từ flop đến toả sáng, còn bản thân trở thành quản lí vàng số 1 trong làng showbiz...                    <br>
                    <br>
                    <p>Hãy khám phá thế giới kỳ diệu và độc đáo của <a href="/">truyện</a> <a href="/xuyen-khong-toi-tro-thanh-quan-li-vang-trong-lang-showbiz">Xuyên Không, Tôi Trở Thành Quản Lí Vàng Trong Làng Showbiz</a> cùng với cốt truyện đầy cảm xúc và hy vọng được <a href="/tac-gia/thien-thien-de-51149">tác giả Thiên Thiên Đế</a> dành rất nhiều tâm huyết và cảm xúc vào từng chương truyện. TruyenChu.vn chúng mình gửi đến các bạn độc giả 555 chương của tác phẩm này, mời bạn đón đọc và chia sẻ cảm xúc ở phần bình luận bạn nhé.</p>
                </div>`
  const KEYWORDS =
    'Đọc truyện Xuyên Không, Tôi Trở Thành Quản Lí Vàng Trong Làng Showbiz full, chương 1, chương cuối. Xuyên Không, Tôi Trở Thành Quản Lí Vàng Trong Làng Showbiz wattpad truyện full sstruyen truyencv medoctruyen, metruyenchu nội dung truyện Xuyên Không, Tôi Trở Thành Quản Lí Vàng Trong Làng Showbiz review, Xuyên Không, Tôi Trở Thành Quản Lí Vàng Trong Làng Showbiz Mangatool Wikidich Truyencuatui truyenfull webtruyen truyenyy , nghe audio Xuyên Không, Tôi Trở Thành Quản Lí Vàng Trong Làng Showbiz'
  //====================== HANDLE FUNCTIONS ==================================//
  function onSearch(keyword: string) {
    console.log(keyword)
  }

  function handleClickExpand() {
    setIsExpand(!isExpand)
  }

  function handleOpenDModal(id: number) {
    setOpenDModal(id)
  }
  function handleCloseDModal() {
    setOpenDModal(-1)
  }

  function handleDelete(id: number) {
    console.log('xoa chuong: ', id)
  }
  return (
    <>
      <Header handleSearch={onSearch}></Header>
      <DeleteModal
        isOpenDModal={{}}
        closeDModal={handleCloseDModal}
        message={MESSAGE.chapter.confirmDelete}
        onDelete={() => {}}
      ></DeleteModal>
      <div className="mt-10">
        {/* STORY'S DETAIL INFORMATION 
        (name, author, genres, status, number of views, number of reviews, number of comments) */}
        <div className="w-full flex flex-col sm:flex-row">
          <Image
            src={COVER}
            alt="story-cover"
            width={143}
            height={186}
            className="shadow-lg mb-2 sm:mb-0 md:w-1/4 me-6"
          ></Image>
          <ul className="flex flex-col gap-2 text-black/70">
            <li className="me-5">
              <h1 className="text-black uppercase font-semibold tracking-tight text-xl">
                {STORY_NAME}: {STORY_NAME}
              </h1>
            </li>
            <li className="flex items-center gap-3">
              <TbUserPentagon /> {LABEL.story.author}: {AUTHOR}
            </li>
            <li className="flex items-center gap-3">
              <BsTags /> {LABEL.story.genres}: {GENRES}
            </li>
            <li className="flex items-center gap-3">
              <LuBadgeInfo /> {LABEL.story.status}: {STATUS}
            </li>
            <li className="flex items-center gap-3">
              <BiBarChartAlt /> {LABEL.story.total_chapters}: {TOTAL_CHAPTERS}
            </li>
            <li className="flex items-center gap-3">
              <div className="flex gap-2 items-center">
                <FaRegEye className="opacity-80" /> {NUM_OF_VIEWS / 1000 + 'k'}
              </div>
              <div className="flex gap-2 items-center">
                <MdOutlineStarBorder
                  color="#F4FA50"
                  className="font-bold"
                />
                {NUM_OF_VIEWS / 1000 + 'k'}
              </div>
              <div className="flex gap-2 items-center">
                <GoCommentDiscussion /> {NUM_OF_VIEWS / 1000 + 'k'}
              </div>
            </li>
          </ul>
        </div>
        {/* STORY'S DESCRITION
        (description, keywords)
         */}
        <h2 className="font-medium text-lg uppercase mt-10">
          {LABEL.story.description}
          <hr className="w-1/2 my-2" />
        </h2>
        <div className="w-full lg:grid grid-cols-2">
          <div>
            <div
              className={`text-md ${isExpand ? '' : 'line-clamp-10'}`}
              dangerouslySetInnerHTML={{ __html: DESCRIPTION }}
            ></div>
            <button
              onClick={handleClickExpand}
              className="text-[#013CC6]/50 font-bold"
            >
              {isExpand ? LABEL.sys.showless : LABEL.sys.showmore}
            </button>
          </div>
          <div className="text-md lg:mx-6 text-black/70">
            {LABEL.story.keywords}: {KEYWORDS}
          </div>
        </div>
        {/* TITLE AND ADD NEW CHAPTERS */}
        <div className="flex justify-between mt-6">
          {/* title */}
          <div>
            <h2 className="font-medium text-xl mb-2">{LABEL.chapter.label}</h2>
            {/* sort */}
            <div className="mb-2 ">
              <div className="flex gap-2">
                <Select
                  id="sortBy"
                  name="sortBy"
                  required
                  className=""
                  onChange={(e) => e}
                >
                  <option>id</option>
                  {/* {sortableProps.map((property) => (
                    <option
                      key={property.value}
                      value={property.value}
                      selected={property.value === 'id'}
                    >
                      {property.label}
                    </option>
                  ))} */}
                </Select>

                <Select
                  id="order"
                  name="order"
                  required
                  className=""
                  // onChange={(e) => handleChangeOrderBy(e)}
                >
                  <option value="DESC">{LABEL.sys.DESC}</option>
                  <option value="ASC">{LABEL.sys.ASC}</option>
                </Select>
              </div>
            </div>
          </div>
          {/* button to add a new chapter */}
          <div>
            <Button
              className="bg-[#33C2E9]"
              onClick={() =>
                router.push(`/dashboard/stories/${params.id}/chapters/create`)
              }
            >
              {LABEL.chapter.new}
            </Button>
          </div>
        </div>

        {/* TABLE OF CHAPTERS */}
        <div className="my-2">
          {/* <ChapterTable openDModal={handleOpenDModal} /> */}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center">
          <Pagination
            currentPage={1}
            onPageChange={() => {}}
            totalPages={10}
          ></Pagination>
        </div>
      </div>
    </>
  )
}
