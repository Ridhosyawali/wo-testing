import { Product } from "@/types/product.type";
import styles from "./Products.module.scss";
import Card from "./Card";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";

type PropTypes = {
  products: Product[];
};

const ProductView = (props: PropTypes) => {
  const { products } = props;
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedLocation, setSelectedLocation] = useState<null | string>(null);
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage] = useState(15);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = event.target.value;
    setSearchValue(searchVal);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, itemsPerPage, startIndex]);

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const handlePreviousClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const handleFilterPriceRange = (priceRange: string) => {
    setSelectedPriceRange(priceRange || null);
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);

    const filteredProducts = products.filter((product) => {
      return (
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (selectedLocation === null || product.location === selectedLocation) &&
        (selectedCategory === null || product.category === selectedCategory)
      );
    });

    setFilteredProducts(filteredProducts);
  };

  //dibawah ini adalah contoh checkbox berdasarkan satu kriteria saja
  // const handleCheckboxLocation = (location: string) => {
  //   if (selectedLocation === location) {
  //     setSelectedLocation(null); // Uncheck the checkbox
  //     handleFilterLocation(location); // Reapply location filter

  //     // Filter products based on category "Make Up"
  //     const filteredProductsByCategoryMakeup = filteredProducts.filter(
  //       (product) =>
  //         product.category === "Make Up" && product.location === location
  //     );
  //     setFilteredProducts(filteredProductsByCategoryMakeup);
  //   } else {
  //     setSelectedLocation(location);
  //     handleFilterLocation(location);

  //     // Filter products based on selected location
  //     const filtered = products.filter(
  //       (product) =>
  //         product.category === "Make Up" && product.location === location
  //     );
  //     setFilteredProducts(filtered);
  //   }
  // };

  const handleFilterLocation = (location: string) => {
    const [minPrice, maxPrice] = (selectedPriceRange || "")
      .split("-")
      .map(Number);
    const filteredProducts = products.filter((product) => {
      return (
        product.location === location &&
        (selectedCategory === null || product.category === selectedCategory) &&
        (selectedPriceRange === null ||
          (product.price >= minPrice && product.price <= maxPrice))
      );
    });
    setFilteredProducts(filteredProducts);
  };
  const handleCheckboxLocation = (location: string) => {
    const [minPrice, maxPrice] = (selectedPriceRange || "")
      .split("-")
      .map(Number);
    if (selectedLocation === location) {
      setSelectedLocation(null); // Uncheck the checkbox
      handleFilterLocation(location); // Reapply location filter
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      ); // Show products that match the selected category

      // Filter products based on category and price range
      const filteredProductsByCategoryAndPriceRange = products.filter(
        (product) =>
          product.category === selectedCategory &&
          (selectedPriceRange === null ||
            (product.price >= minPrice && product.price <= maxPrice)) &&
          (selectedLocation === null || product.location === selectedLocation)
      );
      setFilteredProducts(filteredProductsByCategoryAndPriceRange);
    } else {
      setSelectedLocation(location);
      handleFilterLocation(location);

      // Filter products based on selected location, selected category, and selected price range
      const filtered = products.filter(
        (product) =>
          product.location === location &&
          (selectedCategory === null ||
            product.category === selectedCategory) &&
          (selectedPriceRange === null ||
            (product.price >= minPrice && product.price <= maxPrice))
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
      // setSelectedPriceRange(null); // Reset selected price range
    } else {
      setSelectedCategory(category);

      // Filter products based on category and price range
      const minPrice = parseFloat(selectedPriceRange?.split("-")[0] || "0");
      const maxPrice = parseFloat(selectedPriceRange?.split("-")[1] || "0");

      const filteredProductsByCategoryAndPriceRange = products.filter(
        (product) =>
          product.category === category &&
          (selectedPriceRange === null ||
            (product.price >= minPrice && product.price <= maxPrice)) &&
          (selectedLocation === null || product.location === selectedLocation)
      );

      setFilteredProducts(filteredProductsByCategoryAndPriceRange);

      if (
        category === "Make Up" ||
        category === "Decoration" ||
        category === "Catering" ||
        category === "Wedding" ||
        category === "Photographer"
      ) {
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

  const RangePrices = [
    { label: "0", value: "0-1000000000000000000000000000" },
    { label: "10.000 - 1.000.000", value: "10000-1000000" },
    { label: "1.000.000 - 5.000.000", value: "1000000-5000000" },
    { label: "5.000.000 - 10.000.000", value: "5000000-10000000" },
    { label: "10.000.000 - 20.000.000", value: "10000000-20000000" },
    { label: "20.000.000 - 50.000.000", value: "20000000-50000000" },
    { label: "50.000.000 - 100.000.000", value: "50000000-100000000" },
  ];

  const CategoriesType = [
    {
      label: "Katering",
      value: "Catering",
    },
    { label: "Dekorasi", value: "Decoration" },
    { label: "Make Up", value: "Make Up" },
    { label: "Photographer", value: "Photographer" },
    { label: "Paket Pernikahan", value: "Wedding" },
    { label: "Sound", value: "Sound System" },
  ];

  const Locations = [
    {
      label: "Jakarta",
      value: "Jakarta",
    },
    { label: "Bogor", value: "Bogor" },
    { label: "Depok", value: "Depok" },
    { label: "Tangerang", value: "Tangerang" },
    { label: "Bekasi", value: "Bekasi" },
  ];

  return (
    <>
      <div className={styles.product}>
        <div className={styles.product__header}>
          <h1 className={styles.product__header__title}>
            Semua Produk ({filteredProducts.length})
          </h1>
          <div className={styles.product__header__search}>
            <i className="bx bx-search-alt" />
            <Input
              className={styles.product__header__search__input}
              name="search"
              type="text"
              placeholder="Cari Produk"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className={styles.product__main}>
          <div className={styles.product__main__filter}>
            <div className={styles.product__main__filter__data}>
              <div className={styles.product__main__filter__data__range}>
                <Select
                  label="Range Harga"
                  name="range"
                  value={selectedPriceRange}
                  onChange={(e) => handleFilterPriceRange(e.target.value)}
                  options={RangePrices}
                />
              </div>
              <h4 className={styles.product__main__filter__data__title}>
                Kategori
              </h4>
              <div className={styles.product__main__filter__data__list}>
                {CategoriesType.map((category) => (
                  <div
                    key={category.value}
                    className={styles.product__main__filter__data__list__item}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === { ...category }.value}
                      onChange={() =>
                        handleCheckboxCategory({ ...category }.value)
                      }
                    />
                    <label
                      className={
                        styles.product__main__filter__data__list__item__label
                      }
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {showLocationOptions && (
              <div className={styles.product__main__filter__data__down}>
                <h2 className={styles.product__main__filter__data__title}>
                  Pilih Lokasi
                </h2>
                <div className={styles.product__main__filter__data__down__list}>
                  {Locations.map((location) => (
                    <div
                      key={location.value}
                      className={
                        styles.product__main__filter__data__down__list__item
                      }
                    >
                      <input
                        type="checkbox"
                        checked={selectedLocation === { ...location }.value}
                        onChange={() =>
                          handleCheckboxLocation({ ...location }.value)
                        }
                      />
                      <label
                        className={
                          styles.product__main__filter__data__down__list__item__label
                        }
                      >
                        {location.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.product__main__content}>
            {displayedProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <Card product={product} />
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.product__bottom}>
          <button
            className={styles.product__bottom__pagination}
            onClick={handlePreviousClick}
            disabled={startIndex === 0}
          >
            Prev
          </button>
          <button
            onClick={handleNextClick}
            className={styles.product__bottom__pagination}
            disabled={startIndex + itemsPerPage >= filteredProducts.length}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductView;
