import { NextFunction, Request, Response } from "express";
import mercadopago from "mercadopago";
import { PreferencePaymentMethods } from "mercadopago/models/preferences/create-payload.model";

type Item = {
  title: string;
  unit_price: number;
  quantity: number;
};

type Preference = {
  items: Item[];
  back_urls: {
    success: "https://dinokids.site/payment/feedback";
    failure: "https://dinokids.site/payment/feedback";
    pending: "https://dinokids.site/payment/feedback";
  };
  auto_return: "approved";
  payment_methods: PreferencePaymentMethods
};

export const createPreference = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const list: Item[] = req.body;
    let preference: Preference = {
      items: list,
      back_urls: {
        success: "https://dinokids.site/payment/feedback",
        failure: "https://dinokids.site/payment/feedback",
        pending: "https://dinokids.site/payment/feedback",
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_types: [
          { id: "ticket" }
        ]
      }
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


