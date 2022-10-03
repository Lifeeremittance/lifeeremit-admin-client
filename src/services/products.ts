import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getProducts = async (provider: string | undefined) => {
  const response = await Api.get(`/products?provider=${provider}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const createProduct = async (
  name: string,
  provider: string | undefined
) => {
  const response = await Api.post(
    `/products`,
    {
      name,
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
