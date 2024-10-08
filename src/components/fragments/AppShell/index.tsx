import Toaster from "@/components/ui/Toaster";
import { Lato } from "next/font/google";
import { useRouter } from "next/router";
import Navbar from "../Navbar";
import { useContext, useEffect } from "react";
import { ToasterContext } from "@/context/ToasterContext";
import { ToasterType } from "@/types/toaster.type";
import Footerview from "@/components/ui/Footer";
import PopupWhatsApp from "@/components/ui/Popup";
import Head from "next/head";

const inter = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

const disableNavbar = ["auth", "admin"];
const disableFooter = ["auth", "admin", "cart", "checkout", "transaction"];
const disableWhatsapp = ["auth", "admin"];

type Proptypes = {
  children: React.ReactNode;
};

const AppShell = (props: Proptypes) => {
  const { children } = props;
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);

  return (
    <>
      <Head>
        <link rel="icon" href="/logorira.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={inter.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
        {!disableFooter.includes(pathname.split("/")[1]) && <Footerview />}
        {!disableWhatsapp.includes(pathname.split("/")[1]) && <PopupWhatsApp />}
      </div>
    </>
  );
};

export default AppShell;
