'use client'
import { deleteReview, getReviews, searchReviews } from '@/app/api/review.api.'
import { useDeleteModal } from '@/hooks/modals/useDeleteModal'
import { AxiosError } from 'axios'
import { Label, Pagination, Select } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { IoIosStar } from 'react-icons/io'
import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import formatDate from '../../../../../components/ulti/formatDate'
import Header from '../../_components/header'
import Table from '../../_components/table'
import LABEL from '../../label'
import MESSAGE from '../../message'
export default function ReviewsPage() {
  //====================== DECLARE VARS, HOOKS ====================//

  const [keyword, setKeyWord] = useState<string>('')
  const [orderBy, setOrderBy] = useState<string>('DESC')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<string>('created_at')
  const [reviews, setReviews] = useState([])

  const [totalPages, setTotalPages] = useState<number>(0)
  const MAXIMUM_RECORDS = 10
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (keyword) {
          const response = await searchReviews(
            keyword,
            sortBy,
            orderBy,
            currentPage,
            MAXIMUM_RECORDS,
          )
          const data = response.data.map((rv) => {
            return {
              user_id: rv.user_id,
              username: rv.User?.username,
              star: (
                <div className="flex justify-center items-center gap-0.5">
                  {rv.star} <IoIosStar className="text-yellow-200" />
                </div>
              ),
              comment: rv.comment,
              story_id: rv.Story?.story_id,
              story_name: rv.Story?.story_name,
              created_at: formatDate(rv.created_at),
            }
          })
          console.log(data)
          setReviews(data)
          setTotalPages(response.pagination.totalPages)
        } else {
          const response = await getReviews(
            sortBy,
            orderBy,
            currentPage,
            MAXIMUM_RECORDS,
          )
          const data = response.data.map((rv) => {
            return {
              user_id: rv.user_id,
              username: rv.User?.username,
              star: (
                <div className="flex justify-center items-center gap-0.5">
                  {rv.star} <IoIosStar className="text-yellow-200" />
                </div>
              ),
              comment: rv.comment,
              story_id: rv.story_id,
              story_name: rv.Story?.story_name,
              created_at: formatDate(rv.created_at),
            }
          })
          setReviews(data)
          setTotalPages(response.pagination.totalPages)
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          switch (err.status) {
            case 401:
              toast.error(
                `${MESSAGE.sys.fetchError}, ${MESSAGE.auth.unauthorized}`,
              )
              // return router.push('/dashboard/login')
              redirect('/dashboard/login')
          }
        }
        console.log(err)
        toast.error(MESSAGE.sys.fetchError)
      }
    }
    fetchUsers()
  }, [currentPage, sortBy, orderBy, keyword])

  const headerCells = [
    { label: 'user_id', name: 'user_id', hidden: true },
    { label: 'story_id', name: 'story_id', hidden: true },
    { label: 'Tên độc giả', name: 'username' },
    { label: 'Điểm', name: 'star' },
    { label: 'Cảm nghĩ', name: 'comment' },
    { label: 'Tên truyện', name: 'story_name' },
    { label: 'Ngày tạo', name: 'created_at' },
  ]

  const sortableProps = [
    { label: LABEL.user.usernameLabel, value: 'username' },
    { label: LABEL.sys.createdAtLabel, value: 'created_at' },
    { label: LABEL.chapter.storyName, value: 'story_name' },
    { label: LABEL.chapter.star, value: 'star' },
  ]
  const { setMessage, setHandleDelete, closeDeleteModal } = useDeleteModal()
  //====================== HANDLES FUNCTIONS ======================//
  //click to change page
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }
  //click to choose sort by
  const handleChangeSortBy = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log(e.target.value)
    setSortBy(e.target.value)
  }
  //click to choose order
  const handleChangeOrderBy = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log('selected')
    setOrderBy(e.target.value)
  }

  const handleSearch = (keyword: string) => {
    setKeyWord(keyword)
  }
  const handleUpdate = (id: number) => {
    console.log(id)
  }
  const handleDelete = async (selected: object) => {
    try {
      await deleteReview(selected.user_id, selected.story_id)
      setReviews((prev) =>
        prev.filter((item) => {
          if (
            item.user_id !== selected.user_id ||
            item.story_id !== selected.story_id
          ) {
            return true
          }
          return false
        }),
      )
      toast.success(MESSAGE.review.deleteSuccess)
    } catch (error) {
      if (error) {
        console.error(error)
      }
      toast.error(MESSAGE.review.deleteFailed)
    }
    closeDeleteModal()
  }
  useEffect(() => {
    setMessage(MESSAGE.review.confirmDelete)
    setHandleDelete(() => handleDelete)
    console.log(reviews)
  }, [])
  //====================== RENDER COMPONENT =======================//
  return (
    <>
      <div className="">
        {/* header */}
        <Header handleSearch={handleSearch}></Header>

        {/* Title and Create button */}
        <div className="flex justify-between items-center mb-0">
          <h2 className="text-xl font-bold">{LABEL.review.label}</h2>
        </div>
        {/* sort */}
        <div className="mb-2 ">
          <div className="mb-2 block">
            <Label
              htmlFor="sortBy"
              value={LABEL.sys.sortLabel}
            />
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex gap-2">
              <Select
                id="sortBy"
                name="sortBy"
                required
                className="max-w-40"
                onChange={(e) => handleChangeSortBy(e)}
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
                className="max-w-40"
                onChange={(e) => handleChangeOrderBy(e)}
              >
                <option value="DESC">{LABEL.sys.DESC}</option>
                <option value="ASC">{LABEL.sys.ASC}</option>
              </Select>
            </div>
          </div>
        </div>

        {/* user table */}
        <Table
          tbHeaderCells={headerCells}
          tbCells={reviews}
          handleClickUpdate={handleUpdate}
          readOnly={true}
        ></Table>
        <div className="flex overflow-x-auto justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            className="mt-8"
          />
        </div>
      </div>
    </>
  )
}
