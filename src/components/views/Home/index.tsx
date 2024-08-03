import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./Home.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CardArticle from "./CardArticle";
import { Article } from "@/types/article.type";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "500px",
  margin: "40px 0 0px 0",
};

const slideImages = [
  {
    url: "/devided2.jpg",
    caption: "Slide 3",
  },
  {
    url: "/devided3.jpg",
    caption: "Slide 1",
  },
  {
    url: "/slide2.png",
    caption: "Slide 2",
  },
];

type PropTypes = {
  articles: Article[];
};
const HomeView = (props: PropTypes) => {
  const { articles } = props;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className={styles.home__aboutus}>
        <motion.div
          id="about"
          initial={{ x: "-100vw", opacity: 0 }}
          animate={
            isVisible ? { x: 0, opacity: 1 } : { x: "-100vw", opacity: 0 }
          }
          transition={{ duration: 0.8 }}
        >
          <div className={styles.home__about}>
            <h2 className={styles.home__about__title}>Tentang Kami</h2>
            <p className={styles.home__about__us}>
              RIRA GRIYA Rias Pengantin berkomitmen untuk mewujudkan pernikahan
              impian setiap pasangan dengan dukungan penuh dari perencana
              pernikahan dan penyelenggara acara yang berpengalaman. Dengan
              banyaknya pilihan vendor-vendor wedding yang bekerja sama dengan
              kami, anda dapat memastikan setiap detail pernikahan anda akan
              sempurna. Kami juga menawarkan berbagai paket pernikahan yang
              dapat disesuaikan dengan budget anda agar dapat memastikan
              kebutuhan dan keinginan setiap pasangan terpenuhi. RIRA GRIYA Rias
              Pengantin siap membantu anda mewujudkan hari spesial yang tak
              terlupakan.
            </p>
          </div>
        </motion.div>
      </div>

      <div className={styles.home__devide}>
        <Image
          src="/devided.jpg"
          alt="devide"
          width={500}
          height={500}
          priority
          className={styles.home__devide__image}
        />
      </div>
      <div className={styles.home__main}>
        <h2 className={styles.home__main__title}>Testimoni</h2>
        <div className={styles.home__main__content}>
          {articles.map((article) => (
            <Link href={`/home/${article.id}`} key={article.id}>
              <CardArticle article={article} />
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.home__devide}>
        <Image
          src="/devided4.jpg"
          alt="devide"
          width={500}
          height={500}
          priority
          className={styles.home__devide__image}
        />
      </div>
    </div>
  );
};
export default HomeView;
