// app/layout.tsx
import './globals.css';
import Login from '../Login/Login';
import Dashboard from '../dashboard/dashboard';
import BookPage from './BookPage/BookPage';


export const metadata = {
  title: 'My Login',
  description: 'Dashboard for managing authors and stories',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Login />
        {/* <Dashboard /> */}
        <BookPage />
        {/* {children} */}
      </body>
    </html>
  );
};

export default RootLayout;
