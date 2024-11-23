import MESSAGE from '@/app/message'
import { useState } from 'react'

function useFile({
  maxSizeMB = 2,
  allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
}: {
  maxSizeMB: number
  allowedTypes: Array<string>
}) {
  const [error, setError] = useState('')

  function validateFile(file: File) {
    if (!file) {
      setError(MESSAGE.file.noFileSelected)
      return false
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(
        MESSAGE.file.fileSizeExceeded.replace(
          '{maxSize}',
          maxSizeMB.toString(),
        ),
      )
      return false
    }
    if (!allowedTypes.includes(file.type)) {
      setError(MESSAGE.file.invalidFileType)
      return false
    }
    setError('')
    return true
  }

  return { validateFile, error }
}

export default useFile
