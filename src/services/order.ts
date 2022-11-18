import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getOrders = async () => {
  const response = await Api.get(`/orders`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getCustomerOrders = async (user: string | undefined) => {
  const response = await Api.get(`/orders?user=${user}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getOrdersByProvider = async (provider: string | undefined) => {
  const response = await Api.get(`/orders?provider=${provider}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getOrdersByProduct = async (product: string | undefined) => {
  const response = await Api.get(`/orders?product=${product}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getOrdersByStatus = async (status: string | undefined) => {
  const response = await Api.get(`/orders?status=${status}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const createOrder = async (
  provider: string,
  product: string,
  country: string,
  company_name: string,
  company_address: string,
  contact_name: string,
  phone_number: string,
  email_address: string,
  reason: string,
  referenceNumber: number,
  invoice_number: number,
  invoice: string
) => {
  const response = await Api.post(
    `/orders`,
    {
      provider,
      product,
      country,
      company_name,
      company_address,
      contact_name,
      phone_number,
      email_address,
      reason,
      referenceNumber,
      invoice_number,
      invoice,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};

export const updateOrder = async (id: any, updateDto: any) => {
  const response = await Api.patch(`/orders/${id}`, updateDto, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};
