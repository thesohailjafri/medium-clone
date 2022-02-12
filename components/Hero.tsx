import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
    <div className="  border-b border-black bg-yellow-400 ">
      <div className="mycontainer flex items-center justify-between py-6">
        <div className=" md:w-4/5 lg:w-3/5 ">
          <h1 className=" font-serif text-5xl font-medium md:text-6xl lg:text-7xl">
            Medium is a place to write, read, and connect
          </h1>
          <h6 className="my-1">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h6>
          <button className="mt-6 rounded-full border border-black px-4 py-2">
            Start Writing
          </button>
        </div>

        <img
          className="ease  2xl:h-76 hidden h-40 w-auto transition-all duration-150 ease-out 
          sm:block md:h-48 lg:h-60 xl:h-72 "
          src={'/assets/images/icon.svg'}
          alt="Logo"
        />
      </div>
    </div>
  )
}
