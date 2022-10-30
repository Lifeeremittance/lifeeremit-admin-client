import { Api } from "../api";
// import Cookie from "universal-cookie";

// const cookie = new Cookie();
// const jwt = cookie.get("jwt");

// export const getSubscriptions = async () => {
//   const response = await Api.get(`/subscriptions`, {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   });
//   return response.data.data;
// };

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
