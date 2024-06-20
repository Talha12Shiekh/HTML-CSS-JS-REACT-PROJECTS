import React from "react";
import { BubblyContainer, BubblyLink } from "react-bubbly-transitions";
import "./App.css";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

const Title = () => {
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  const location = useLocation();
  const [currentLocation, setcurrentLocation] = useState("Docs");
  const Heading = location.pathname.slice(1);

  useEffect(() => {
    if (Heading == "") {
      setcurrentLocation("Docs");
    } else {
      setcurrentLocation(capitalize(Heading));
    }
  }, [Heading]);

  return (
    <h2 className="animate-in" style={{ animationDelay: "600ms" }}>
      {currentLocation}
    </h2>
  );
};

const Nav = () => {
  return (
    <nav className="animate-in" style={{ animationDelay: "800ms" }}>
      <BubblyLink to="/">Docs</BubblyLink>
      <BubblyLink to="/about">About</BubblyLink>
      <BubblyLink to="/contact">Contact</BubblyLink>
    </nav>
  );
};

const Navbar = () => {
  return (
    <>
      <header>
        <Title />
        <Nav />
      </header>
    </>
  );
};

const EmptyPage = ({ title }) => {
  return (
    <div className="page">
      <div>{title}</div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <BubblyContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<EmptyPage title={"Docs"} />} />
          <Route path="about" element={<EmptyPage title={"About"} />} />
          <Route path="contact" element={<EmptyPage title={"Contact"} />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
