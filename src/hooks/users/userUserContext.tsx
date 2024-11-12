import { useContext } from 'react'
import { userContext } from '../../context/user/user.context'

/** SIDE BAR CONTEXT
 * @returns {IpropLoggedInUer} - Trả về đối tượng IpropLoggedInUser
 */
export function useUserContext() {
  const user = useContext(userContext)
  return user
}
