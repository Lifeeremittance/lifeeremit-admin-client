import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getProviders = async () => {
  const response = await Api.get(`/providers?is_active=true`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getProviderById = async (id: string | undefined) => {
  const response = await Api.get(`/providers/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const createProvider = async (name: string, logo: string) => {
  const response = await Api.post(
    `/providers`,
    {
      name,
      logo,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};

export const updateProvider = async (id: string, object: any) => {
  const response = await Api.patch(`/providers/${id}`, object, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response;
}