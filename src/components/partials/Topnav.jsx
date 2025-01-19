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
      <div className="fixed w-full sm:w-[81.45vw] h-[9vh] sm:h-[13vh] flex items-center">
        <div className="flex items-center justify-center gap-3 mx-auto">
          <FiSearch className="text-[3vh] sm:text-[2.5vw] text-zinc-400" />
          <input
            onChange={(e) => setquery(e.target.value)}
            value={query}
            className="bg-transparent border-zinc-400 border-[1.5px] sm:border-[0.5px] rounded-full outline-none py-[1vh] sm:py-[1vw] px-[2vw] w-[38vh] sm:w-[45vw] placeholder:text-zinc-400 text-white sm:placeholder:text-[1.5vw]"
            type="text"
            placeholder="Search..."
          />
          <div className="absolute w-[38vh] sm:w-[45vw] ml-[37px] sm:ml-[51px] max-h-60 top-[86%] sm:top-[86%] overflow-auto">
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
        </div>

        {query.length > 0 && (
          <IoCloseOutline
            onClick={() => setquery("")}
            className="absolute hidden sm:flex sm:right-[13.5vw] text-[2.6vw] text-zinc-400"
          />
        )}
      </div>
    </div>
  );
};

export default Topnav;
