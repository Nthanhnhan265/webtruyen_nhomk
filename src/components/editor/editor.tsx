'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
interface ITextEditorProps {
  editorContent: string | undefined
  onChange: (content: string) => void
}

const TextEditor = (prop: ITextEditorProps) => {
  const { editorContent, onChange } = prop
  const editor = useEditor({
    extensions: [StarterKit],
    content: editorContent,
    editorProps: {
      attributes: {
        class:
          'prose w-full max-w-none focus:outline-none border bg-[#f9fafb] rounded-md shadow-sm p-2',
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      onChange(content)
    },
  })
  console.log(editor?.getText())

  return <EditorContent editor={editor} />
}

export default TextEditor
