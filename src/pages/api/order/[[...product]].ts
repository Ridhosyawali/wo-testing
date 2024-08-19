import { retrieveDataById, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "@/utils/verifyToken";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    verify(req, res, true, async () => {
      const { product }: any = req.query;
      const { data } = req.body;
      const productsID: any = await retrieveDataById("products", product[0]);
      let data2 = {};
      const newAgenda = {
        ...data?.agenda,
        startDate: data?.startDate,
        endDate: data?.endDate,
      };

      if (
        productsID.agenda &&
        productsID.agenda.some((agenda: any) => {
          return (
            agenda.startDate === newAgenda.startDate &&
            agenda.endDate === newAgenda.endDate &&
            agenda.agenda === newAgenda.agenda
          );
        })
      ) {
        // Jika data agenda yang baru sama dengan yang sudah ada sebelumnya, maka kirimkan peringatan gagal mengUpdate
        responseApiFailed(res);
        return;
      }

      if (productsID.agenda) {
        data2 = { agenda: [...productsID.agenda, newAgenda] };
      } else {
        data2 = { agenda: [newAgenda] };
      }

      await updateData("products", product[0], data2, (result: boolean) => {
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
