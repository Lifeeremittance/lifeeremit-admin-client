import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getCharges = async () => {
  const response = await Api.get(`/charges`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const editCharge = async (
  serviceCharge: string,
  productInterest: string,
  dollarRate: string
) => {
  const response = await Api.put(
    `/charges`,
    {
      serviceCharge,
      productInterest,
      dollarRate,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};
