// app/dashboard/Dashboard.tsx
'use client' // This line indicates that the component should be treated as a Client Component

import { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import AuthorPage from './AuthorPage'
import GenrePage from './GenrePage'
import User from './UserPage'

const Dashboard = () => {
  const [activePage, setActivePage] = useState('authors')

  const renderContent = () => {
    switch (activePage) {
      case 'authors':
        return <AuthorPage />
      case 'categories':
        return <GenrePage />
      case 'users':
        return <User />
      // Add more cases for other pages if needed
      default:
        return <AuthorPage />
    }
  }

  return (
    <div className="flex">
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1 p-4 bg-gray-100">{renderContent()}</div>
    </div>
  )
}

export default Dashboard
