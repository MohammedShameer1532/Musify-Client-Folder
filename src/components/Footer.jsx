import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoLogoGithub } from "react-icons/io";
import profile from '../assets/profile-image.jpg'
import { CurrentSongContext } from "./contextProvider/CurrentSongContext";
import { useContext } from "react";


const Footer = () => {
  const { currentSong } = useContext(CurrentSongContext);
  return (
    <div>
      {
        currentSong ? (
          <div className="w-full bg-gray-900 text-white p-6 mb-[16rem] md:mb-[12rem] lg:mb-[10rem] mt-[-2.5rem] rounded-md">
            <div className="text-center font-semibold">
              {/* Logo and Title */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="flex items-center gap-3 ml-0 md:ml-2  mt-0 ">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-8 h-8 md:w-12 md:h-12 border-2 border-gray-500 rounded-full"
                  />
                  <span className="text-base md:text-xl font-bold text-white">Musify</span>
                </div>
                <div className="text-base md:text-lg font-medium p-2">
                  Designed & Developed by Mohammed Shameer
                </div>
                {/* Social Media Icons */}
                <div className="flex gap-6 p-2">
                  <a
                    href="https://www.instagram.com/mshameer260/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <FaInstagram className="text-gradient bg-gradient-to-tr from-pink-500 to-purple-500 w-7 h-7 rounded-md" />
                  </a>
                  <a
                    href="https://x.com/mshameer260"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <FaSquareXTwitter className="text-blue-500 w-7 h-7" />
                  </a>
                  <a
                    href="https://www.facebook.com/a.mdshameer.a.mdshameer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <FaFacebook className="text-blue-600 w-7 h-7" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mohammed-shameer-a-60454623b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <FaLinkedin className="text-[#0A66C2] w-7 h-7" />
                  </a>
                  <a
                    href="https://github.com/MohammedShameer1532"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300 text-black bg-white rounded-sm hover:text-gray-600"
                  >
                    <IoLogoGithub className="w-7 h-7" />
                  </a>
                </div>
              </div>
              <hr className="my-4 border-gray-700" />
              {/* Contact Me Section */}
              <div className="flex justify-center items-center mb-6 gap-2">
                <a
                  href="mailto:mshameer260@gmail.com?subject=Hello%20Shameer&body=I%20would%20like%20to%20connect%20with%20you."
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  <MdMarkEmailUnread className="w-6 h-6" />
                  Contact Me
                </a>
              </div>

              {/* Footer Text */}
              <footer className="text-sm">
                <span>© 2024 Mohammed Shameer. Licensed under the MIT License.</span>
                <br />
                <span>Uses data provided by the JioSaavn API
                  <a
                    href="https://jiosavan-api-with-playlist.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 ml-1"
                  >
                    Learn more.
                  </a>
                </span>
              </footer>
            </div>
          </div>
        ) : (
          <div className="w-full bg-gray-900 text-white p-6 mb-[4rem] mt-[-2rem] rounded-md">
            <div className="text-center font-semibold">
              {/* Logo and Title */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="flex items-center gap-3 ml-0 md:ml-2  mt-0 ">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-8 h-8 md:w-12 md:h-12 border-2 border-gray-500 rounded-full"
                  />
                  <span className="text-base md:text-xl font-bold text-white">Musify</span>
                </div>
                <div className="text-base md:text-lg font-medium p-2 line-clamp-3">
                  Designed & Developed by Mohammed Shameer
                </div>
                {/* Social Media Icons */}
                <div className="flex gap-6 p-2">
                  <a
                    href="https://www.instagram.com/mshameer260/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <FaInstagram className="text-gradient bg-gradient-to-tr from-pink-500 to-purple-500 w-7 h-7 rounded-md" />
                  </a>
                  <a
                    href="https://x.com/mshameer260"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <FaSquareXTwitter className="text-blue-500 w-7 h-7" />
                  </a>
                  <a
                    href="https://www.facebook.com/a.mdshameer.a.mdshameer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <FaFacebook className="text-blue-600 w-7 h-7" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mohammed-shameer-a-60454623b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <FaLinkedin className="text-[#0A66C2] w-7 h-7" />
                  </a>
                  <a
                    href="https://github.com/MohammedShameer1532"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300 text-black bg-white rounded-sm hover:text-gray-600"
                  >
                    <IoLogoGithub className="w-7 h-7" />
                  </a>
                </div>
              </div>
              <hr className="my-4 border-gray-700" />
              {/* Contact Me Section */}
              <div className="flex justify-center items-center mb-6 gap-2">
                <a
                  href="mailto:mshameer260@gmail.com?subject=Hello%20Shameer&body=I%20would%20like%20to%20connect%20with%20you."
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  <MdMarkEmailUnread className="w-6 h-6" />
                  Contact Me
                </a>
              </div>

              {/* Footer Text */}
              <footer className="text-sm">
                <span>© 2024 Mohammed Shameer. Licensed under the MIT License.</span>
                <br />
                <span>Uses data provided by the JioSaavn API
                  <a
                    href="https://jiosavan-api-with-playlist.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 ml-1"
                  >
                    Learn more.
                  </a>
                </span>
              </footer>
            </div>
          </div>
        )}
    </div>
  );
};

export default Footer;
