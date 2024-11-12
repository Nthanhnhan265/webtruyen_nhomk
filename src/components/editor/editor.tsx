'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
interface ITextEditorProps {
  editorContent: string
  onChange: (content: string) => void
}

const TextEditor = (prop: ITextEditorProps) => {
  console.log(prop)
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class:
          'prose w-full max-w-none focus:outline-none border bg-[#f9fafb] rounded-md shadow-sm p-2',
      },
    },
  })

  return <EditorContent editor={editor} />
}

export default TextEditor
