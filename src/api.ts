import _axios, { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

const baseURL = process.env["REACT_APP_API_URL"];
const instance = _axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

// AXIOS INTERCEPTOR FOR ADDING AUTHORIZATION HEADER
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const cookies = new Cookies();
    const token = cookies.get("jwt");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

const handleApiSuccess = (res: any) => {
  return res;
};

const handleApiError = (err: {
  response: { data: any; status: any; statusText: any };
  request: any;
  message: any;
}) => {
  let errorMessage = "";
  // request was manually cancelled in a `useEffect` hook
  if (_axios.isCancel(err)) {
    return; // fail silently
  }

  // console.log(err.response);
  // listen for 401 unauthorized response and expired jwt to bounce the user back to the login page
  if (err.response.data.message === "jwt expired") {
    window.location.href = "/signin";
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  if (err.response) {
    const apiError = err.response.data;
    // client received an error response (5xx, 4xx)
    console.error(
      `Server returned code ${err.response.status}` +
        `body was: ${apiError.message}`,
      "data:",
      apiError
    );
    errorMessage = apiError.message || "Something went wrong";
  } else if (err.request) {
    // client never received a response, or request never left
    console.error("An error occurred:", err.message);
  } else {
    // anything else
    console.error("Well, that was unexpected");
  }

  return `${errorMessage}`;
};

export const Api = {
  get: (endpoint: string, config: AxiosRequestConfig<any> | undefined) =>
    instance.get(endpoint, config).then(handleApiSuccess).catch(handleApiError),

  post: (
    endpoint: string,
    data: any,
    config: AxiosRequestConfig<any> | undefined
  ) =>
    instance
      .post(endpoint, data, config)
      .then(handleApiSuccess)
      .catch(handleApiError),

  put: (
    endpoint: string,
    data: any,
    config: AxiosRequestConfig<any> | undefined
  ) =>
    instance
      .put(endpoint, data, config)
      .then(handleApiSuccess)
      .catch(handleApiError),

  patch: (
    endpoint: string,
    data: any,
    config: AxiosRequestConfig<any> | undefined
  ) =>
    instance
      .patch(endpoint, data, config)
      .then(handleApiSuccess)
      .catch(handleApiError),

  delete: (endpoint: string, config: AxiosRequestConfig<any> | undefined) =>
    instance
      .delete(endpoint, config)
      .then(handleApiSuccess)
      .catch(handleApiError),
};
