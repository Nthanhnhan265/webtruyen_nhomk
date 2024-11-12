import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')
  const reqRoute = request.nextUrl.pathname
  console.log('>>>middleware<<<')
  console.log(accessToken)
  // Nếu không có accessToken và yêu cầu vào các route liên quan đến dashboard hoặc profile
  if (!accessToken) {
    // Kiểm tra nếu người dùng truy cập trang login của dashboard, giữ lại ở đó
    if (reqRoute.includes('dashboard/login')) {
      return NextResponse.next() // Cho phép vào login trang
    }

    // Nếu không có accessToken và yêu cầu vào dashboard, chuyển hướng đến login
    if (reqRoute.includes('dashboard')) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }

    // Nếu không có accessToken và yêu cầu vào profile, chuyển hướng đến login
    if (reqRoute.includes('profile')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  //Nếu có token và vào trang login thì chuyển hướng đến khác
  else {
    console.log('co')
    // truy cập trang login của dashboard thì cho vào dashboard,
    if (reqRoute.includes('/dashboard/login')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // truy cập trang login của home thì vào home,
    if (reqRoute.includes('/login')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next() // Nếu có accessToken, cho phép truy cập
}

export const config = {
  matcher: ['/login', '/dashboard/:path*', '/profile/:path*'],
}
