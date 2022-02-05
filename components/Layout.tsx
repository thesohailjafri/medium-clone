import React from 'react'
import Footer from './Footer'
import Header from './Header'
export default function Layout({ children }: any) {
  return (
    <div className="">
      <Header />
      <div className="mt-20" />
      <div className="">{children}</div>
      <Footer />
    </div>
  )
}
