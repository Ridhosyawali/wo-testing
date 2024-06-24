import { Product } from "@/types/product.type";
import styles from "./Products.module.scss";
import Card from "./Card";
import Link from "next/link";
import { useEffect, useState } from "react";

type PropTypes = {
  products: Product[];
};

const ProductView = (props: PropTypes) => {
  const { products } = props;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedLocation, setSelectedLocation] = useState<null | string>(null);
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [showLocationOptions, setShowLocationOptions] = useState(false);

  const handleFilterLocation = (location: string) => {
    const filtered = products.filter(
      (product) => product.location === location
    );
    setFilteredProducts(filtered);
  };

  const handleCheckboxLocation = (location: string) => {
    if (selectedLocation === location) {
      setSelectedLocation(null); // Uncheck the checkbox
      handleFilterLocation(location); // Reapply location filter

      // Filter products based on category "Make Up"
      const filteredProductsByCategoryMakeUp = filteredProducts.filter(
        (product) =>
          product.category === "Make Up" && product.location === location
      );
      setFilteredProducts(filteredProductsByCategoryMakeUp);
    } else {
      setSelectedLocation(location);
      handleFilterLocation(location);

      // Filter products based on selected location
      const filtered = products.filter(
        (product) =>
          product.category === "Make Up" && product.location === location
      );
      setFilteredProducts(filtered);
    }
  };

  const handleCheckboxCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Uncheck the checkbox
      setFilteredProducts(products); // Show all products
      setSelectedLocation(null); // Reset selected location
      setShowLocationOptions(false); // Hide location options
    } else {
      setSelectedCategory(category);
      // Filter products based on category
      const filteredProductsByCategory = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filteredProductsByCategory);

      if (category === "Make Up") {
        setShowLocationOptions(true); // Show location options for Make Up
      } else {
        setShowLocationOptions(false); // Hide location options for other categories
        setSelectedLocation(null); // Reset selected location for other categories
      }
    }
  };

  useEffect(() => {
    // Saat halaman dimuat ulang, baca nilai dari Local Storage
    const storedFilteredProducts = localStorage.getItem("filteredProducts");
    const storedSelectedLocation = localStorage.getItem("selectedLocation");
    const storedSelectedCategory = localStorage.getItem("selectedCategory");

    if (storedFilteredProducts && storedSelectedLocation) {
      // Jika ada nilai yang ditemukan, gunakan nilai tersebut untuk mengatur ulang state
      setFilteredProducts(JSON.parse(storedFilteredProducts));
      setSelectedLocation(storedSelectedLocation);
      setSelectedCategory(storedSelectedCategory);
    } else {
      // Jika tidak ada nilai yang ditemukan, gunakan semua produk sebagai default
      setFilteredProducts(products);
      setSelectedLocation(null);
      setSelectedCategory(null);
    }
  }, [products]);

  useEffect(() => {
    // Saat state berubah, simpan nilai ke Local Storage
    if (selectedLocation && selectedCategory !== null) {
      localStorage.setItem("selectedLocation", selectedLocation);
      localStorage.setItem("selectedCategory", selectedCategory);
    }
  }, [filteredProducts, selectedLocation, selectedCategory]);

  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>
        All Product ({filteredProducts.length})
      </h1>
      <div className={styles.product__main}>
        <div className={styles.product__main__filter}>
          <div className={styles.product__main__filter__data}>
            <h4 className={styles.product__main__filter__data__title}>
              Category
            </h4>
            <div className={styles.product__main__filter__data__list}>
              <div className={styles.product__main__filter__data__list__item}>
                <input
                  type="checkbox"
                  checked={selectedCategory === "Catering"}
                  onChange={() => handleCheckboxCategory("Catering")}
                />
                <label
                  className={
                    styles.product__main__filter__data__list__item__label
                  }
                >
                  Catering
                </label>
              </div>
              <div className={styles.product__main__filter__data__list__item}>
                <input
                  type="checkbox"
                  checked={selectedCategory === "Decoration"}
                  onChange={() => handleCheckboxCategory("Decoration")}
                />
                <label
                  className={
                    styles.product__main__filter__data__list__item__label
                  }
                >
                  Decoration
                </label>
              </div>
              <div className={styles.product__main__filter__data__list__item}>
                <input
                  type="checkbox"
                  checked={selectedCategory === "Make Up"}
                  onChange={() => handleCheckboxCategory("Make Up")}
                />
                <label
                  className={
                    styles.product__main__filter__data__list__item__label
                  }
                >
                  Make Up
                </label>
              </div>
              <div className={styles.product__main__filter__data__list__item}>
                <input
                  type="checkbox"
                  checked={selectedCategory === "Wedding"}
                  onChange={() => handleCheckboxCategory("Wedding")}
                />
                <label
                  className={
                    styles.product__main__filter__data__list__item__label
                  }
                >
                  Wedding
                </label>
              </div>
            </div>
          </div>

          {showLocationOptions && (
            <div className={styles.product__main__filter__data__down}>
              <h2 className={styles.product__main__filter__data__title}>
                Pilih Lokasi
              </h2>
              <div className={styles.product__main__filter__data__down__list}>
                <div
                  className={
                    styles.product__main__filter__data__down__list__item
                  }
                >
                  <input
                    type="checkbox"
                    checked={selectedLocation === "Bandung"}
                    onChange={() => handleCheckboxLocation("Bandung")}
                  />
                  <label
                    className={
                      styles.product__main__filter__data__down__list__item__label
                    }
                  >
                    Bandung
                  </label>
                </div>
                <div
                  className={
                    styles.product__main__filter__data__down__list__item
                  }
                >
                  <input
                    type="checkbox"
                    checked={selectedLocation === "Bekasi"}
                    onChange={() => handleCheckboxLocation("Bekasi")}
                  />
                  <label
                    className={
                      styles.product__main__filter__data__down__list__item__label
                    }
                  >
                    Bekasi
                  </label>
                </div>
                <div
                  className={
                    styles.product__main__filter__data__down__list__item
                  }
                >
                  <input
                    type="checkbox"
                    checked={selectedLocation === "Jakarta Selatan"}
                    onChange={() => handleCheckboxLocation("Jakarta Selatan")}
                  />
                  <label
                    className={
                      styles.product__main__filter__data__down__list__item__label
                    }
                  >
                    Jakarta Selatan
                  </label>
                </div>
                <div
                  className={
                    styles.product__main__filter__data__down__list__item
                  }
                >
                  <input
                    type="checkbox"
                    checked={selectedLocation === "Tangerang"}
                    onChange={() => handleCheckboxLocation("Tangerang")}
                  />
                  <label
                    className={
                      styles.product__main__filter__data__down__list__item__label
                    }
                  >
                    Tangerang
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.product__main__content}>
          {filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
