import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getCountries = async () => {
  const response = await Api.get(`/countries?is_active=true`, {
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

export const updateCountry = async (id: string, object: any) => {
  const response = await Api.patch(`/countries/${id}`, object, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};
