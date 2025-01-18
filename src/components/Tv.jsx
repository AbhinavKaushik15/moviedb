import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "../utils/axios";
import Dropdown from "./partials/Dropdown";
import Card from "./partials/Card";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Tv = () => {
  document.title = "MOVIEDB || TV  ";
  const navigate = useNavigate();

  const [category, setcategory] = useState("top_rated");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getTv = async () => {
    try {
      const { data } = await axios.get(`tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settv((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setpage(1);
      settv([]);
      getTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-full min-h-screen bg-[#1D1C23] px-[3.5vw]">
      <div className="w-full flex items-center justify-between pb-[3vh] sm:pb-[2vw]">
        <div className="text-zinc-400 w-fit font-bold pt-5 flex items-center gap-2">
          <IoMdArrowRoundBack
            onClick={() => navigate(-1)}
            className="hover:text-purple-600 text-[3vh] sm:text-[2vw]"
          />
          <h1 className="text-[3vh] sm:text-[2vw]">TV</h1>
          <sub className="text-[1.6vh] xl:text-[1.1vw]">({category})</sub>
        </div>

        <div className="flex gap-[4vw]">
          <Dropdown
            title="Category"
            options={["airing_today", "on_the_air", "popular", "top_rated"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={getTv}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Card data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tv;
