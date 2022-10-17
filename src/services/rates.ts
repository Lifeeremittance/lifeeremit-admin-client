import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getRates = async (provider: any) => {
  const response = await Api.get(`/rates/${provider}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const editRate = async (object: any) => {
  const response = await Api.put(
    `/rates`,
    {
      ...object,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};
