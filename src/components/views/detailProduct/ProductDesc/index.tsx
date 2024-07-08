import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

type PropTypes = {
  productDesc: string | undefined | null;
};

const ProductDesc = (props: PropTypes) => {
  const { productDesc } = props;
  const [sanitizedDesc, setSanitizedDesc] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (productDesc) {
        const htmlFromMarkdown = await marked(productDesc, { breaks: true });
        const sanitizedHTML = DOMPurify.sanitize(htmlFromMarkdown);
        setSanitizedDesc(sanitizedHTML);
      }
    };

    fetchMarkdown();
  }, [productDesc]);

  return (
    <div className="product-desc">
      <div dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
      <style jsx>{`
        .product-desc {
          list-style-type: disc;
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
};

export default ProductDesc;
