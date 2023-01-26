import { Api } from "../api";

export const requestToken = async (email_address: string) => {
  const response = await Api.post(
    `/auth/login/token`,
    {
      email_address,
      entity: "admin",
    },
    {}
  );
  return response;
};

export const validateToken = async (
  token: string,
  email_address: string | null
) => {
  const response = await Api.post(
    `/auth/login`,
    {
      email_address,
      token,
    },
    {}
  );
  return response;
};

export const subscribeToNewsletter = async (email_address: string) => {
  const response = await Api.post(
    `/newsletter`,
    {
      email_address,
    },
    {}
  );
  return response;
};