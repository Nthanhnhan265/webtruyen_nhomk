import useProfile from '@/hooks/users/useProfile'
import ProfileComponent from '../_component/profile/ProfileComponent'
import UserSidebar from '../_component/sidebar_profile'
const ProfilePage = async () => {
  //------------- DECLARE VARIABES ---------------//
  const { userProfile, accessToken } = await useProfile()

  //------------- HANDLE FUNCTIONS ---------------//
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-10 bg-gray-800 text-black">
          {/* <Navbar /> */}
        </div>
        {/* Sidebar */}
        <div className="hidden fixed top-24 left-0 w-64 h-screen bg-gray-800 text-white">
          <UserSidebar />
        </div>
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
