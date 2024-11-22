'use client'

import LABEL from '@/app/(routes)/dashboard/label'
import { createChapter, updateChapter } from '@/app/api/chapter.api'
import MESSAGE from '@/app/message'
import TextEditor from '@/components/editor/editor'
import formatDate from '@/components/ulti/formatDate'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { HiCheck, HiX } from 'react-icons/hi'
import { IoCaretForwardSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'
const toSlug = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9 ]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .trim()
export function ChapterForm({
  story_id,
  initialData,
}: {
  story_id: number
  initialData?: IChapter
}) {
  //========================== DECLARES VARS, HOOKS =========================//
  const isEditMode = !initialData ? false : true
  console.log('form>>', initialData)
  const { register, handleSubmit, setValue, watch, reset } = useForm<IChapter>({
    defaultValues: initialData || {},
  })
  const router = useRouter()
  const chapterName = watch('chapter_name')
  // Auto-generate slug from chapter name
  useEffect(() => {
    if (chapterName) {
      setValue('slug', toSlug(chapterName))
    } else {
      setValue('slug', '')
    }
  }, [chapterName, setValue])
  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])
  //========================== HANDLE FUNCTIONS =========================//
  /** HANDLE SUBMIT FORM
   * @param data
   */
  const onSubmit = async (data: IChapter) => {
    console.log('Form submitted:', data)
    try {
      if (isEditMode && initialData) {
        await updateChapter(
          initialData?.id,
          data.chapter_name,
          data.content,
          story_id,
          data.slug,
          initialData?.views || 0,
          data.status,
          data.chapter_order,
        )
        toast.success(MESSAGE.chapter.updateSuccess)
      } else {
        // Chế độ thêm mới
        await createChapter(
          data.chapter_name,
          data.content,
          story_id,
          data.slug,
          data.status === true,
          data.chapter_order,
        )
        toast.success(MESSAGE.chapter.createSuccess)
      }
      router.push(`/dashboard/stories/${story_id}`)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  //========================== RENDER COMPONENTS =========================//

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=""
    >
      <div className="flex justify-between mb-10">
        <div className="flex mt-2 gap-1 items-center capitalize text-xl font-medium opacity-50">
          <IoCaretForwardSharp />{' '}
          {isEditMode ? LABEL.chapter.edit : LABEL.chapter.new}
        </div>
        <div className="flex justify-end items-center gap-2">
          <Button
            type="submit"
            className="flex bg-[#33C2E9]"
          >
            <HiCheck className="mr-2 mt-0.5" />
            {LABEL.sys.save}
          </Button>
          <Link href={`/dashboard/stories/${story_id}/`}>
            <Button
              type="button"
              color="failure"
              className="flex"
            >
              <HiX className="mr-3 h-4 mt-0.5" /> {LABEL.sys.cancel}
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:grid grid-cols-2 md:mt-4">
        {/* FIRST COLUMN */}
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
              {...register('chapter_name', { required: true })}
            />
          </div>

          {/* CREATED AT AND PUBLISHED AT (Read-only) */}
          <div className="gap-3 me-5 grid grid-cols-2">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="created_at"
                  value={LABEL.sys.createdAtLabel + ':'}
                />
              </div>
              <TextInput
                id="created_at"
                disabled
                value={
                  isEditMode
                    ? formatDate(initialData?.created_at || '')
                    : '--/--/--'
                }
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="published_at"
                  value={LABEL.sys.publishedAtLabel + ':'}
                />
              </div>
              <TextInput
                id="published_at"
                disabled
                value={
                  isEditMode
                    ? formatDate(initialData?.published_at || '')
                    : '--/--/--'
                }
              />
            </div>
          </div>
        </div>

        {/* SECOND COLUMN */}
        <div className="col-span-1 flex flex-col gap-4">
          {/* STATUS AND CHAPTER ORDER */}
          <div className="me-5 grid grid-cols-2 gap-3">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="status"
                  value={LABEL.sys.status + ':'}
                />
              </div>
              <Select
                id="status"
                {...register('status', { required: true })}
              >
                <option value="true">{LABEL.chapter.publish}</option>
                <option value="false">{LABEL.chapter.draft}</option>
              </Select>
            </div>

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
                {...register('chapter_order', { required: true })}
              />
            </div>
          </div>

          {/* SLUG */}
          <div className="me-5">
            <div className="mb-2 block">
              <Label
                htmlFor="slug"
                value="Slug:"
              />
            </div>
            <TextInput
              id="slug"
              readOnly
              {...register('slug')}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="col-span-2 mt-3">
          <div className="me-5">
            <div className="mb-2 block">
              <Label
                htmlFor="content"
                value={LABEL.chapter.contentLabel + ':'}
              />
            </div>

            <TextEditor
              editorContent={isEditMode ? initialData?.content : ''}
              onChange={(content: string) => setValue('content', content)}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
