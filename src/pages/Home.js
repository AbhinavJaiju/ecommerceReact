import React from "react";
import Navbar from "../components/navbar/Navbar";
import Announcement from "../components/announcement/Announcement";
import Slider from "../components/slider/Slider";
import Categories from "../components/Category/Category";
import Products from "../components/product/Products";
import Newsletter from "../components/newsletter/Newsletter";
import Footer from "../components/footer/Footer";
import Carousal from "../components/Carousal/carousal";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Slider />
      {/* <Carousal /> */}
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
