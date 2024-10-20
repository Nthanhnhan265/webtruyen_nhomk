// app/layout.tsx
import Dashboard from './dashboard/Dashboard'
import './globals.css'
// import './globals.css';
// import BookPage from './BookPage/BookPage';
// import Login from '../Login/Login';
// import GenrePage from './dashboard/GenrePage';
// import Dashboard from './dashboard/Dashboard';

export const metadata = {
  title: 'My Login',
  description: 'Dashboard for managing authors and stories',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=hide_image"
        />
      </head>
      <body>
        {<Dashboard />}
        {/* <BookPage /> */}
        {/* <Login /> */}
        {/* <GenrePage /> */}

        {/* {children} */}
      </body>
    </html>
  )
}

export default RootLayout
