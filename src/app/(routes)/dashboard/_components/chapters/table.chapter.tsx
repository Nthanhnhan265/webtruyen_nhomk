import formatDate from '@/components/ulti/formatDate'
import { Button } from 'flowbite-react'
import { useState } from 'react'
import LABEL from '../../label'
import MESSAGE from '../../message'

interface Iprops {
  chapters: IChapter[]
  openDModal: (id: number) => void
  closeDModal: () => void
}
export default function ChapterTable(props: Iprops) {
  //====Declare variables, hooks==========//
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})
  const chapters = [
    {
      id: 1,
      order: 1,
      name: 'abc',
      status: 'dang',
      views: 2,
      reviews: 2,
      comments: 2,
      create_at: '22/2/2024',
      published_at: '22/2/2024',
    },
  ]
  //==========Handle Function============//
  //Nơi tạo các hàm xử lý cho bảng
  /*
      Hàm xử lý khi ảnh không load thành công  
  */
  const handleImageError = (id: number) => {
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [id]: true,
    }))
  }

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
          {chapters
            ? chapters.map((chapter) => (
                <tr
                  className="bg-white"
                  key={chapter.id}
                >
                  <td className="py-2 px-3  text-center text-sm">
                    {chapter.id}
                  </td>

                  {/* whitespace-nowrap overflow-hidden text-ellipsis max-w-xs */}
                  <td className="py-2 px-2 text-sm text-center">
                    {chapter.order}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    {chapter.name}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    {chapter.status}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    {chapter.views}, {chapter.reviews}, {chapter.comments}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    {formatDate(chapter.create_at)}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    {formatDate(chapter.published_at)}
                  </td>
                  <td className="py-2 px-2 text-sm text-center flex justify-center items-center gap-2 rounded">
                    <Button color="warning">{LABEL.sys.edit}</Button>
                    <Button
                      color="failure"
                      onClick={() => props.openDModal(chapter.id)}
                    >
                      {LABEL.sys.delete}
                    </Button>
                  </td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
      {!chapters || chapters.length === 0 ? (
        <div className="flex justify-center text-sm">
          {MESSAGE.sys.noRecord}
        </div>
      ) : null}
    </div>
  )
}
