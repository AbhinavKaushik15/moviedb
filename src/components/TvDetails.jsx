import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadTv, removeTv } from "../store/actions/TvAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoLinkExternal } from "react-icons/go";
import { FaImdb } from "react-icons/fa";
import { SiWikidata } from "react-icons/si";
import Loading from "./Loading";
import TrendingHorizontal from "./partials/TrendingHorizontal";

const TvDetails = () => {
  document.title = "MOVIEDB || Tv Detail";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full min-h-[100vh] text-white px-[3.5vw]"
    >
      <nav className="w-full h-14 flex items-center gap-[4.2vh] sm:gap-[4vw] py-[4vh]">
        <Link to="/" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack className="text-[4vh] sm:text-[2.35vw] hover:text-purple-400" />
        </Link>
        <a target="_blank" href={info.detail.homepage}>
          <GoLinkExternal className="text-[2.8vh] sm:text-[1.7vw] hover:text-purple-400" />
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <SiWikidata className="text-[4.2vh] sm:text-[2.5vw] hover:text-purple-400" />
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}
        >
          <FaImdb className="text-[3.15vh] sm:text-[2vw] text-yellow-400 hover:text-purple-400" />
        </a>
      </nav>

      <div className="hero_Section w-full flex flex-col sm:flex-row justify-between">
        <img
          className="w-[26vh] sm:w-[20vw] h-[36vh] sm:h-[25vw] mt-2 sm:mt-0 object-cover rounded-md lg:rounded-xl"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        {/* Hero Details */}
        <div className="flex sm:w-[60vw] flex-col gap-[0.9vw] mt-4 sm:mt-0">
          <h1 className="text-[4vh] whitespace-nowrap sm:text-[3vw] font-[800]">
            {info.detail.name}
            <sup className="text-[2vh] sm:text-[1.6vw] font-[500]">
              ({info.detail.first_air_date.split("-")[0]})
            </sup>
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="flex gap-1 whitespace-nowrap">
              <h1 className="w-[4vh] sm:w-[3.5vw] h-[4vh] sm:h-[3.5vw] bg-yellow-500 flex items-center justify-center rounded-full font-[500] text-white text-[1.6vh] sm:text-[1.3vw]">
                {(info.detail.vote_average * 10).toFixed()}
                <sup className="text-[1.2vh] sm:text-[1vw]">%</sup>
              </h1>
              <h1 className="text-[2.2vh] sm:text-[1.6vw] text-zinc-300">
                User Score
              </h1>
            </div>

            <div className="flex gap-3">
              <div className="text-[1.5vh] whitespace-nowrap sm:text-[1.2vw]">
                {info.detail.release_date}
              </div>

              <h1 className="text-[1.5vh] whitespace-nowrap sm:text-[1.2vw]">
                {info.detail.genres.map((m) => m.name).join(", ")}
              </h1>
            </div>
          </div>

          <h1 className="text-[2.2vh] sm:text-[1.6vw] mt-1 sm:mt-0 italic text-zinc-300">
            {info.detail.tagline}
          </h1>

          <h1 className="text-[2.8vh] sm:text-[1.9vw] font-[600]">Overview</h1>

          <p className="text-zinc-400 text-[1.5vh] sm:text-[1.2vw] w-[95%] sm:w-[75%]">
            {info.detail.overview}
          </p>

          <h1 className="text-[2.8vh] sm:text-[1.9vw] font-[600]">
            Movie Translated
          </h1>

          <p className="text-zinc-400 text-[1.5vh] sm:text-[1.2vw] w-[95%] sm:w-[75%]">
            {info.translations.join(", ")} etc.
          </p>

          <Link
            to={`${pathname}/trailer`}
            className="w-fit bg-purple-500 text-[1.6vh] sm:text-[1.3vw] hover:bg-white hover:text-purple-500 mt-2 sm:mt-[1vw] py-[1vh] sm:py-[0.7vw] px-[2vh] sm:px-[1.7vw] rounded-full font-[500]"
          >
            Play Trailer
          </Link>
        </div>
      </div>

      <div className="w-full max-h-40 mt-[2vw] flex flex-col gap-[2vw]">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="flex items-center">
            <h1 className="mr-[2.9vw] text-zinc-300 text-[2vh] sm:text-[1.4vw]">
              Available on Platform
            </h1>
            <div className="flex items-center gap-[2vw]">
              {info.watchProviders.flatrate.map((flat, i) => (
                <img
                  key={i}
                  className="w-[4vh] sm:w-[3.2vw] h-[4vh] sm:h-[3.2vw] rounded-sm sm:rounded-md"
                  src={`https://image.tmdb.org/t/p/w500/${flat.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}

        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex items-center">
            <h1 className="mr-[5vw] text-zinc-300 text-[2vh] sm:text-[1.4vw]">
              Available on Rent
            </h1>
            <div className="flex items-center gap-[2vw]">
              {info.watchProviders.rent.map((rent, i) => (
                <img
                  key={i}
                  className="w-[4vh] sm:w-[3.2vw] h-[4vh] sm:h-[3.2vw] rounded-sm sm:rounded-md"
                  src={`https://image.tmdb.org/t/p/w500/${rent.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}

        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex items-center">
            <h1 className="mr-[5.7vw] text-zinc-300 text-[2vh] sm:text-[1.4vw]">
              Available to Buy
            </h1>
            <div className="flex items-center gap-[2vw]">
              {info.watchProviders.buy.map((buy, i) => (
                <img
                  key={i}
                  className="w-[4vh] sm:w-[3.2vw] h-[4vh] sm:h-[3.2vw] rounded-sm sm:rounded-md"
                  src={`https://image.tmdb.org/t/p/w500/${buy.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 sm:mt-[2.2vw]">
        <h1 className="text-[2.7vh] sm:text-[2.3vw] font-[700] mb-2">Seasons</h1>
        <TrendingHorizontal
          data={
            info.detail.seasons.length > 0 ? (
              info.detail.seasons
            ) : (
              <h1 className="text-[3.5vh] sm:text-[3vw]">Nothing to watch.</h1>
            )
          }
        />
      </div>

      <div className="mt-5 sm:mt-[2.2vw]">
        <h1 className="text-[2.7vh] sm:text-[2.3vw] font-[700] mb-2">
          Recommendations & Similar Stuff
        </h1>
        <TrendingHorizontal
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
