import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import Movie from "./components/Movie";
import Tv from "./components/Tv";
import Trailer from "./components/partials/Trailer";
import NotFound from "./components/NotFound";
import Person from "./components/Person";
import PersonDetails from "./components/PersonDetails";

export const contextMenu = createContext(null);
const App = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <contextMenu.Provider value={[isOpen, setisOpen]}>
      <div className="w-full h-screen bg-[#1D1C23]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />

          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/details/:id" element={<MovieDetails />}>
            <Route path="/movie/details/:id/trailer" element={<Trailer />} />
          </Route>

          <Route path="/tv" element={<Tv />} />
          <Route path="/tv/details/:id" element={<TvDetails />}>
            <Route path="/tv/details/:id/trailer" element={<Trailer />} />
          </Route>

          <Route path="/person" element={<Person />} />
          <Route path="/person/details/:id" element={<PersonDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </contextMenu.Provider>
  );
};

export default App;
