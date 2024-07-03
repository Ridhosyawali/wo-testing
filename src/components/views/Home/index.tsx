import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./Home.module.scss";
import Image from "next/image";
import Footerview from "@/components/ui/Footer";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useState } from "react";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "300px",
  margin: "40px 0 0px 0",
};

const slideImages = [
  {
    url: "/slide1.png",
    caption: "Slide 1",
  },
  {
    url: "/slide2.png",
    caption: "Slide 2",
  },
  {
    url: "/slide3.png",
    caption: "Slide 3",
  },
];

const categories = [
  { url: "/cincin.png", title: "Wedding", href: "/products/Wedding" },
  { url: "/makeup.png", title: "Make Up", href: "/products/Make Up" },
  { url: "/catering.png", title: "Catering" },
  { url: "/dekorasi.png", title: "Decoration" },
  { url: "/sound.png", title: "Sound System" },
  { url: "/photo.png", title: "Photographer" },
];

const HomeView = () => {
  return (
    <div>
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{
                ...divStyle,
                backgroundImage: `url(${slideImage.url})`,
              }}
            ></div>
          </div>
        ))}
      </Slide>
      <div className={styles.home__cards}>
        {categories.map((category, index) => (
          <Link
            href={`/products?category=${encodeURIComponent(category.title)}`}
            passHref
            key={index}
          >
            <Image
              src={category.url}
              alt="image"
              width={60}
              height={60}
              className={styles.home__cards__image}
            />
            <p>{category.title}</p>
          </Link>
        ))}
      </div>

      <Footerview />
    </div>
  );
};
export default HomeView;
