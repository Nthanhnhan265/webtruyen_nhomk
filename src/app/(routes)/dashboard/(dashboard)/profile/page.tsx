import ProfileComponent from '@/app/(routes)/_component/profile/ProfileComponent'
import { handleGetProfileInfo } from '@/auth/auth.services'
import { cookies } from 'next/headers'
const ProfilePage = async () => {
  //------------- DECLARE VARIABES ---------------//
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const userProfile = await handleGetProfileInfo(accessToken || '')

  //------------- HANDLE FUNCTIONS ---------------//
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ProfileComponent
          accessToken={accessToken || ''}
          email={userProfile?.email}
          username={userProfile?.username}
          role={userProfile?.role_id}
          createdAt={userProfile?.createdAt}
          avatar={userProfile?.avatar}
        ></ProfileComponent>
      </div>
    </>
  )
}

export default ProfilePage
