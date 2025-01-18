import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "../utils/axios";
import Dropdown from "./partials/Dropdown";
import Card from "./partials/Card";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
  document.title = "MOVIEDB | Movie ";
  const navigate = useNavigate();

  const [category, setcategory] = useState("top_rated");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setmovie((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setpage(1);
      setmovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-full min-h-screen bg-[#1D1C23] px-[3.5vw]">
      <div className="w-full flex items-center justify-between pb-[3vh] sm:pb-[2vw]">
        <div className="text-zinc-400 w-fit font-bold pt-5 flex items-center gap-2">
          <IoMdArrowRoundBack
            onClick={() => navigate(-1)}
            className="hover:text-purple-600 text-[3vh] sm:text-[2vw]"
          />
          <h1 className="text-[3vh] sm:text-[2vw]">Movie</h1>
          <sub className="text-[1.6vh] xl:text-[1.1vw]">({category})</sub>
        </div>

        <div className="flex gap-[4vw]">
          <Dropdown
            title="Category"
            options={["upcoming", "top_rated", "popular", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Card data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
