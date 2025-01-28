import React, { useContext, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { contextMenu } from "../../App";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { Link } from "react-router-dom";
import { TbDeviceTvOld } from "react-icons/tb";
import { FaFire } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { IoTvOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";

function Menu() {
  const menuOpen = useRef(null);

  const [isOpen, setisOpen] = useContext(contextMenu);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuOpen.current, {
        left: 0,
        ease: [0.22, 1, 0.36, 1],
      });
    } else {
      gsap.to(menuOpen.current, {
        left: "-150%",
        ease: [0.22, 1, 0.36, 1],
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuOpen}
      className="fixed left-[-150%] z-[999] w-[50%] h-screen bg-[#0D0E13] mx-auto flex sm:hidden items-center justify-between py-5 sm:py-[3.5%] px-7 sm:px-[3.5%]"
    >
      <div className="right relative h-[91vh] w-full sm:w-[37.7vw]">
        <div className="close flex sm:absolute sm:top-0 sm:right-0 text-white items-center justify-between">
          <button
            onClick={() => setisOpen(!isOpen)}
            className="absolute text-lg right-0 flex items-center justify-center"
          >
            {isOpen === false ? "Menu" : "Close"}
            <IoCloseOutline
              className={`text-3xl text-[#dadada] font-[100] ${
                isOpen && "hover:rotate-90"
              } transition-all`}
            />
          </button>
        </div>

        <nav className="flex flex-col mt-[14vw] text-white">
          <h1 className="text-[6.5vw] font-[600] text-zinc-300">New Feeds</h1>
          <Link
            to="/trending"
            className="text-[5vw] mt-[2vw] hover:bg-purple-600 transition-all w-[35vw] flex items-center gap-1 py-2 pl-[1.33vw] rounded-md"
          >
            <FaFire className="text-[4vw] mr-[0.6vw]" />
            Trending
          </Link>
          <Link
            to="/popular"
            className="text-[5vw] mt-[2vw] hover:bg-purple-600 transition-all w-[35vw] flex items-center gap-1 py-2 pl-[1.33vw] rounded-md"
          >
            <BsStars className="text-[4vw] mr-[0.6vw]" />
            Popular
          </Link>
          <Link
            to="/movie"
            className="text-[5vw] mt-[2vw] hover:bg-purple-600 transition-all w-[35vw] flex items-center gap-1 py-2 pl-[1.33vw] rounded-md"
          >
            <RiMovie2Line className="text-[4vw] mr-[0.6vw]" />
            Movies
          </Link>
          <Link
            to="/tv"
            className="text-[5vw] mt-[2vw] hover:bg-purple-600 transition-all w-[35vw] flex items-center gap-1 py-2 pl-[1.33vw] rounded-md"
          >
            <IoTvOutline className="text-[4vw] mr-[0.6vw]" />
            TV
          </Link>
          <Link
            to="/person"
            className="text-[5vw] mt-[2vw] hover:bg-purple-600 transition-all w-[35vw] flex items-center gap-1 py-2 pl-[1.33vw] rounded-md"
          >
            <IoIosPeople className="text-[4vw] mr-[0.6vw]" />
            Person
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Menu;
