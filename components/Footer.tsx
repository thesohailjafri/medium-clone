import Image from 'next/image'
import React from 'react'
import {
  AiFillInstagram,
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from 'react-icons/ai'
export default function Footer() {
  return (
    <footer className=" border-t border-black bg-yellow-400">
      <div className="mycontainer py-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Image
                  height={50}
                  width={160}
                  src={'/assets/images/logo.svg'}
                  objectFit="contain"
                  alt="Logo"
                />
                <div className="flex items-center justify-evenly gap-4">
                  <a
                    href="https://www.instagram.com/thesohailjafri"
                    target="_blank"
                  >
                    <AiFillInstagram size={33} />
                  </a>
                  <a href="https://github.com/thesohailjafri" target="_blank">
                    <AiFillGithub size={33} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/thesohailjafri"
                    target="_blank"
                  >
                    <AiFillLinkedin size={33} />
                  </a>
                  <a href="https://twitter.com/thesohailjafri" target="_blank">
                    <AiFillTwitterCircle size={33} />
                  </a>
                </div>
              </div>
              <div>
                <p className=" mb-2 font-semibold">
                  Subscribe to our newsletter and get world's top stories in 30
                  seconds.
                </p>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className=" placeholder:text flex-grow rounded-tl-md rounded-bl-md focus:border-black
                  "
                  />
                  <button className="rounded-tr-md rounded-br-md bg-black  px-3 py-2 text-yellow-500 ">
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <ul className="text-xl font-semibold">
                <li>New Blogs</li>
                <li>Top Blogs</li>
                <li>Trending Blogs</li>
                <li>Categories</li>
                <li>Authors</li>
              </ul>
              <ul className=" text-md mt-1 space-y-1">
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Sitemap</li>
              </ul>
            </div>
          </div>
          <p className="md:text-center">
            © {new Date().getFullYear()} <strong>MediumClone</strong> by Sohail
            Jafri. No rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
