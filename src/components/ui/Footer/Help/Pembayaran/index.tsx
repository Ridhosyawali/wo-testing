import styles from "./DetailPembayaran.module.scss";

const PilihanPembayaran = () => {
  return (
    <>
      <div className={styles.detail}>
        <div className={styles.detail__main}>
          <div className={styles.detail__main__desc}>
            <h2>Panduan Pemesanan</h2>
            <p className={styles.detail__main__desc__desc}>
              Kami ingin memudahkan proses pemesanan paket pernikahan dan
              perlengkapan pernikahan favorit Anda, jadi kami menerima metode
              pembayaran berikut:
            </p>

            <h3 className={styles.detail__main__desc__title}>Transfer Bank</h3>
            <ul className={styles.detail__main__desc__list}>
              <li>BCA</li>
              <li>Mandiri</li>
              <li>BRI</li>
              <li>BNI</li>
              <li>PERMATA BANK</li>
            </ul>
            <h3 className={styles.detail__main__desc__title}>E-wallet</h3>
            <ul className={styles.detail__main__desc__list}>
              <li>GOPAY</li>
              <li>OVO</li>
              <li>DANA</li>
              <li>LINK AJA</li>
            </ul>
            <h3 className={styles.detail__main__desc__title}>QRIS</h3>
          </div>
          <hr />
          <div className={styles.detail__main__contact}>
            <div className={styles.detail__main__contact__us}>
              <h2>Contact Us</h2>
              <a
                href="https://wa.me/6287888231078?text=Halo%20saya%20ingin%20menanyakan%20tentang%20produk%20anda"
                target="_blank"
                className={styles.detail__main__contact__us}
              >
                <i className="bx bx-message-detail" />
                <p className={styles.detail__main__contact__us__title}>
                  Chat dengan kami
                </p>
                <p>8:00 - 20:00</p>
                <p>Setiap Hari</p>
              </a>
            </div>
            <div className={styles.detail__main__contact__us}>
              <a
                href="https://wa.me/6287888231078"
                target="_blank"
                className={styles.detail__main__contact__us}
              >
                <i className="bx bx-phone" />
                <p className={styles.detail__main__contact__us__title}>
                  Hubungi Kami
                </p>
                <p>+62-878-8823-1078</p>
                <p>8:00 - 17:00</p>
                <p>Senin - Jumat</p>
              </a>
            </div>
            <div className={styles.detail__main__contact__us}>
              <a
                href="https://www.google.com/maps/place/Rira+griya+rias+pengantin/@-6.2646054,106.7941219,20.89z/data=!4m6!3m5!1s0x2e69f1477032a773:0x70333526419828ed!8m2!3d-6.264686!4d106.7942384!16s%2Fg%2F11h9m_f5wl?entry=ttu"
                target="_blank"
                className={styles.detail__main__contact__us}
              >
                <i className="bx bx-map" />
                <p className={styles.detail__main__contact__us__title}>
                  Temukan toko kami
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PilihanPembayaran;
