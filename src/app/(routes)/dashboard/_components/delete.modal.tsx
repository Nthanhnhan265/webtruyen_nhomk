'use client'
import { Button, Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import LABEL from '../../../label'
//============DELETE=================//
interface IDeleteModalProps {
  isOpenDModal: number
  closeDModal: () => void
  onDelete: (id: number) => void
  message: string
}
function DeleteModal(prop: IDeleteModalProps) {
  return (
    <>
      <Modal
        show={prop.isOpenDModal != -1}
        size="md"
        onClose={prop.closeDModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {prop.message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => prop.onDelete(prop.isOpenDModal)}
              >
                {LABEL.sys.confirm}
              </Button>
              <Button
                color="gray"
                onClick={() => prop.closeDModal()}
              >
                {LABEL.sys.cancel}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export { DeleteModal }
