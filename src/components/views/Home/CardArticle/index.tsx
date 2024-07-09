import { Article } from "@/types/article.type";
import styles from "./Article.module.scss";
import Image from "next/image";

import { useEffect, useState } from "react";

type Proptypes = {
  article: Article;
};

const CardArticle = (props: Proptypes) => {
  const { article } = props;
  const [truncatedContent, setTruncatedContent] = useState(article.isi);

  useEffect(() => {
    const limit = 230; // Batasi teks hingga 100 karakter
    if (article.isi.length > limit) {
      setTruncatedContent(article.isi.substring(0, limit) + "...");
    } else {
      setTruncatedContent(article.isi);
    }
  }, [article.isi]);

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h4 className={styles.card__title}>{article.judul}</h4>
        <p className={styles.card__subtitle}>{article.location}</p>
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__content__left}>
          <Image
            src={article.image}
            alt="article"
            width={50}
            height={50}
            className={styles.card__content__left__image}
          />
        </div>
        <div className={styles.card__content__right}>
          <p className={styles.card__content__right__isi}>{truncatedContent}</p>
        </div>
      </div>
    </div>
  );
};

export default CardArticle;
