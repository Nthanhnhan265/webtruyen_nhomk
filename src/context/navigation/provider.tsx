// app/providers.js
'use client'

import { SideBar } from './nav.context'
// import { ThemeProvider } from 'acme-theme'

export function Providers({ children }) {
  return <SideBar>{children}</SideBar>
}
