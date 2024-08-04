import SuccessView from "@/components/views/Transaction/Success";
import transactionServices from "@/services/transaction";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TransactionSuccessPage = () => {
  const { query, isReady } = useRouter();
  const checkPayment = async () => {
    await transactionServices.updateTransaction(query.order_id as string);
  };
  useEffect(() => {
    if (isReady) {
      checkPayment();
    }
  }, [isReady]);
  //React Hook useEffect has a missing dependency: 'checkPayment'. Either include it or remove the dependency array.
  return (
    <>
      <SuccessView />
    </>
  );
};

export default TransactionSuccessPage;
