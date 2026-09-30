import React from "react";
// import Highlight from "../components/core/Homepage/Highlight";
import abo_1 from "../images/abo_1.jpg";
import abo_2 from "../images/abo_2.jpg";
import abo_3 from "../images/abo_3.jpg";
import Abovequote from "../components/core/aboutpage/Abovequote";
import abo_4 from "../images/abo_4.jpg";
import Aboutstate from "../components/core/aboutpage/Aboutstate";
import Aboutgrid from "../components/core/aboutpage/Aboutgrid";
import Contactfrom from "../components/core/contactpage/Contactform";
import Footer from "../components/core/Homepage/Footer";
import ReviewSliderdo from "./slider/ReviewSliderdo";



const About = () => {
  return (
    <div className="text-white bg-[#121212] items-center justify-between">
      
     

<section className="relative">
  {/* Backgrounds */}
  <div className="absolute inset-0">
    {/* Top Half - Dark */}
    <div className="absolute top-0 left-0 w-full h-[70%] bg-[#2d3036]" />
    {/* Bottom Half - White */}
    <div className="absolute bottom-0 left-0 w-full h-[30%] bg-[#121212]" />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-[1200px] mx-auto text-center px-4 md:py-16 py-4">
    <header className="md:mb-10 mb-5">
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
        Driving Innovation in Online Education for a
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mt-2">
        Brighter Future
      </h2>
      <p className="text-gray-300 mt-4 max-w-[800px] mx-auto text-sm sm:text-base md:text-lg">
        FutureNotion is at the forefront of driving innovation in online
        education. We're passionate about creating a brighter future by
        offering cutting-edge courses, leveraging emerging technologies.
      </p>
    </header>

    {/* Images */}
    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
      <img
        src={abo_1}
        alt="About 1"
        className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] 
                   h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] 
                   object-cover rounded-lg shadow-lg"
      />
      <img
        src={abo_2}
        alt="About 2"
        className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] 
                   h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] 
                   object-cover rounded-lg shadow-lg"
      />
      <img
        src={abo_3}
        alt="About 3"
        className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] 
                   h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] 
                   object-cover rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>

 {/* section_2 */}

      <section>
        <div>
          <Abovequote />
        </div>
      </section>

      {/* section_3 */}

     <section>
  <div className="flex flex-col">
    {/* First Part */}
    <div className="flex flex-col md:flex-row items-center justify-center bg-[#121212] px-6 md:px-10 md:py-12 gap-10 md:gap-20 mt-10">
      {/* Left Part */}
      <div className="max-w-[650px] text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-6">
          Our Founding Story
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-4">
          Our e-learning platform was born out of a shared vision and passion
          for transforming education. It all began with a group of educators,
          technologists, and lifelong learners who recognized the need for
          accessible, flexible, and high-quality learning opportunities in a
          rapidly evolving digital world.
        </p>
        <p className="text-gray-300 text-base sm:text-lg">
          As experienced educators ourselves, we witnessed firsthand the
          limitations and challenges of traditional education systems. We
          believed that education should not be confined to the walls of a
          classroom or restricted by geographical boundaries. We envisioned a
          platform that could bridge these gaps and empower individuals from all
          walks of life to unlock their full potential.
        </p>
      </div>

      {/* Right Part */}
      <div className="w-full sm:w-[400px] md:w-[500px] h-[220px] sm:h-[260px] md:h-[300px] flex justify-center items-center mt-2 md:mt-0">
        <img
          src={abo_4}
          alt="Founding Story"
          className="w-full h-full object-cover rounded-2xl border-[4px] border-red-500 shadow-[0_15px_40px_rgba(255,105,180,0.5)]"
        />
      </div>
    </div>

    {/* Second Part */}
    <div className="bg-[#121212] text-white md:py-12 py-6 px-6 md:px-10 flex items-center">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 w-full max-w-[1200px]">
        {/* Left Div */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-orange-500">
            Our Vision
          </h1>
          <p className="text-gray-300 leading-7 text-base sm:text-lg">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>

        {/* Right Div */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-teal-400">
            Our Mission
          </h1>
          <p className="text-gray-300 leading-7 text-base sm:text-lg">
            Our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* section_4 */}

      <section>
      <Aboutstate/>   
      </section>

      {/* section_5 */}
      <section>
        <Aboutgrid/>
        
      </section>

      {/* section_6 */}
      <section>
        <Contactfrom/>
      </section>

      {/* section_7 */}
      {/* section_7 */}
<section className="mt-[50px] font-bold">
  <h2 className="text-center text-3xl md:text-4xl mb-6">
    Reviews from other learners
  </h2>

  {/* Swiper ko apna container chahiye fixed height ke bina */}
  <div className="max-w-[1400px] mx-auto px-4">
    <ReviewSliderdo />
  </div>
</section>


      {/* section_8 */}
      <section>
        <Footer/>
      </section>


    </div>
  );
};

export default About;
