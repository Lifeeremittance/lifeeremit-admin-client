import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getCountries = async () => {
  const response = await Api.get(`/countries`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const createCountry = async (
  countryName: string,
  countryCode: string,
  countryFlag: string
) => {
  const response = await Api.post(
    `/countries`,
    {
      countryName,
      countryCode,
      countryFlag,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};
