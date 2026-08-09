import React, { useState, useEffect } from "react";
// import Highlight from "./Highlight";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Codeblocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codecolor,
  circlecolor,
}) => {
  const [displayedCode, setDisplayedCode] = useState("");
  // Typing speed aur cycle time aapki demand ke mutabik set kiya gaya hai
  const typingSpeed = 20; // Type hone ki speed (20ms per character)
  const deleteWaitTime = 3000; // 3 seconds wait
  const lineNumberCount = 11;

  // 💡 CUSTOM TYPING AND RESET LOGIC
  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    const fullText = codeblock;

    const type = () => {
      if (!isDeleting && index <= fullText.length) {
        // Typing mode: Character add karo
        setDisplayedCode(fullText.substring(0, index));
        index++;
        if (index > fullText.length) {
          isDeleting = true;
          // Typing complete, 3 second wait
          setTimeout(() => type(), deleteWaitTime);
          return;
        }
        setTimeout(type, typingSpeed);
      } else if (isDeleting && index >= 0) {
        // Deleting mode: Character hatao (faster speed for deletion)
        setDisplayedCode(fullText.substring(0, index));
        index--;
        if (index < 0) {
          isDeleting = false;
          index = 0;
          // Deletion complete, wapas type karna shuru karo
          setTimeout(type, 50);
          return;
        }
        setTimeout(type, typingSpeed / 2);
      } else {
        // Reset for the next cycle
        isDeleting = false;
        index = 0;
        setTimeout(type, 50);
      }
    };

    // Component load hone par shuru karo
    const startId = setTimeout(type, 500);

    return () => clearTimeout(startId);
  }, [codeblock]);

  return (
    <div
      className={`flex flex-col md:flex-row ${position} my-6 md:my-28 justify-between gap-10 md:gap-20 w-full max-w-[1400px] mx-auto px-2 md:px-6 items-start`}
    >
      {/* Left Section (No change) */}
      <div className="w-full md:w-[55%] flex flex-col gap-6 md:gap-8">
        {heading}
        <div className="font-bold text-[#6e7983] whitespace-pre-line text-sm md:text-base">
          {subheading}
        </div>
        <div className="flex  sm:flex-row gap-4 sm:gap-7 mt-3 md:mt-5">
          <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btntext}
              <FaArrowRight />
            </div>
          </Button>
          <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
            <div className="flex gap-2 items-center">{ctabtn2.btntext}</div>
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[45%] flex justify-center relative ">
        {/* Gradient Circle Background */}
        <div
          // className={`absolute -top-30 left-1/2 -translate-x-1/2 w-30 sm:w-64 h-30 sm:h-64 rounded-full ${circlecolor} blur-3xl opacity-20 z-0`}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full ${circlecolor} blur-3xl opacity-40 z-[20] pointer-events-none`}
        ></div>

        {/* Code Block Container - Styling for dark background/border */}
        <div className="w-full max-w-[480px] min-h-[250px] md:min-h-[300px] bg-[#121212] border-[1px] border-[#434b5c] rounded-lg shadow-md overflow-hidden p-2 md:p-6 sm:p-8 relative z-10">
          <div className="flex">
            {/* Line Numbers */}
            <div className="text-center text-[#6e7983] font-mono text-sm md:text-base">
              {Array.from({ length: lineNumberCount }, (_, i) => (
                <p key={i}>{i + 1}</p>
              ))}
            </div>

            {/* Code Block - Syntax Highlighter is used for COLOURS */}
            <div
              className={`flex-1 font-mono text-sm md:text-base overflow-hidden`}
            >
              <SyntaxHighlighter
                language="jsx" // Aapka code React/JSX hai
                style={dracula} // Dracula theme for VS Code like colours
                showLineNumbers={false}
                customStyle={{
                  padding: "0 1rem 0 1rem",
                  margin: 0,
                  background: "none",
                  fontSize: "inherit",
                  whiteSpace: "pre-wrap", // Scrollbar fix
                }}
              >
                {/* 💡 Displayed code is the one being typed */}
                {displayedCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Codeblocks;
