import styles from "./DetailPanduan.module.scss";

const PanduanPemesanan = () => {
  return (
    <>
      <div className={styles.detail}>
        <div className={styles.detail__main}>
          <div className={styles.detail__main__desc}>
            <h2>Panduan Pemesanan</h2>
            <ul className={styles.detail__main__desc__list}>
              <li>
                Lakukan Registrasi jika anda belum punya akun, jika sudah punya
                akun silahkan login
              </li>
              <li>Pilih menu produk untuk melihat daftar produk</li>
              <li>Pilih produk yang anda ingin pesan</li>
              <li>Pilih icon keranjang pada navbar diatas</li>
              <li>Pilih button checkout</li>
              <li>
                Tambahkan alamat anda terlebih dahulu, jika anda belum punya
              </li>
              <li>Jika sudah mempunyai alamat silahkan pilih alamat anda</li>
              <li>Pilih tanggal pada kalender yang tersedia</li>
              <li>Periksa ringkasan biaya</li>
              <li>Pilih button Proses Payment</li>
              <li>Jika pesanan sudah berhasil maka hubungi kami segera</li>
              <li>Dan periksa status pada menu pesanan</li>
              <li>Terima Kasih</li>
            </ul>
            <h2>Perubahan Jadwal</h2>
            <ul className={styles.detail__main__desc__list}>
              <li>
                Hubungi admin kami secepatnya melalui Kontak yang tersedia
              </li>
              <li>Dalam kurun waktu 2x24 jam dari pemesanan</li>
              <li>Terima Kasih</li>
            </ul>
            <h2>Pembatalan Pemesanan</h2>
            <ul className={styles.detail__main__desc__list}>
              <li>
                Hubungi admin kami secepatnya melalui Kontak yang tersedia
              </li>
              <li>Dalam kurun waktu 1x24 jam dari pemesanan</li>
              <li>Terima Kasih</li>
            </ul>
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

export default PanduanPemesanan;
