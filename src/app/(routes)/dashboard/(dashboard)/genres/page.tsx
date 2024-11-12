'use client'
import { Button, Label, Pagination, Select } from 'flowbite-react'
import Header from '../../_components/header'
import Table from '../../_components/table'
import LABEL from '../../label'
export default function GenrePage() {
  //====================== DECLARE VARS, HOOKS ====================//
  const headerCells = [
    { label: 'id', name: 'id' },
    { label: 'tên thể loại', name: 'genre_name' },
    { label: 'Mô tả', name: 'description' },
    { label: 'Đường dẫn', name: 'slug' },
  ]
  const data = [
    {
      id: 1,
      genre_name: 'helloword',
      description: 'hello con bo',
      slug: '/abc',
    },
    {
      id: 2,
      genre_name: 'helloword',
      description: 'hello con bo',
      slug: '/abc',
    },
  ]
  //====================== HANDLES FUNCTIONS ======================//
  const handleSearch = (keyword: string) => {}
  const handleUpdate = (id: any) => {
    console.log(id)
  }
  const handleDelete = (id: number) => {
    console.log(id)
  }
  //====================== RENDER COMPONENT =======================//
  return (
    <>
      <div className="">
        {/* header */}
        <Header handleSearch={handleSearch}></Header>

        {/* Create and Delete modal */}
        {/* <UserModal
          isOpenModal={isModalOpen}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          user={selectedUser}
          isEdit={isEditMode}
        /> */}
        {/* <DeleteModal
          isOpenDModal={isDModalOpen}
          closeDModal={closeDModal}
          onDelete={(id) => handleDeleteSubmit(id)}
          labelModal={MESSAGE.user.confirmDelete}
        ></DeleteModal> */}
        {/* Title and Create button */}
        <div className="flex justify-between items-center mb-0">
          <h2 className="text-xl font-bold">{LABEL.genre.label}</h2>
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
                // onChange={(e) => handleChangeSortBy(e)}
              >
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
                className="max-w-40"
                // onChange={(e) => handleChangeOrderBy(e)}
              >
                <option value="DESC">{LABEL.sys.DESC}</option>
                <option value="ASC">{LABEL.sys.ASC}</option>
              </Select>
            </div>
            <Button
              color="success"
              //   onClick={() => openCreateModal()}
            >
              + {LABEL.sys.create}
            </Button>
          </div>
        </div>

        {/* user table */}
        <Table
          tbHeaderCells={headerCells}
          tbCells={data}
          handleClickDelete={handleDelete}
          handleClickUpdate={handleUpdate}
        ></Table>
        <div className="flex overflow-x-auto justify-center">
          <Pagination
            currentPage={1}
            totalPages={10}
            onPageChange={() => {}}
            className="mt-8"
          />
        </div>
      </div>
    </>
  )
}
