import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <header className=" fixed top-0 left-0 w-full border-b border-black bg-yellow-500">
      <div className="mycontainer flex h-20 items-center  justify-between  ">
        <div>
          <div>
            <Image
              height={50}
              width={160}
              src={'/assets/images/logo.svg'}
              objectFit="contain"
              alt="Logo"
            />
          </div>
        </div>

        <div className="flex items-center ">
          <nav className="">
            <ul className="mr-6 hidden gap-6 sm:flex">
              <li className="hidden md:block">Our story</li>
              <li className="hidden md:block">Membarship</li>
              <li className="hidden md:block">Write</li>
              <li>Sign In</li>
            </ul>
          </nav>
          <button className=" rounded-full bg-black px-4 py-2 text-white">
            Get started
          </button>
        </div>
      </div>
    </header>
  )
}
