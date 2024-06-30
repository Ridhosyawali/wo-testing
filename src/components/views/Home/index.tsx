import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./Home.module.scss";
import Image from "next/image";
import Footerview from "@/components/ui/Footer";

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
  { url: "/cincin.png", title: "Wedding", href: "/products" },
  { url: "/makeup.png", title: "Make Up" },
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
            >
              <span></span>
            </div>
          </div>
        ))}
      </Slide>
      <table className={styles.home__cards}>
        {categories.map((category, index) => (
          <tbody key={index}>
            <tr>
              <td>
                <Image
                  src={category.url}
                  alt="image"
                  width={60}
                  height={60}
                  className={styles.home__cards__image}
                  onClick={() => {
                    if (category.href) {
                      window.location.href = category.href;
                    }
                  }}
                />
              </td>
              <td>{category.title}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <Footerview />
    </div>
  );
};
export default HomeView;
