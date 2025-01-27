import React, { useEffect, useState } from "react";
import SideNav from "./partials/SideNav";
import Topnav from "./partials/Topnav";
import Header from "./partials/Header";
import axios from "../utils/axios";
import TrendingHorizontal from "./partials/TrendingHorizontal";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";
import Menu from "./partials/Menu";

const Home = () => {
  document.title = "MOVIEDB || Home Page";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex">
      <Menu />
      <SideNav />
      <div className="absolute right-0 top-0 w-[100vw] sm:w-[81.45vw] min-h-full bg-[#1D1C23]">
        <Topnav />
        <Header data={wallpaper} />
        <div className="w-full h-[7vh] flex items-center justify-between px-[2.5vh] sm:px-[1.15vw]">
          <h1 className="text-[3.2vh] sm:text-[2vw] font-black py-1 text-white">
            Trending
          </h1>

          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <TrendingHorizontal data={trending} />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
