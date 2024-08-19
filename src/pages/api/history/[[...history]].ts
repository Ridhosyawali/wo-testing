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
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, true && false, async () => {
      const { history }: any = req.query;
      if (history && history[0]) {
        const data = await retrieveDataById("histories", history[0]);
        responseApiSuccess(res, data);
      } else {
        const data = await retrieveData("histories");
        responseApiSuccess(res, data);
      }
    });
  } else if (req.method === "POST") {
    verify(req, res, true, async () => {
      const { data } = req.body;
      data.created_at = new Date().toLocaleString();
      await addData("histories", data, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { history }: any = req.query;
      const { data } = req.body;

      // Check if startDate or endDate are present in the data object
      if (data.hasOwnProperty("startDate") || data.hasOwnProperty("endDate")) {
        // If either startDate or endDate are present, remove them from the data object
        delete data.startDate;
        delete data.endDate;
      }

      await updateData("histories", history[0], data, (status: boolean) => {
        if (status) {
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
