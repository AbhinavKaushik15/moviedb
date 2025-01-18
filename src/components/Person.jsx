import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "../utils/axios";
import Card from "./partials/Card";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Person = () => {
  document.title = "MOVIEDB || Person ";
  const navigate = useNavigate();

  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getPerson = async () => {
    try {
      const { data } = await axios.get(`person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setperson((prev) => [...prev, ...data.results]);
        setpage(page + 1);
        console.log(data.results);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      getPerson();
    } else {
      setpage(1);
      setperson([]);
      getPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-full min-h-screen bg-[#1D1C23] px-[3.5vw]">
      <div className="w-full flex items-center justify-between pb-[3vh] sm:pb-[2vw]">
        <div className="text-zinc-400 w-fit font-bold pt-5 flex items-center gap-2">
          <IoMdArrowRoundBack
            onClick={() => navigate(-1)}
            className="hover:text-purple-600 text-[3vh] sm:text-[2vw]"
          />
          <h1 className="text-[3vh] sm:text-[2vw]">Person</h1>
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={getPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Card data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Person;
