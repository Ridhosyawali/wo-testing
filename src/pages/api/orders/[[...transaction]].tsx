import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "@/utils/verifyToken";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseApi";
import { createTransaction, getTransaction } from "@/lib/midtrans/transaction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, true && false, async () => {
      const { transaction }: any = req.query;
      if (transaction && transaction[0]) {
        const data = await retrieveDataById("transactions", transaction[0]);
        responseApiSuccess(res, data);
      } else {
        const data = await retrieveData("transactions");
        responseApiSuccess(res, data);
      }
    });
  } else if (req.method === "POST") {
    verify(req, res, false, async (decoded: { id: string }) => {
      const payload = req.body;
      delete payload.user.address.isMain;
      const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
      const params = {
        transaction_details: {
          order_id: generateOrderId,
          gross_amount: payload.transaction.total,
        },
        customer_details: {
          first_name: payload.user.fullname,
          email: payload.user.email,
          phone: payload.user.phone,
          shipping_address: {
            first_name: payload.user.address.recipient,
            phone: payload.user.address.phone,
            address: payload.user.address.addressLine,
          },
          item_details: payload.transaction.items,
        },
      };
      createTransaction(
        params,
        async (transaction: { token: string; redirect_url: string }) => {
          const data = {
            ...payload.transaction,
            userId: decoded.id,
            fullname: payload.user.fullname,
            address: payload.user.address,
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            order_id: generateOrderId,
            createdAt: new Date().toLocaleString(),
            status: "pending",
          };

          await addData("transactions", data, (result: boolean) => {
            if (result) {
              // Update data user untuk mengosongkan carts
              const updateDataUser = {
                carts: [],
              };
              updateData(
                "users",
                decoded.id,
                updateDataUser,
                (resultUpdate: boolean) => {
                  if (resultUpdate) {
                    responseApiSuccess(res, {
                      token: transaction.token,
                      redirect_url: transaction.redirect_url,
                    });
                  } else {
                    responseApiNotFound(res);
                  }
                }
              );
            } else {
              responseApiNotFound(res);
            }
          });
        }
      );
    });
  } else if (req.method === "PUT") {
    verify(req, res, false, async () => {
      const order_id: any = req.query.order_id;
      getTransaction(`${order_id}`, async (result: any) => {
        console.log(result);
        const status = result.transaction_status;
        const transactions = await retrieveData("transactions");
        const transactionToUpdate = transactions.find(
          (transaction: any) => transaction.order_id === order_id
        );

        if (transactionToUpdate) {
          const data = { status };
          await updateData(
            "transactions",
            transactionToUpdate.id,
            data,
            (result: boolean) => {
              if (result) {
                responseApiSuccess(res, {
                  message: "Status transaksi berhasil diupdate",
                });
              } else {
                responseApiNotFound(res);
              }
            }
          );
        }
      });
    });
  } else if (req.method === "DELETE") {
    verify(req, res, true, async () => {
      const { transaction }: any = req.query;
      await deleteData("transactions", transaction[0], (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else {
    responseApiMethodNotAllowed(res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
