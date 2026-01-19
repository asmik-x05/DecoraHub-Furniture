import axios from "axios";
import config from "../config/config.js";

const paymentViaKhalti = async (data) => {
  const body = {
    return_url: config.appUrl,
    website_url: config.appUrl,
    amount: data.amount * 100,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: {
      name: data.customer.name,
      email: data.customer.email,
      phone: data.customer.phone,
    },
  };

  const response = await axios.post(config.khalti.apiurl, body, {
    headers: {
      Authorization: `Key ${config.khalti.secret}`,
    },
  });
  return response.data;
};

export { paymentViaKhalti };
