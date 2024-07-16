import styles from "./DetailHome.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article.type";
import ArticleDesc from "./ArticleDesc";

type PropTypes = {
  article: Article | any;
};

const DetailArticleView = (props: PropTypes) => {
  const { article } = props;

  return (
    <>
      <div className={styles.detail}>
        <div className={styles.detail__main}>
          <div className={styles.detail__main__desc}>
            <h3 className={styles.detail__main__desc__judul}>
              {article?.judul}
            </h3>
            <ArticleDesc articleDesc={article?.isi} />
          </div>
          <div className={styles.detail__main__image}>
            <Image
              alt={article?.image}
              src={article?.image}
              width={500}
              height={500}
              className={styles.detail__main__image__image}
              priority
            />
          </div>
        </div>
        <div className={styles.detail__link}>
          <p>Jika anda tertarik klik link ini untuk melihat detail produk</p>
          <Link
            className={styles.detail__link__link}
            href={`/products/${article.linkproduct}`}
          >
            disini
          </Link>
        </div>
      </div>
    </>
  );
};

export default DetailArticleView;
