// import React from 'react'

// const Highlight = ({text}) => {
//   return (
//     <span className='font-bold text-blue-500'>
//       {" "}
//       {text}
//       {" "}
//     </span>
//   )
// }

// export default Highlight

import React from "react";

const Highlight = ({ text }) => {
  return (
    <span
      className="
        font-bold 
        bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
        text-transparent bg-clip-text
      "
    >
      {" "}
      {text}
    </span>
  );
};

export default Highlight;
