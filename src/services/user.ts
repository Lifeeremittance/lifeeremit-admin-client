import { Api } from ".././api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getUserInfo = async () => {
  const response = await Api.get(`/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getUsers = async () => {
  const response = await Api.get(`/users`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getUserById = async (id: string | undefined) => {
  const response = await Api.get(`/users/user/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const createUser = async (
  email_address: string,
  phone_number: string,
  companyName: string,
  address: string
) => {
  const response = await Api.post(
    `/users`,
    {
      email_address,
      phone_number,
      roles: ["user", "admin"],
      companyName,
      address,
    },
    {}
  );
  return response;
};
