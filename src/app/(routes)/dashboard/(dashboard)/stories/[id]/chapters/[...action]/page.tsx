import { getChapterId } from '@/app/api/chapter.api'
import useProfile from '@/hooks/users/useProfile'
import { redirect } from 'react-router-dom'
import { ChapterForm } from './chapter.form'
export default function CreateChapterPage({
  params,
}: {
  params: { id: number; action: Array<string> }
}) {
  const { accessToken } = useProfile()
  let chapter = null
  if (params.action[1] == 'update') {
    try {
      const id = Number(params.action[0])
      getChapterId(id, accessToken)
        .then((data) => (chapter = data))
        .catch((err) => console.log(err))
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  try {
    // console.log(params.id, params.idChapter, params.action)
    // const result = await getStoryAndChapters(params.id, accessToken || '')
    // return <Editor></Editor>
    return (
      <>
        {/* <Header handleSearch={() => {}}></Header> */}
        <div className="mt-8 pb-4">
          {/* TITLE AND BUTTON */}
          <div className="sm:flex justify-between">
            <h1>
              <span className="uppercase text-2xl tracking-tight font-semibold">
                {/* {result.story.story_name} */}
              </span>
            </h1>
          </div>
          {/* FORMS */}
          <ChapterForm
            initialData={chapter}
            // story_id={result.story.id}
            story_id={params.id}
          ></ChapterForm>
        </div>
      </>
    )
  } catch (error) {
    console.error(error)
    redirect('/dashboard/stories')
  }
}
