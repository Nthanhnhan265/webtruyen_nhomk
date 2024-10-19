
import './globals.css';
import Login from '../Login/Login';
import Dashboard from '../dashboard/dashboard';
import BookPage from './BookPage/BookPage';


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
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Login />
        {/* <Dashboard /> */}
        <BookPage />
        {/* {children} */}
      </body>
      <script
        async
        src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"
      ></script>
    </html>
  )
}

export default RootLayout
