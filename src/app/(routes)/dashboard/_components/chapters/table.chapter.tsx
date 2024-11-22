import formatDate from '@/components/ulti/formatDate'
import { Button } from 'flowbite-react'
import { FaRegEye } from 'react-icons/fa'
import LABEL from '../../label'
import MESSAGE from '../../message'

import { useDeleteModal } from '@/hooks/modals/useDeleteModal'
import { useRouter } from 'next/navigation'
interface Iprops {
  story_id: number
  chapters: IChapter[] | undefined
}
export default function ChapterTable(props: Iprops) {
  //====Declare variables, hooks==========//
  // const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})
  const { openDeleteModal } = useDeleteModal()
  const router = useRouter()

  //==========Handle Function============//
  //Nơi tạo các hàm xử lý cho bảng
  /*
      Hàm xử lý khi ảnh không load thành công  
  */
  return (
    <div className="overflow-x-auto w-full">
      <table
        style={{ borderCollapse: 'separate', borderSpacing: '0 3px' }}
        className=" border-separate min-w-full "
      >
        <thead>
          <tr className="bg-white capitalize">
            <th className="py-4 px-3 text-sm ">{LABEL.sys.id}</th>
            <th className="py-4 px-2 text-sm">
              {LABEL.chapter.chapterOrderLabel}
            </th>
            <th className="py-4 px-2 text-sm">
              {LABEL.chapter.chapterNameLabel}
            </th>
            <th className="py-4 px-2 text-sm">{LABEL.sys.status}</th>
            <th className="py-4 px-2 text-sm">
              {LABEL.chapter.interactionLabel}
            </th>
            <th className="py-4 px-2 text-sm">{LABEL.sys.createdAtLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.sys.publishedAtLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.sys.actionLabel}</th>
          </tr>
        </thead>
        <tbody>
          {props.chapters &&
            props.chapters.map((chapter) => (
              <tr
                className="bg-white"
                key={chapter.id}
              >
                <td className="py-2 px-3  text-center text-sm">{chapter.id}</td>
                {/* whitespace-nowrap overflow-hidden text-ellipsis max-w-xs */}
                <td className="py-2 px-2 text-sm text-center">
                  {chapter.chapter_order}
                </td>
                <td className="py-2 px-2 text-sm text-center">
                  {chapter.chapter_name}
                </td>
                <td className="py-2 px-2 text-sm text-center">
                  {chapter.status == true ? (
                    <span className="py-1 px-2 bg-yellow-100 text-sm text-black/50 rounded-md">
                      {LABEL.chapter.publish}
                    </span>
                  ) : (
                    <span className="py-1 px-2 bg-green-200 text-sm text-black/50 rounded-md">
                      {LABEL.chapter.draft}
                    </span>
                  )}
                </td>
                <td className="py-2 px-2 text-sm text-center flex justify-center">
                  <span className="flex items-center gap-1">
                    {chapter.views} <FaRegEye />
                  </span>
                </td>
                <td className="py-2 px-2 text-sm text-center">
                  {formatDate(chapter.created_at)}
                </td>
                <td className="py-2 px-2 text-sm text-center">
                  {formatDate(chapter.published_at)}
                </td>
                <td className="py-2 px-2 text-sm text-center flex justify-center items-center gap-2 rounded">
                  <Button
                    color="warning"
                    onClick={() => {
                      router.push(
                        `/dashboard/stories/${props.story_id}/chapters/${chapter.id}/update`,
                      )
                      router.refresh()
                    }}
                  >
                    {LABEL.sys.edit}
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => openDeleteModal(chapter)}
                  >
                    {LABEL.sys.delete}
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!props.chapters || props.chapters.length === 0 ? (
        <div className="flex justify-center text-sm">
          {MESSAGE.sys.noRecord}
        </div>
      ) : null}
    </div>
  )
}
