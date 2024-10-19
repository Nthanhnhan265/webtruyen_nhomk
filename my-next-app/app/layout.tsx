// app/layout.tsx
import Dashboard from './dashboard/Dashboard'
import './globals.css'

export const metadata = {
  title: 'My Dashboard',
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
        <Dashboard />
        {/* {children} */}
      </body>
    </html>
  )
}

export default RootLayout
