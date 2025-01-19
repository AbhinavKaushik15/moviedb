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
      <div className="fixed w-full h-[15vh] flex items-center gap-5">
        <FiSearch className="text-[2vw] ml-[15vw] text-zinc-400" />
        <div className="flex">
          <input
            onChange={(e) => setquery(e.target.value)}
            value={query}
            className="bg-transparent border-zinc-400 border-[0.5px] rounded-full outline-none py-[1vw] px-[2vw] w-[45vw] placeholder:text-zinc-400 text-white placeholder:text-[1.5vw]"
            type="text"
            placeholder="Search..."
          />
          <div className="absolute w-[45vw] max-h-60 top-[80%] overflow-auto">
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
            className="text-[2.6vw] text-zinc-400"
          />
        )}
      </div>
    </div>
  );
};

export default Topnav;
