import React from 'react'
import PhotoStack from './PhotoStack'

function Hero2() {
  return (
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-sm mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Tell the
world who 
you are</h1>
            <p className="max-w-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">share you vibe, story, projects and<br/> 
your skills limitlessly</p>
          
<form className="max-w-md mx-auto">
  <label htmlFor="username" className="sr-only">
    Username
  </label>

  <div className="relative flex items-center bg-neutral-secondary-medium border border-[#9F2E2E] rounded-3xl px-3 py-2 shadow-xs focus-within:ring-2 focus-within:ring-brand">
    
    {/* Web icon */}
    <div className="flex items-center pr-2 text-body">
      <svg className="w-4 h-4 text-[#A32E2E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Zm0 0c2.5-2.5 4-5.5 4-9s-1.5-6.5-4-9m0 18c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9m9 9H3"/>
      </svg>
    </div>

    {/* fixed prefix */}
    <span className="text-body text-sm select-none text-[#A32E2E]">
      whoiz.bio/
    </span>

    {/* input */}
    <input
      type="text"
      id="username"
      placeholder="username"
      className="flex-1 bg-transparent outline-none text-heading text-sm px-1 placeholder:text-body"
      required
    />

    {/* button */}
    <button
      type="button"
      className="ml-2 bg-[#9F2E2E] text-white rounded-3xl px-3 py-1.5 text-xs hover:bg-brand-strong focus:outline-none focus:ring-4 focus:ring-brand-medium"
    >
      Create
    </button>
  </div>
</form>

        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <PhotoStack/>
        
        </div>                
    </div>

    
  )
}

export default Hero2