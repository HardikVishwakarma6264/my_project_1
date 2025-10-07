// import React from 'react'
// import Highlight from "../Homepage/Highlight"
// import Button from "../Homepage/Button";

// const LearningGridArray = [
//   {
//     order: -1,
//     heading: "World-Class Learning for",
//     highlightText: "Anyone, Anywhere",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
//     BtnText: "Learn More",
//     BtnLink: "/",
//   },
//   {
//     order: 1,
//     heading: "Curriculum Based on Industry Needs",
//     description:
//       "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
//   },
//   {
//     order: 2,
//     heading: "Our Learning Methods",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
//   {
//     order: 3,
//     heading: "Certification",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
//   {
//     order: 4,
//     heading: "Rating ‘Auto-Grading’",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
//   {
//     order: 5,
//     heading: "Ready to Work",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
// ];

// const Aboutgrid = () => {
//   return (
//     <div className='h-[700px] mt-[150px] w-[1400px] items-center justify-center ml-[300px]'>
//     <div className='grid  grid-col-1 lg:grid-cols-4 mb-1 mt-3'>
//       {
//         LearningGridArray.map((card,index)=>{
//           return(
//             <div
//              key={index}
//   className={`
//     ${index === 0 && "lg:col-span-2 h-[300px] w-[560px]"}
//     ${card.order < 0 ? "bg-transparent" : card.order % 2 === 1 ? "bg-[#2d3036]" : "bg-[#1c1d1f]"}
//     ${card.order === 3 && "lg:col-start-2"}
//     h-[300px]
//   `}
//             >
//               {
//                 card.order<0 ? (<div>
//                   <div className='font-bold text-[35px]'>
//                     {card.heading}<br/>
//                     <Highlight text={card.highlightText}/>

//                     </div>
//                     <p className='text-[18px] mt-4'>
//                       {card.description}
//                     </p>
//                     <div className='mt-8 w-fit'>
//                       <Button active={true} linkto={card.BtnLink}>
//                         {card.BtnText}
//                         </Button>
//                       </div>
//                   </div>
//                   ):(
//                     <div>
//                       <h1 className='m-5 text-[23px] font-bold'>
//                         {card.heading}
//                       </h1>
//                       <p className='m-5 mt-11 text-[17px]'>
//                         {card.description}
//                       </p>
//                     </div>
//                   )

//               }
//            </div>
//           )
//         })
//       }
//     </div>
//     </div>
//   )
// }

// export default Aboutgrid

import React from 'react'
import Highlight from "../Homepage/Highlight"
import Button from "../Homepage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: "Rating ‘Auto-Grading’",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const Aboutgrid = () => {
  return (
    <div className="max-w-[1400px] mx-auto mt-[80px] px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 ">
        {LearningGridArray.map((card, index) => {
          return (
            <div
              key={index}
              className={`
                ${
                  index === 0 &&
                  "lg:col-span-2 h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] w-full sm:w-[90%] md:w-[560px]"
                }
                ${
                  card.order < 0
                    ? "bg-transparent"
                    : card.order % 2 === 1
                    ? "bg-[#2d3036]"
                    : "bg-[#1c1d1f]"
                }
                ${card.order === 3 && "lg:col-start-2"}
                h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] 
                w-full
              `}
            >
              {card.order < 0 ? (
                <div>
                  <div className="font-bold text-[22px] sm:text-[28px] md:text-[32px] lg:text-[35px]">
                    {card.heading}
                    <br />
                    <Highlight text={card.highlightText} />
                  </div>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] mt-4">
                    {card.description}
                  </p>
                  <div className="mt-6 sm:mt-8 w-fit">
                    <Button active={true} linkto={card.BtnLink}>
                      {card.BtnText}
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="m-3 sm:m-5 text-[18px] sm:text-[20px] md:text-[23px] font-bold">
                    {card.heading}
                  </h1>
                  <p className="m-3 sm:m-5 mt-6 sm:mt-11 text-[14px] sm:text-[16px] md:text-[17px]">
                    {card.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Aboutgrid;





// import React from 'react'
// import Highlight from "../Homepage/Highlight"
// import Button from "../Homepage/Button";

// const LearningGridArray = [
//   {
//     order: -1,
//     heading: "World-Class Learning for",
//     highlightText: "Anyone, Anywhere",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
//     BtnText: "Learn More",
//     BtnLink: "/",
//   },
//   {
//     order: 1,
//     heading: "Curriculum Based on Industry Needs",
//     description:
//       "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
//   },
//   {
//     order: 2,
//     heading: "Our Learning Methods",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
//   {
//     order: 3,
//     heading: "Certification",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
//   {
//     order: 4,
//     heading: "Rating ‘Auto-Grading’",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
//   {
//     order: 5,
//     heading: "Ready to Work",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
// ];

// const Aboutgrid = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 mt-20">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {LearningGridArray.map((card, index) => {
//           return (
//             <div
//               key={index}
//               className={`
//                 ${index === 0 && "lg:col-span-2"}
//                 ${card.order < 0
//                   ? "bg-transparent"
//                   : card.order % 2 === 1
//                   ? "bg-[#2d3036]"
//                   : "bg-[#1c1d1f]"}
//                 ${card.order === 3 && "lg:col-start-2"}
//                 rounded-xl p-6 h-auto min-h-[220px] flex flex-col justify-center
//               `}
//             >
//               {card.order < 0 ? (
//                 <div>
//                   <div className="font-bold text-2xl sm:text-3xl md:text-[35px] leading-snug text-white">
//                     {card.heading} <br />
//                     <Highlight text={card.highlightText} />
//                   </div>
//                   <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-4">
//                     {card.description}
//                   </p>
//                   <div className="mt-6 w-fit">
//                     <Button active={true} linkto={card.BtnLink}>
//                       {card.BtnText}
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <div>
//                   <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">
//                     {card.heading}
//                   </h1>
//                   <p className="text-sm sm:text-base md:text-lg text-gray-300">
//                     {card.description}
//                   </p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   )
// }

// export default Aboutgrid
