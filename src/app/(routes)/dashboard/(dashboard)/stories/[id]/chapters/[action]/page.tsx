'use client'
import Header from '@/app/(routes)/dashboard/_components/header'
import LABEL from '@/app/(routes)/dashboard/label'
import TextEditor from '@/components/editor/editor'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { HiCheck, HiX } from 'react-icons/hi'
import { IoCaretForwardSharp } from 'react-icons/io5'

export default function CreateChapterPage({
  params,
}: {
  params: { id: number }
}) {
  const STORY_NAME =
    'Xuyên Không, Tôi Trở Thành Quản Lí Vàng Trong Làng Showbiz'

  // return <Editor></Editor>
  return (
    <>
      <Header handleSearch={() => {}}></Header>
      <div className="mt-8 pb-4">
        {/* TITLE AND BUTTON */}
        <div className="sm:flex justify-between">
          <h1>
            <span className="uppercase text-2xl tracking-tight font-semibold">
              {STORY_NAME}
            </span>
            <div className="flex mt-2 gap-1 items-center capitalize text-xl font-medium opacity-50">
              <IoCaretForwardSharp /> {LABEL.chapter.new}
            </div>
          </h1>
          <div className="flex justify-end items-center gap-2">
            <Button className="flex bg-[#33C2E9]">
              <HiCheck className="mr-2 mt-0.5" />
              {LABEL.sys.save}
            </Button>
            <Button
              color="failure"
              className="flex"
            >
              <HiX className="mr-3 h-4 mt-0.5" /> {LABEL.sys.cancel}
            </Button>
          </div>
        </div>
        {/* FORMS */}
        <div className="lg:grid grid-cols-2 md:mt-4">
          {/* FIRST COLUMNS  */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* CHAPTER NAME */}
            <div className="me-5">
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  value={LABEL.chapter.chapterNameLabel + ':'}
                />
              </div>
              <TextInput
                id="name"
                className="opacity-90"
                placeholder={LABEL.chapter.enterChapterNameLabel}
                required
              />
            </div>
            {/* CREATED AT AND PUBLISHED AT */}
            <div className="gap-3 me-5 grid grid-cols-2">
              {/* Created at  */}
              <div className="">
                <div className="mb-2 block">
                  <Label
                    htmlFor="created_at"
                    value={LABEL.sys.createdAtLabel + ':'}
                  />
                </div>
                <TextInput
                  id="created_at"
                  disabled
                  required
                  value={'--/--/--'}
                />
              </div>

              {/* publised at  */}
              <div className="">
                <div className="mb-2 block">
                  <Label
                    htmlFor="published_at"
                    value={LABEL.sys.publishedAtLabel + ':'}
                  />
                </div>
                <TextInput
                  id="published_at"
                  disabled
                  required
                  value={'--/--/--'}
                />
              </div>
            </div>
          </div>
          {/* SECOND COLUMNS  */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* STATUS  AND CHAPTER ORDER */}
            <div className="me-5 grid grid-cols-2 gap-3">
              {/* status */}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="status"
                    value={LABEL.sys.status + ':'}
                  />
                </div>
                <Select
                  id="password1"
                  required
                >
                  <option value=""></option>
                </Select>
              </div>
              {/* chapter order */}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="order"
                    value={LABEL.chapter.chapterOrderLabel + ':'}
                  />
                </div>
                <TextInput
                  id="order"
                  type="number"
                  required
                />
              </div>
            </div>
            {/* SLUG (URL)*/}
            <div className="me-5">
              <div className="mb-2 block">
                <Label
                  htmlFor="slug"
                  value="Slug:"
                />
              </div>
              <TextInput
                id="slug"
                required
              />
            </div>
          </div>
          <div className="col-span-2 mt-3">
            {/* CONTENT */}
            <div className="me-5">
              {/* <div className="mb-2 block">
                <Label
                  htmlFor="content"
                  value={LABEL.chapter.contentLabel + ':'}
                />
              </div>
              <Textarea
                id="content"
                required
                rows={10}
              /> */}
              <div className="mb-2 block">
                <Label
                  htmlFor="content"
                  value={LABEL.chapter.contentLabel + ':'}
                />
              </div>

              <TextEditor
                editorContent=""
                onChange={() => {}}
              ></TextEditor>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
