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
          <div>
            <Image
              alt="article"
              src={article?.image}
              width={500}
              height={500}
              className={styles.detail__main__image}
            />
          </div>
        </div>
        <div>
          <p>Jika anda tertarik klik link ini untuk melihat detail produk</p>
          <Link href={`/products/${article.linkproduct}`}>disini</Link>
        </div>
      </div>
    </>
  );
};

export default DetailArticleView;
