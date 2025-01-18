import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdAlbum } from "react-icons/md";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[55vh] sm:h-[65vh] p-10 flex flex-col justify-end gap-[2vh] sm:gap-[1vw]"
    >
      <h1 className="text-white font-bold whitespace-nowrap text-[3.7vh] sm:text-[3.2vw] w-3/5">
        {data.title || data.original_title || data.name || data.original_name}
      </h1>
      <p className="text-zinc-300 text-[2vh] sm:text-[1.4vw] leading-[1.2] w-[95%] sm:w-[45vw]">
        {data.overview.slice(0, 180)}...
        <Link
          to={`${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <div className="flex gap-[2.8vw]">
        <p className="text-white text-[2.2vh] sm:text-[1.2vw] flex items-center gap-2 justify-center">
          <HiOutlineSpeakerphone className="text-yellow-500" />
          {data.release_date || "Coming soon"}
        </p>

        <p className="text-white text-[2.2vh] sm:text-[1.2vw] flex items-center justify-center gap-2">
          <MdAlbum className="text-yellow-500" />
          {data.media_type.toUpperCase()}
        </p>
      </div>

      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="bg-purple-600 hover:bg-white duration-300 w-fit py-[0.55vh] sm:py-[0.4vw] px-[1vh] sm:px-[0.8vw] text-[2.2vh] sm:text-[1.3vw] rounded-sm sm:rounded-md text-white hover:text-purple-600"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
