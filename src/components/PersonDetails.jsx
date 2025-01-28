import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadPerson, removePerson } from "../store/actions/PersonAction";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loading from "./Loading";
import TrendingHorizontal from "./partials/TrendingHorizontal";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  document.title = "MOVIEDB || Person Detail";
  const [category, setCategory] = useState("movie");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  console.log(info);

  useEffect(() => {
    dispatch(asyncLoadPerson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  return info ? (
    <div className="w-full min-h-screen bg-[#1D1C23] px-[3.5vw] text-white">
      <nav className="text-zinc-400 w-fit font-bold pt-5 flex items-center gap-2">
        <Link to="/" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack className="text-[4vh] sm:text-[2.35vw] hover:text-purple-400" />
        </Link>

        <div className="flex sm:hidden gap-[2.8vh] items-center">
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
          >
            <BiWorld className="text-[3.6vh] hover:text-purple-400" />
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/${info.externalId.facebook_id}`}
          >
            <FaFacebook className="text-[3.45vh] hover:text-purple-400" />
          </a>
          <a
            target="_blank"
            href={`https://www.instagram.com/${info.externalId.instagram_id}/`}
          >
            <BsInstagram className="text-[3.25vh] hover:text-purple-400" />
          </a>

          <a
            target="_blank"
            href={`https://www.x.com/${info.externalId.twitter_id}/`}
          >
            <BsTwitterX className="text-[3.1vh] hover:text-purple-400" />
          </a>
        </div>
      </nav>

      <div className="relative w-full flex flex-col sm:flex-row justify-between pt-[3vh] sm:pt-[2vw]">
        <div className="relative hero_Section w-full sm:w-[17vw] flex flex-col">
          <img
            className="w-[26vh] sm:w-[20vw] h-[36vh] sm:h-[25vw] object-cover rounded-md sm:rounded-xl"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />

          <hr className="hidden sm:flex mt-[2vw] w-[17vw] pt-[1vw]" />

          <div className="hidden sm:flex gap-[2vw] items-center">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
            >
              <BiWorld className="text-[2.4vw] hover:text-purple-400" />
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalId.facebook_id}`}
            >
              <FaFacebook className="text-[2.25vw] hover:text-purple-400" />
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalId.instagram_id}/`}
            >
              <BsInstagram className="text-[2.15vw] hover:text-purple-400" />
            </a>

            <a
              target="_blank"
              href={`https://www.x.com/${info.externalId.twitter_id}/`}
            >
              <BsTwitterX className="text-[2.1vw] hover:text-purple-400" />
            </a>
          </div>

          <div className="hidden sm:flex flex-col">
            <h1 className="text-[2.4vw] mt-[2.2vw] font-[500]">
              Personal info
            </h1>

            <h1 className="mt-[2.2vw] font-[500] text-[1.6vw]">Known For</h1>
            <h1 className="text-[1.25vw]">
              {info.detail.known_for_department}
            </h1>

            <h1 className="mt-[2.2vw] font-[500] text-[1.6vw]">Gender</h1>
            <h1 className="text-[1.25vw]">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </h1>

            <h1 className="mt-[2.2vw] font-[500] text-[1.6vw]">Birthday</h1>
            <h1 className="text-[1.25vw]">{info.detail.birthday}</h1>

            <h1 className="mt-[2.2vw] font-[500] text-[1.6vw]">Deathday</h1>
            <h1 className="text-[1.25vw]">
              {info.detail.deathday ? info.detail.deathday : "Still Alive"}
            </h1>

            <h1 className="mt-[2.2vw] font-[500] text-[1.6vw]">
              Place Of Birth
            </h1>
            <h1 className="text-[1.25vw]">{info.detail.place_of_birth}</h1>

            <h1 className="mt-[2.2vw] font-[500] text-[1.6vw]">
              Also Known As
            </h1>
            <h1 className="text-[1.25vw]">
              {info.detail.also_known_as.join(", ")}
            </h1>
          </div>
        </div>

        <div className="relative flex flex-col gap-[2vw] w-full sm:w-[70vw] mt-3 sm:mt-0">
          <h1 className="text-[4vh] sm:text-[3.5vw] text-white font-[700]">
            {info.detail.name}
          </h1>
          <h1 className="text-[3.1vh] sm:text-[2.1vw] font-[500]">Biography</h1>
          <p className="text-[2vh] sm:text-[1.25vw] w-[98%]">
            {info.detail.biography}
          </p>

          <div className="flex sm:hidden flex-col">
            <h1 className="text-[3.2vh] sm:text-[2.4vw] mt-[2.2vw] font-[500]">
              Personal info
            </h1>

            <h1 className="mt-[2.2vw] font-[500] text-[2.4vh]">Known For</h1>
            <h1 className="text-[1.9vh] sm:text-[1.25vw]">
              {info.detail.known_for_department}
            </h1>

            <h1 className="mt-[2.2vw] font-[500] text-[2.4vh]">Gender</h1>
            <h1 className="text-[1.9vh] sm:text-[1.25vw]">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </h1>

            <h1 className="mt-[2.2vw] font-[500] text-[2.4vh]">Birthday</h1>
            <h1 className="text-[1.9vh] sm:text-[1.25vw]">
              {info.detail.birthday}
            </h1>

            <h1 className="mt-[2.2vw] font-[500] text-[2.4vh]">Deathday</h1>
            <h1 className="text-[1.9vh] sm:text-[1.25vw]">
              {info.detail.deathday ? info.detail.deathday : "Still Alive"}
            </h1>

            <h1 className="mt-[2.2vw] font-[500] text-[2.4vh]">
              Place Of Birth
            </h1>
            <h1 className="text-[1.9vh] sm:text-[1.25vw]">
              {info.detail.place_of_birth}
            </h1>

            <h1 className="mt-[2.2vw] font-[500] text-[2.4vh]">
              Also Known As
            </h1>
            <h1 className="text-[1.9vh] sm:text-[1.25vw]">
              {info.detail.also_known_as.join(", ")}
            </h1>
          </div>

          <div>
            <h1 className="text-[3.2vh] sm:text-[2.1vw] text-zinc-500">
              Known For
            </h1>
            <TrendingHorizontal data={info.combinedCredits.crew} />
          </div>

          <div className="w-full">
            {info[category + "Credits"].cast ? (
              <div className="flex flex-col gap-[4vw] md:gap-[2vw]">
                <div className="flex items-center justify-between">
                  <h1 className="text-[3.2vh] sm:text-[2.1vw] text-zinc-500">
                    Acting
                  </h1>

                  <Dropdown
                    title="Category"
                    options={["tv", "movie"]}
                    func={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="h-[50vh] text-white list-disc shadow-md shadow-zinc-500 overflow-x-hidden overflow-y-auto flex flex-col mb-[4vw]">
                  {info[category + "Credits"].cast.map((c, i) => (
                    <Link key={i} to={`/${category}/details/${c.id}`}>
                      <li
                        key={i}
                        className="w-full hover:bg-zinc-800 duration-300 pl-3 cursor-pointer py-[1.2vh] sm:py-[1vw]"
                      >
                        <span className="list-disc text-[2.5vh] sm:text-[1.5vw]">
                          {c.name ||
                            c.title ||
                            c.original_title ||
                            original_name}
                        </span>

                        <span className="block ml-6 text-[1.8vh] sm:text-[1.35vw] text-zinc-500">
                          {c.character && `Character Name : ${c.character}`}
                        </span>
                      </li>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <h1>Something went wrong.</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
