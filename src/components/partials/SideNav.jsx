import React from "react";
import { TbDeviceTvOld } from "react-icons/tb";
import { FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { IoTvOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";

function SideNav() {
  return (
    <div className="hidden sm:flex flex-col fixed top-0 w-[18vw] h-[100vh] bg-[#1D1C23] border-r-[1.5px] text-white py-[3.5vw] px-[3vw]">
      <h1 className="flex items-center gap-1">
        <TbDeviceTvOld className="text-[2.7vw] text-purple-600" />
        <span className="text-[1.8vw] font-[600]">MOVIEDB</span>
      </h1>
      <nav className="flex flex-col mt-[2.5vw]">
        <h1 className="text-[1.65vw] font-[600] text-zinc-300">New Feeds</h1>
        <Link
          to="/trending"
          className="text-[1.5vw] mt-[2vw] hover:bg-purple-600 transition-all w-[13.5vw] flex items-center gap-1 py-2 pl-[1.33vw] rounded-md"
        >
          <FaFire />
          Trending
        </Link>
        <Link
          to="/popular"
          className="text-[1.5vw] mt-[1.2vw] hover:bg-purple-600 transition-all w-[13.5vw] flex items-center gap-1 py-2 pl-[1.33vw] rounded-md"
        >
          <BsStars />
          Popular
        </Link>
        <Link
          to="/movie"
          className="text-[1.5vw] mt-[1.2vw] hover:bg-purple-600 transition-all w-[13.5vw] flex items-center gap-1 py-2 pl-[1.33vw] rounded-md"
        >
          <RiMovie2Line />
          Movies
        </Link>
        <Link
          to="/tv"
          className="text-[1.5vw] mt-[1.2vw] hover:bg-purple-600 transition-all w-[13.5vw] flex items-center gap-1 py-2 pl-[1.33vw] rounded-md"
        >
          <IoTvOutline />
          TV
        </Link>
        <Link
          to="/person"
          className="text-[1.5vw] mt-[1.2vw] hover:bg-purple-600 transition-all w-[13.5vw] flex items-center gap-1 py-2 pl-[1.33vw] rounded-md"
        >
          <IoIosPeople />
          Person
        </Link>
      </nav>
    </div>
  );
}

export default SideNav;
