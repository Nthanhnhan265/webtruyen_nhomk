import { NextResponse, type NextRequest } from 'next/server'
import { handleGetProfileInfo } from './auth/auth.services'
export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')
  const reqRoute = request.nextUrl.pathname
  const res = NextResponse.next()
  // Nếu không có accessToken và yêu cầu vào các route liên quan đến dashboard hoặc profile
  // Kiểm tra nếu người dùng truy cập trang login của dashboard, giữ lại ở đó
  // Nếu không có accessToken và yêu cầu vào dashboard, chuyển hướng đến login
  // Nếu không có accessToken và yêu cầu vào profile, chuyển hướng đến login
  if (!accessToken) {
    if (reqRoute.includes('dashboard/login')) {
      return NextResponse.next()
    }
    if (reqRoute.includes('dashboard')) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }
    if (reqRoute.includes('profile')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  //Nếu có token và vào trang login thì chuyển hướng đến khác
  // truy cập trang login của dashboard thì cho vào dashboard,
  // truy cập trang login của home thì vào home,
  else {
    // lấy thông tin cá nhân trước khi đăng nhập và gửi vào trang cá nhân
    // Nếu có accessToken, cho phép truy cập
    const user = await handleGetProfileInfo(accessToken?.value || '')
    if (!user) {
      const expiredTokenResponse = NextResponse.redirect(
        new URL(
          reqRoute.includes('dashboard') ? '/dashboard/login' : '/login',
          request.url,
        ),
      )

      expiredTokenResponse.cookies.delete('accessToken')
      return expiredTokenResponse
    }
    if (reqRoute.includes('/dashboard/login')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (reqRoute.includes('/login')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/login', '/dashboard/:path*', '/profile/:path*'],
}
