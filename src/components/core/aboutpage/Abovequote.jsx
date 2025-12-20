


import React from 'react'
import Highlight from '../Homepage/Highlight'

const Abovequote = () => {
  return (
    <section className="bg-[#121212] py-5 md:py-10 flex items-center justify-center">
      <div className="max-w-[1200px] w-full px-4 text-center">
        <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-relaxed">
          We are passionate about revolutionizing the way we learn. Our <br className="hidden sm:block"/> 
          innovative platform{" "}
          <Highlight text="combines technology" className="text-cyan-400 font-bold" />{" "}
          <span className="text-orange-500 font-bold">expertise</span>, and community to create an{" "}
          <span className="text-yellow-400 font-bold">
            unparalleled educational experience.
          </span>
        </p>
      </div>
    </section>
  )
}

export default Abovequote
