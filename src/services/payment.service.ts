import { NextFunction, Request, Response } from "express";
import mercadopago from "mercadopago";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { PreferenceRequest } from "../types";
import { DateTime } from "luxon";

export const createPreference = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    console.log(DateTime.now().toISO());
    const { items, shipments }: PreferenceRequest = req.body;
    let preference: CreatePreferencePayload = {
      items,
      back_urls: {
        success: "https://dinokids.site/payment/feedback",
        failure: "https://dinokids.site/payment/feedback",
        pending: "https://dinokids.site/payment/feedback",
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_types: [{ id: "ticket" }],
      },
      shipments,
      expires: true,
      expiration_date_from: DateTime.now().toISO() as string,
      expiration_date_to: DateTime.now().plus({ minutes: 15 }).toISO() as string
    };
    const response = await mercadopago.preferences.create(preference);
    return res.json({
      id: response.body.id,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

export const sendFeedback = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    return res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });
  } catch (error) {
    return res.send(error);
  }
};
