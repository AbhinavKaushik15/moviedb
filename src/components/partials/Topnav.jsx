import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
import { IoIosMenu } from "react-icons/io";
import { easeInOut, motion } from "motion/react";
import { useContext } from "react";
import { contextMenu } from "../../App";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const [isOpen, setisOpen] = useContext(contextMenu);

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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeInOut }}
          className="fixed text-zinc-400 top-[2vh] left-1 flex sm:hidden items-center"
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 1 }}
            onClick={() => setisOpen(!isOpen)}
            className="text-sm flex items-center"
          >
            <IoIosMenu className="text-[5vh] hover:rotate-90 transition-all" />
          </motion.button>
        </motion.div>

        <div className="flex items-center justify-center gap-3 mx-auto">
          <FiSearch className="hidden sm:flex text-[3vh] sm:text-[2.5vw] text-zinc-400" />
          <input
            onChange={(e) => setquery(e.target.value)}
            value={query}
            className="bg-transparent border-zinc-400 border-[1.5px] sm:border-[0.5px] rounded-full ml-5 sm:ml-0 outline-none py-[1.1vh] sm:py-[1vw] px-[2vw] w-[38vh] sm:w-[45vw] placeholder:text-zinc-400 text-white sm:placeholder:text-[1.5vw]"
            type="text"
            placeholder="Search..."
          />
          <div className="absolute w-[38vh] sm:w-[45vw] ml-[37px] sm:ml-[51px] max-h-60 top-[86%] sm:top-[86%] overflow-auto">
            {searches.map((s, i) => {
              return (
                <Link
                  to={`${s.media_type || s.people}/details/${s.id}`}
                  key={i}
                  className="bg-[#1d1c23e1] w-full flex text-white items-center px-2 sm:px-3 py-1 sm:py-[0.5vw] border-zinc-500 hover:bg-zinc-500 hover:rounded-md gap-3"
                >
                  <img
                    className="w-[50px] sm:w-[4.5vw] h-[50px] sm:h-[4.5vw] object-cover shadow-lg rounded-md lg:rounded-lg"
                    src={
                      s.backdrop_path || s.profile_path
                        ? `https://image.tmdb.org/t/p/original/${
                            s.backdrop_path || s.profile_path
                          }`
                        : noimage
                    }
                    alt=""
                  />
                  <h1 className="text-md sm:text-[1.5vw] font-[500]">
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
