'use client'
// import { DeleteModal } from '@/app/(routes)/dashboard/_components/delete.modal'
import ChapterTable from '@/app/(routes)/dashboard/_components/chapters/table.chapter'
import Header from '@/app/(routes)/dashboard/_components/header'
import LABEL from '@/app/(routes)/dashboard/label'
import { deleteChapter, getStoryAndChapters } from '@/app/api/chapter.api'
import { useDeleteModal } from '@/hooks/modals/useDeleteModal'
import { Button, Pagination, Select } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BiBarChartAlt } from 'react-icons/bi'
import { BsTags } from 'react-icons/bs'
import { CiImageOff } from 'react-icons/ci'
import { FaRegEye } from 'react-icons/fa'
import { GoCommentDiscussion } from 'react-icons/go'
import { LuBadgeInfo } from 'react-icons/lu'
import { MdOutlineStarBorder } from 'react-icons/md'
import { TbUserPentagon } from 'react-icons/tb'
import { toast } from 'react-toastify'
import MESSAGE from '../../../message'
export default function DetailStory({ params }: { params: { id: number } }) {
  //====================== DECLARE VARIABLES, HOOKS ==========================//
  const [isExpand, setIsExpand] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<string>('chapter_order')
  const [orderBy, setOrderBy] = useState<string>('DESC')
  const [keyword, setKeyWord] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [story, setStory] = useState<{
    cover: string
    story_name: string
    author_id: number
    author: { author_name: string }
    genres: Array<{ id: number; genre_name: string }>
    status: string
    totalChapters: number
    views: number
    reviews: number
    comments: number
    description: string
    keywords: string
  }>()
  const [pagination, setPagination] = useState<{
    limit: number
    page: number
    total: number
    totalPages: number
  }>()
  const [chapters, setChapters] = useState<Array<IChapter>>()
  const [imageErrors, setImageErrors] = useState<boolean>(false)
  const router = useRouter()
  const { setMessage, setHandleDelete, closeDeleteModal } = useDeleteModal()
  useEffect(() => {
    setMessage(MESSAGE.chapter.confirmDelete)
  }, [])

  const sortableProps = [
    { label: LABEL.chapter.chapterOrderLabel, value: 'chapter_order' },
    { label: LABEL.chapter.chapterNameLabel, value: 'chapter_name' },
    { label: LABEL.chapter.viewsLabel, value: 'views' },
    { label: LABEL.sys.createdAtLabel, value: 'created_at' },
    { label: LABEL.sys.publishedAtLabel, value: 'published_at' },
    { label: LABEL.chapter.status, value: 'status' },
  ]

  //====================== HANDLE FUNCTIONS ==================================//
  const fetchChapters = async (includeStory = false) => {
    try {
      const result = await getStoryAndChapters(params.id, '', {
        orderBy,
        sortBy,
        keywords: keyword,
        page: currentPage,
        limit: 10,
        includeStory,
      })

      if (includeStory && result.story) {
        setStory(result.story)
      }
      setPagination(result.pagination)
      setChapters(result.chapters)
    } catch (error) {
      toast.error(MESSAGE.sys.fetchError)

      console.error(error)
      router.push('/dashboard/stories')
    }
  }

  useEffect(() => {
    fetchChapters(true)
    console.log(imageErrors)
  }, [])

  useEffect(() => {
    fetchChapters(false)
  }, [orderBy, sortBy, keyword, currentPage])

  const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value)

  const handleChangeOrderBy = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setOrderBy(e.target.value)

  const handleClickExpand = () => setIsExpand(!isExpand)
  const handleDelete = async (data: IChapter) => {
    try {
      await deleteChapter(data.id)
      toast.success(MESSAGE.chapter.deleteSuccess)
      setChapters((prevChapters) =>
        prevChapters?.filter((chapter) => chapter.id !== data.id),
      )
      closeDeleteModal()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${MESSAGE.chapter.deleteFaild} ${error.message}`)
      }
    }
  }
  useEffect(() => {
    setHandleDelete(() => handleDelete)
  }, [])
  return (
    <>
      <Header handleSearch={(keyword: string) => setKeyWord(keyword)}></Header>
      <div className="mt-10">
        {/* STORY'S DETAIL INFORMATION 
        (name, author, genres, status, number of views, number of reviews, number of comments) */}
        <div className="w-full flex flex-col sm:flex-row">
          {/* cover */}
          {!imageErrors ? (
            <Image
              src={'http://localhost:5000/' + story?.cover}
              alt="avatar"
              width={400}
              height={400}
              className="basis-2/12 md:mx-2 h-auto z-[1]"
              onError={() => {
                setImageErrors(true)
              }}
            />
          ) : (
            <div className="px-14 mx-3 flex bg-black/5 justify-center items-center">
              <div className="rounded-full bg-black/5 w-7 h-7 mx-auto leading-7">
                <div className="h-full flex justify-center items-center">
                  <CiImageOff />
                </div>
              </div>
            </div>
          )}

          <ul className="flex flex-col gap-2 text-black/70">
            {/* story name */}
            <li className="me-5">
              <h1 className="text-black uppercase font-semibold tracking-tight text-xl">
                {story?.story_name}
              </h1>
            </li>
            {/* author */}
            <li className="flex items-center gap-3">
              <TbUserPentagon /> {LABEL.story.author}:{' '}
              {story?.author.author_name}
            </li>
            {/* genres */}
            <li className="flex items-center gap-3">
              <BsTags />
              {LABEL.story.genres}:
              {story?.genres && story.genres.length > 0 ? (
                <span>
                  {story.genres.map((genre, index) => (
                    <span key={index}>
                      {genre.genre_name}
                      {index < story.genres.length - 1 && ', '}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-gray-500">No genres available</span>
              )}
            </li>
            {/* status */}
            <li className="flex items-center gap-3">
              <LuBadgeInfo /> {LABEL.story.status}:{' '}
              {story?.status == '1' ? (
                <span className="py-1 px-2 bg-yellow-100 text-sm text-black/50 rounded-md">
                  {LABEL.story.updating}
                </span>
              ) : (
                <>{LABEL.story.completed}</>
              )}
            </li>
            {/* total chapter */}
            <li className="flex items-center gap-3">
              <BiBarChartAlt /> {LABEL.story.total_chapters}:{' '}
              {story?.totalChapters}
            </li>
            {/* views, stars, comments  */}
            <li className="flex items-center gap-3">
              <div className="flex gap-2 items-center">
                <FaRegEye className="opacity-80" />{' '}
                {story?.views || 0 / 1000 + 'k'}
              </div>
              <div className="flex gap-2 items-center">
                <MdOutlineStarBorder
                  color="#F4FA50"
                  className="font-bold"
                />
                {0 / 1000 + 'k'}
              </div>
              <div className="flex gap-2 items-center">
                <GoCommentDiscussion /> {0 / 1000 + 'k'}
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
              dangerouslySetInnerHTML={{ __html: story?.description || '' }}
            ></div>
            <button
              onClick={handleClickExpand}
              className="text-[#013CC6]/50 font-bold"
            >
              {isExpand ? LABEL.sys.showless : LABEL.sys.showmore}
            </button>
          </div>
          <div className="text-md lg:mx-6 text-black/70">
            {LABEL.story.keywords}: {story?.keywords}
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
                  onChange={(e) => handleChangeSortBy(e)}
                  defaultValue={sortBy}
                >
                  {sortableProps.map((property) => (
                    <option
                      key={property.value}
                      value={property.value}
                    >
                      {property.label}
                    </option>
                  ))}
                </Select>

                <Select
                  id="order"
                  name="order"
                  required
                  className=""
                  defaultValue={orderBy}
                  onChange={(e) => handleChangeOrderBy(e)}
                >
                  <option value="ASC">{LABEL.sys.ASC}</option>
                  <option value="DESC">{LABEL.sys.DESC}</option>
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
          <ChapterTable
            chapters={chapters || undefined}
            story_id={params.id}
          />
        </div>
        {/* PAGINATION */}
        <div className="flex justify-center">
          <Pagination
            currentPage={pagination?.page || 0}
            onPageChange={(page: number) => setCurrentPage(page)}
            totalPages={pagination?.totalPages || 0}
          ></Pagination>
        </div>
      </div>
    </>
  )
}
