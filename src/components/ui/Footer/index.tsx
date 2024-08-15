import { Lato } from "next/font/google";
import Styles from "./Footer.module.scss";
import Link from "next/link";

const Footerview = () => {
  return (
    <footer>
      <div className={Styles.footer}>
        <div className={Styles.footer__content}>
          {/* <div>
            <h3>Tentang Kami</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod nunc in lorem bibendum, a laoreet nisi tempus.
            </p>
          </div> */}
          <div className={Styles.footer__content__contact}>
            <h3 className={Styles.footer__content__title}>Kontak Kami</h3>
            <ul className={Styles.footer__content__contact__list}>
              <li>
                <i className="bx bx-phone" /> Telepon: +6287888231078
              </li>
              <li>
                <i className="bx bx-envelope" /> Email:
                weddingorganizer@gmail.com
              </li>
              <li>
                <i className="bx bx-map" /> Alamat: Jl. H Nawi 1 No.32 Rt
                006/002 Gandaria Selatan
              </li>
            </ul>
          </div>
          <div className={Styles.footer__content__help}>
            <h3 className={Styles.footer__content__title}>Bantuan</h3>
            <ul className={Styles.footer__content__help__list}>
              <li>
                <Link href="/help/panduan_pemesanan">Panduan Pemesanan</Link>
              </li>
              <li>
                <Link href="/help/pilihan_pembayaran">Pilihan Pembayaran</Link>
              </li>
            </ul>
          </div>
          <div className={Styles.footer__content__social}>
            <h3 className={Styles.footer__content__title}>Ikuti Kami</h3>
            <div className={Styles.footer__content__social__list}>
              <a
                href="https://www.instagram.com/desi_rira/"
                target="_blank"
                className={Styles.footer__content__social__link}
              >
                <i className="bx bxl-instagram" />
                Instagram
              </a>
            </div>
          </div>
          <div className={Styles.footer__content__location}>
            <h3 className={Styles.footer__content__title}>Lokasi Kami</h3>
            <a
              href="https://www.google.com/maps/place/Rira+griya+rias+pengantin/@-6.2646054,106.7941219,20.89z/data=!4m6!3m5!1s0x2e69f1477032a773:0x70333526419828ed!8m2!3d-6.264686!4d106.7942384!16s%2Fg%2F11h9m_f5wl?entry=ttu"
              target="_blank"
              className={Styles.footer__content__location__link}
            >
              <i className="bx bx-map-alt" />
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footerview;
