import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Products.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";

type PropTypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};
const ProductsAdminView = (props: PropTypes) => {
  const { products, setToaster } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);

  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className={styles.products}>
          <h2 className={styles.products__title}>Products Management</h2>
          <Button
            type="button"
            className={styles.products__add}
            variant=""
            onClick={() => setModalAddProduct(true)}
          >
            <i className="bx bx-plus" /> Add Product
          </Button>
          <table className={styles.products__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Price</th>
                <th colSpan={2}>Stock</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th className={styles.products__table__size}>Size</th>
                <th className={styles.products__table__size}>Qty</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, index) => (
                <>
                  <tr key={product.id}>
                    <td rowSpan={product.stock.length}>{index + 1}</td>
                    <td rowSpan={product.stock.length}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                        className={styles.products__table__image}
                      />
                    </td>
                    <td rowSpan={product.stock.length}>{product.name}</td>
                    <td rowSpan={product.stock.length}>{product.category}</td>
                    <td rowSpan={product.stock.length}>
                      {convertIDR(product.price)}
                    </td>
                    <td>{product.stock[0].size}</td>
                    <td>{product.stock[0].qty}</td>
                    <td rowSpan={product.stock.length}>
                      <div className={styles.products__table__action}>
                        <Button
                          variant="update"
                          type="button"
                          className={styles.products__table__action__edit}
                          onClick={() => setUpdatedProduct(product)}
                        >
                          <i className="bx bxs-edit" />
                        </Button>
                        <Button
                          variant="delete"
                          type="button"
                          className={styles.products__table__action__delete}
                          onClick={() => setDeletedProduct(product)}
                        >
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: number }, index: number) => (
                      <>
                        {index > 0 && (
                          <tr key={stock.size}>
                            <td>{stock.size}</td>
                            <td>{stock.qty}</td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setToaster={setToaster}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(updatedProduct).length > 0 && (
        <ModalUpdateProduct
          setUpdatedProduct={setUpdatedProduct}
          updatedProduct={updatedProduct}
          setToaster={setToaster}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteProduct
          setDeletedProduct={setDeletedProduct}
          deletedProduct={deletedProduct}
          setToaster={setToaster}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
};
export default ProductsAdminView;
