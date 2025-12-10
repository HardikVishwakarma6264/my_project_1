

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-richblack-900 text-white px-6 sm:px-10 py-10 mt-[100px]">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-10 border-b border-richblack-700">
          
          {/* Logo & Company */}
          <div>
            <h2 className="text-white text-lg sm:text-xl font-bold">HardikNotion</h2>
            <p className="mt-2 text-sm">Company</p>
            <ul className="mt-4 space-y-2 text-[#6e7983] text-sm">
              <li className="hover-effect">About</li>
              <li className="hover-effect">Careers</li>
              <li className="hover-effect">Affiliates</li>
            </ul>
            <div className="flex gap-4 mt-4 text-lg text-[#6e7983] cursor-pointer">
              <FaFacebookF className="hover-effect" />
              <FaTwitter className="hover-effect" />
              <FaInstagram className="hover-effect" />
              <FaLinkedinIn className="hover-effect" />
              <FaYoutube className="hover-effect" />
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-[#6e7983] text-sm">
              <li className="hover-effect">Articles</li>
              <li className="hover-effect">Blog</li>
              <li className="hover-effect">Cheat Sheet</li>
              <li className="hover-effect">Code challenges</li>
              <li className="hover-effect">Docs</li>
              <li className="hover-effect">Projects</li>
              <li className="hover-effect">Videos</li>
              <li className="hover-effect">Workspaces</li>
            </ul>
          </div>

          {/* Plans */}
          <div>
            <h3 className="text-white font-semibold">Plans</h3>
            <ul className="mt-4 space-y-2 text-[#6e7983] text-sm">
              <li className="hover-effect">Paid memberships</li>
              <li className="hover-effect">For students</li>
              <li className="hover-effect">Business solutions</li>
            </ul>
            <h3 className="text-white font-semibold mt-6">Community</h3>
            <ul className="mt-4 space-y-2 text-[#6e7983] text-sm">
              <li className="hover-effect">Forums</li>
              <li className="hover-effect">Chapters</li>
              <li className="hover-effect">Events</li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-white font-semibold">Subjects</h3>
            <ul className="mt-4 space-y-2 text-[#6e7983] text-sm">
              <li className="hover-effect">AI</li>
              <li className="hover-effect">Cloud Computing</li>
              <li className="hover-effect">Code Foundations</li>
              <li className="hover-effect">Computer Science</li>
              <li className="hover-effect">Cybersecurity</li>
              <li className="hover-effect">Data Analytics</li>
              <li className="hover-effect">Data Science</li>
              <li className="hover-effect">Data Visualization</li>
              <li className="hover-effect">Developer Tools</li>
              <li className="hover-effect">DevOps</li>
              <li className="hover-effect">Game Development</li>
              <li className="hover-effect">IT</li>
              <li className="hover-effect">Machine Learning</li>
              <li className="hover-effect">Math</li>
              <li className="hover-effect">Mobile Development</li>
              <li className="hover-effect">Web Design</li>
              <li className="hover-effect">Web Development</li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-white font-semibold">Languages</h3>
            <ul className="mt-4 space-y-2 text-[#6e7983] text-sm">
              <li className="hover-effect">Bash</li>
              <li className="hover-effect">C++</li>
              <li className="hover-effect">C#</li>
              <li className="hover-effect">Go</li>
              <li className="hover-effect">HTML & CSS</li>
              <li className="hover-effect">Java</li>
              <li className="hover-effect">JavaScript</li>
              <li className="hover-effect">Kotlin</li>
              <li className="hover-effect">PHP</li>
              <li className="hover-effect">Python</li>
              <li className="hover-effect">R</li>
              <li className="hover-effect">Ruby</li>
              <li className="hover-effect">SQL</li>
              <li className="hover-effect">Swift</li>
            </ul>
          </div>

          {/* Career Building */}
          <div>
            <h3 className="text-white font-semibold">Career building</h3>
            <ul className="mt-4 space-y-2 text-[#6e7983] text-sm">
              <li className="hover-effect">Career paths</li>
              <li className="hover-effect">Career services</li>
              <li className="hover-effect">Interview prep</li>
              <li className="hover-effect">Professional certs</li>
              <li className="hover-effect">Full Catalog</li>
              <li className="hover-effect">Beta Content</li>
            </ul>
          </div>
        </div>

        

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-xs sm:text-sm text-richblack-400 gap-4">
          <div className="flex gap-4 sm:gap-6 text-[#6e7983]">
            <span className="hover-effect">Privacy Policy</span>
            <span className="hover-effect">Cookie Policy</span>
            <span className="hover-effect">Terms</span>
          </div>
          <p className="text-[#6e7983] text-center">
            Made with ❤️ CodeHelp © 2025 HardikNotion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

