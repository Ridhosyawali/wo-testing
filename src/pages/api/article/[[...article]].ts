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
    const { article }: any = req.query;
    if (article && article[0]) {
      const data = await retrieveDataById("articles", article[0]);
      responseApiSuccess(res, data);
    } else {
      const data = await retrieveData("articles");
      responseApiSuccess(res, data);
    }
  } else if (req.method === "POST") {
    verify(req, res, true, async () => {
      let data = req.body;
      data.created_at = new Date();
      data.updated_at = new Date();

      await addData("articles", data, (status: boolean, result: any) => {
        if (status) {
          responseApiSuccess(res, { id: result.id });
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { article }: any = req.query;
      const { data } = req.body;
      await updateData("articles", article[0], data, (status: boolean) => {
        if (status) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "DELETE") {
    verify(req, res, true, async () => {
      const { article }: any = req.query;
      await deleteData("articles", article[0], (result: boolean) => {
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
