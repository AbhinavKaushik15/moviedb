import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-full">
      <div className="fixed w-full sm:w-[81.45vw] h-[9vh] sm:h-[15vh] flex items-center gap-[1.8vh] sm:gap-5">
        <div className="flex items-center justify-center mx-auto gap-2">
          <FiSearch className="text-[4.3vh] sm:text-[2vw] text-zinc-400" />
          <input
            onChange={(e) => setquery(e.target.value)}
            value={query}
            className="bg-transparent border-zinc-400 border-[0.5px] rounded-full outline-none py-[1vh] sm:py-[1vw] px-[1.5vh] sm:px-[2vw] w-[60vh] sm:w-[45vw] placeholder:text-zinc-400 text-white sm:placeholder:text-[1.5vw]"
            type="text"
            placeholder="Search..."
          />
          <div className="absolute w-[60vh] sm:w-[45vw] max-h-60 top-[88%] sm:top-[80%] overflow-auto">
            {searches.map((s, i) => {
              return (
                <Link
                  to={`${s.media_type || s.people}/details/${s.id}`}
                  key={i}
                  className="bg-white w-full flex items-center pl-5 py-3 border-[1px] border-zinc-500 hover:bg-zinc-300 gap-3"
                >
                  <img
                    className="w-14 h-14 object-cover shadow-lg rounded-lg"
                    src={
                      s.backdrop_path || s.profile_path
                        ? `https://image.tmdb.org/t/p/original/${
                            s.backdrop_path || s.profile_path
                          }`
                        : noimage
                    }
                    alt=""
                  />
                  <h1 className="text-xl">
                    {s.title || s.original_title || s.name || s.original_name}
                  </h1>
                </Link>
              );
            })}
          </div>

          {query.length > 0 && (
            <IoCloseOutline
              onClick={() => setquery("")}
              className="ml-1 text-[6vh] sm:text-[2.6vw] text-zinc-400"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Topnav;
