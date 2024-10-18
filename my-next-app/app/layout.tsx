// app/layout.tsx
import './globals.css';
import Dashboard from './dashboard/Dashboard';

export const metadata = {
  title: 'My Dashboard',
  description: 'Dashboard for managing authors and stories',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Dashboard />
        {/* {children} */}
      </body>
    </html>
  );
};

export default RootLayout;
