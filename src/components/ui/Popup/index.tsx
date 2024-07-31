import { useEffect, useState } from "react";
const PopupWhatsApp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        if (currentScrollY < lastScrollY) {
          // User scroll up
          setShowPopup(true);
        } else {
          // User scroll down
          setShowPopup(false);
        }
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);
  return (
    <div className={`popup ${showPopup ? "show" : ""}`}>
      <a
        href="https://wa.me/6287888231078?text=Halo%20saya%20ingin%20menanyakan%20tentang%20produk%20anda"
        target="_blank"
      >
        <i className="bx bxl-whatsapp" />
      </a>
      <style jsx>{`
        .popup {
          i {
            font-size: 80px;
            color: #25d366;
          }
          position: fixed;
          bottom: 0;
          right: 0;
          margin-right: 10px;
          transform: translateY(100%);
          transition: transform 0.3s ease-in-out;
        }
        .popup.show {
          margin-bottom: 30px;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default PopupWhatsApp;
