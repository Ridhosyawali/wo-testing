import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Products.module.scss";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import Input from "@/components/ui/Input";

type PropTypes = {
  products: Product[];
};
const ProductsAdminView = (props: PropTypes) => {
  const { products } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);

  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});
  const [searchValue, setSearchValue] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 15; // Jumlah produk yang ingin ditampilkan per halaman

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = event.target.value;
    setSearchValue(searchVal);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setProductsData(filtered);
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const handlePreviousClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const visibleProducts = productsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className={styles.products}>
          <h2 className={styles.products__title}>Produk Management</h2>
          <div className={styles.products__header}>
            <Button
              type="button"
              className={styles.products__header__add}
              variant=""
              onClick={() => setModalAddProduct(true)}
            >
              <i className="bx bx-plus" /> Tambah Produk
            </Button>
            <div className={styles.products__header__search}>
              <i className="bx bx-search-alt" />
              <Input
                name="search"
                type="text"
                placeholder="Cari Produk"
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
          </div>

          <table className={styles.products__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Gambar</th>
                <th rowSpan={2}>Nama</th>
                <th rowSpan={2}>Kategori</th>
                <th rowSpan={2}>Harga</th>
                <th rowSpan={2}>lokasi</th>
                <th colSpan={2}>Stock</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th className={styles.products__table__size}>Varian</th>
                <th className={styles.products__table__size}>Qty</th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts.map((product, index) => (
                <Fragment key={product.id}>
                  <tr>
                    <td rowSpan={product.stock.length}>
                      {startIndex + index + 1}
                    </td>
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
                    <td>{product.location}</td>
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
                      <Fragment key={stock.size}>
                        {index > 0 && (
                          <tr>
                            <td>{stock.size}</td>
                            <td>{stock.qty}</td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
          <div className={styles.products__bottom}>
            {startIndex > 0 && (
              <Button
                type="button"
                className={styles.products__bottom__pagination}
                onClick={handlePreviousClick}
              >
                Previous
              </Button>
            )}
            {visibleProducts.length < productsData.length && (
              <Button
                type="button"
                className={styles.products__bottom__pagination}
                onClick={handleNextClick}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(updatedProduct).length > 0 && (
        <ModalUpdateProduct
          setUpdatedProduct={setUpdatedProduct}
          updatedProduct={updatedProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteProduct
          setDeletedProduct={setDeletedProduct}
          deletedProduct={deletedProduct}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
};
export default ProductsAdminView;
