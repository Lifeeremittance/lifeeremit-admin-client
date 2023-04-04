import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getProducts = async (provider: string | undefined) => {
  const response = await Api.get(`/products?provider=${provider}&is_active=true`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getAllProducts = async () => {
  const response = await Api.get(`/products?is_active=true`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const createProduct = async (
  name: string,
  email: string,
  provider: string | undefined
) => {
  const response = await Api.post(
    `/products`,
    {
      name,
      email,
      provider,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};

export const updateProduct = async (id: string, object: any) => {
  const response = await Api.patch(`/products/${id}`, object, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};
