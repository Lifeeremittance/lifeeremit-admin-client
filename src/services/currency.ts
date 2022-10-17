import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getCurrencies = async () => {
  const response = await Api.get(`/currencies`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const createCurrency = async (
  currencyName: string,
  currencyCode: string,
  currencyImage: string
) => {
  const response = await Api.post(
    `/currencies`,
    {
      currencyName,
      currencyCode,
      currencyImage,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};
