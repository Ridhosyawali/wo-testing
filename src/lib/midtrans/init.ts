import midtransCLient from "midtrans-client";

const snap = new midtransCLient.Snap({
  // Set to true if you want Production Environment
  isProduction: true,
  serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || "",
});

export default snap;
