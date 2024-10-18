// app/layout.tsx
import './globals.css';
import Dashboard from './dashboard/Dashboard';
import BookPage from './BookPage/BookPage';

export const metadata = {
  title: 'My Dashboard',
  description: 'Dashboard for managing authors and stories',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {/* <Dashboard /> */}
        <BookPage />
        {/* {children} */}
      </body>
    </html>
  );
};

export default RootLayout;
