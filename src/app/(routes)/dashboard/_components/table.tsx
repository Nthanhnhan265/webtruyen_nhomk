import { useDeleteModal } from '@/hooks/modals/useDeleteModal'
import { Button } from 'flowbite-react'
import LABEL from '../label'
import MESSAGE from '../message'
interface IHeader {
  label: string
  name: string
  hidden?: boolean
  render?: (item: unknown) => JSX.Element
}

interface Iprops<T extends Record<string, unknown>> {
  tbHeaderCells: Array<IHeader>
  tbCells: T[] | undefined
  handleClickUpdate?: (selected: T) => void
  readOnly: boolean
}

export default function Table<T extends Record<string, unknown>>(
  props: Iprops<T>,
) {
  const { openDeleteModal } = useDeleteModal()

  return (
    <div className="overflow-x-auto w-full">
      <table
        style={{ borderCollapse: 'separate', borderSpacing: '0 3px' }}
        className="border-separate min-w-full"
      >
        <thead>
          <tr className="bg-white">
            {props.tbHeaderCells?.map((header) => {
              if (!header.hidden) {
                return (
                  <td
                    key={header.label}
                    className="py-4 px-3 text-center font-bold text-sm"
                  >
                    {header.label}
                  </td>
                )
              }
            })}
            <td className="py-4 px-3 font-bold text-sm text-center">
              {LABEL.sys.actionLabel}
            </td>
          </tr>
        </thead>
        <tbody>
          {/* RENDER ROWS OF THE TABLE */}
          {props.tbCells?.map((item: T, rowIndex) => (
            <tr
              className="bg-white"
              key={rowIndex}
            >
              {props.tbHeaderCells?.map(
                (header: IHeader, colIndex) =>
                  !header.hidden && (
                    <td
                      key={colIndex}
                      className="py-2 px-3 text-center text-sm"
                    >
                      {header.render
                        ? header.render(item)
                        : (item[header.name] as React.ReactNode)}
                    </td>
                  ),
              )}
              <td className="py-2 px-2 text-sm text-center flex justify-center items-center gap-2 rounded">
                {!props.readOnly && (
                  <Button
                    color="warning"
                    onClick={() => props.handleClickUpdate?.(item)}
                  >
                    {LABEL.sys.edit}
                  </Button>
                )}

                <Button
                  color="failure"
                  onClick={() => openDeleteModal(item)}
                >
                  {LABEL.sys.delete}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!props.tbCells ? (
        <div className="flex justify-center text-sm">
          {MESSAGE.sys.noRecord}
        </div>
      ) : null}
    </div>
  )
}
