import SuccessView from "@/components/views/Transaction/Success";
import ordersServices from "@/services/orders";
import transactionServices from "@/services/transaction";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TransactionSuccessPage = () => {
  const { query, isReady } = useRouter();
  const checkPayment = async () => {
    await ordersServices.updateTransaction(query.order_id as string);
  };
  useEffect(() => {
    if (isReady) {
      checkPayment();
    }
  });
  //React Hook useEffect has a missing dependency: 'checkPayment'. Either include it or remove the dependency array.
  return (
    <>
      <SuccessView />
    </>
  );
};

export default TransactionSuccessPage;
