import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Products.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";

type PropTypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};
const ProductsAdminView = (props: PropTypes) => {
  const { products, setToaster } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className={styles.products}>
          <h2>Products Management</h2>
          <table className={styles.products__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Price</th>
                <th rowSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, index) => (
                <>
                  {" "}
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                        className={styles.products__table__image}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{convertIDR(product.price)}</td>
                    <td>
                      <div className={styles.products__table__action}>
                        <Button
                          variant="update"
                          type="button"
                          className={styles.products__table__action__edit}
                        >
                          <i className="bx bxs-edit" />
                        </Button>
                        <Button
                          variant="delete"
                          type="button"
                          className={styles.products__table__action__delete}
                        >
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};
export default ProductsAdminView;
