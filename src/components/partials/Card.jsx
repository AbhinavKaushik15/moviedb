import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Card = ({ data, title }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-[3vw] flex-wrap">
      {data.map((c, i) => {
        return (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            key={i}
            className="relative box w-[25vh] lg:w-[35vh] h-[35vh] lg:h-[49vh] mb-[7vh] md:mb-[4vh] flex flex-col mx-auto rounded-xl"
          >
            <img
              className="w-full h-full object-cover rounded-md md:rounded-xl"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <h1 className="text-white text-center pt-[0.8vw] sm:text-[2vw] md:text-[1.4vw]">
              {(c.name || c.original_name || c.original_title).slice(0, 20)}
            </h1>

            {c.people ? (
              <div className="absolute w-14 h-14 bg-yellow-500 flex items-center justify-center rounded-full font-[500] text-white bottom-10 -right-4">
                {(c.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            ) : (
              ""
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Card;
