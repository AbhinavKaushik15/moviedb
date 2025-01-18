import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import NotFound from "../NotFound";

const Trailer = () => {
  document.title = "MOVIEDB || Trailer";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="absolute z-[1000] top-0 left-0 bg-[#000000c6] flex items-center justify-center w-full h-[100vh]">
      <IoCloseSharp
        onClick={() => navigate(-1)}
        className="absolute hover:text-purple-400 right-10 top-10 text-3xl"
      />
      {ytVideo ? (
        <ReactPlayer
          controls
          height={500}
          width={1050}
          url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
