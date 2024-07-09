import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

type PropTypes = {
  articleDesc: string | undefined | null;
};

const ArticleDesc = (props: PropTypes) => {
  const { articleDesc } = props;
  const [sanitizedDesc, setSanitizedDesc] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (articleDesc) {
        const htmlFromMarkdown = await marked(articleDesc, { breaks: true });
        const sanitizedHTML = DOMPurify.sanitize(htmlFromMarkdown);
        setSanitizedDesc(sanitizedHTML);
      }
    };

    fetchMarkdown();
  }, [articleDesc]);

  return (
    <div className="product-desc">
      <div dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
      <style jsx>{`
        .product-desc {
          list-style-type: disc;
          padding: 10vh;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
          font-style: italic;
          font-size: 18px;
          br {
            display: block;
            margin: 3em 0;
            content: "";
            border: 0;
            border: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticleDesc;
