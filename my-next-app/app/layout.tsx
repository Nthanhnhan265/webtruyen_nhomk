// app/layout.tsx
import './globals.css';
import BookPage from './BookPage/BookPage';
import Login from '../Login/Login';
import Dashboard from '../dashboard/dashboard';

export const metadata = {
  title: 'My Login',
  description: 'Dashboard for managing authors and stories',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {/* <Dashboard /> */}
        <BookPage />
        <Login />

        {/* {children} */}
      </body>
    </html>
  );
};

export default RootLayout;
