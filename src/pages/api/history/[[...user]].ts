import {
  deleteData,
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
  if (req.method === "POST") {
    verify(req, res, true, async () => {
      const { user }: any = req.query;
      const { data } = req.body;
      const userID: any = await retrieveDataById("users", user[0]);
      let data2 = {};
      const newHistory = {
        ...data?.history,
        createHistory: new Date(),
      };

      if (userID.history) {
        data2 = {
          history: [...userID.history, newHistory],
        };
      } else {
        data2 = { history: [newHistory] };
      }

      await updateData("users", user[0], data2, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { user }: any = req.query;
      const { data } = req.body;
      await updateData("users", user[0], data, (status: boolean) => {
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
