export default function ChapterPage({
  params,
}: {
  params: { slug: string; chapter: string }
}) {
  return (
    <h1>
      truy van slug cho:{params.slug} va {params.chapter}
    </h1>
  )
}
