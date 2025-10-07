// import React from 'react';

// const Stats = [
//   { count: '0K+', label: 'Active Students' },
//   { count: '0+', label: 'Mentors' },
//   { count: '0+', label: 'Courses' },
//   { count: '0+', label: 'Awards' },
// ];

// const Aboutstate = () => {
//   return (
//     <section className="bg-[#464a51] py-10">
//       <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//         {Stats.map((data, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <h1 className="text-3xl font-bold text-white">{data.count}</h1>
//             <h2 className="text-lg text-white mt-2">{data.label}</h2>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Aboutstate;

import React from 'react';

const Stats = [
  { count: '0K+', label: 'Active Students' },
  { count: '0+', label: 'Mentors' },
  { count: '0+', label: 'Courses' },
  { count: '0+', label: 'Awards' },
];

const Aboutstate = () => {
  return (
    <section className="bg-[#464a51] py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-11 text-center px-4">
        {Stats.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-[#565a61] rounded-xl py-6 shadow-lg hover:scale-105 transition-transform"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              {data.count}
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg text-gray-200 mt-2">
              {data.label}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Aboutstate;
