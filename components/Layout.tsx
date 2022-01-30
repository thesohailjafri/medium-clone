import React from 'react'
import Header from './Header'
export default function Layout({ children }) {
  return (
    <div className="">
      <Header />
      <div className="mt-20" />
      <div className="">{children}</div>
    </div>
  )
}
