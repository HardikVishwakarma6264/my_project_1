import React from 'react'
import img_6 from "../../../images/img_6.png";
import Highlight from './Highlight';
import Button from './Button';


const Learninglanguagesection = () => {
  return (
    <div className="mt-[130px] mb-32">
  <div className="flex flex-col gap-5 items-center">
    
    {/* Heading */}
    <div className="text-5xl font-semibold text-center">
      Your Swiss Knife for{" "}
      <Highlight text={"learning any language"} />
    </div>

    {/* Subtext */}
    <div className="text-center text-[#464a4e] mx-auto text-base font-medium w-[70%]">
      Using spin making learning multiple languages easy, with 20+ languages
      realistic voice-over, progress tracking, custom schedule and more.
    </div>

    {/* Image */}
    <div className="flex flex-row items-center justify-center mt-5">
      <img
        src={img_6} 
        alt="Language Learning"
        className="w-[1200px] h-auto object-contain"
      />
    </div>

    <div className='w-fit ali' >
      <Button active={true} linkto={"/signup"}>
       <div>
          Learn more
       </div>
      </Button>
    </div>
    
  </div>
</div>

  )
}

export default Learninglanguagesection


