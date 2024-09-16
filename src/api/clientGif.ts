import axios from "axios";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export const staticGif = (
  token: string,
  country?: string,
  language?: string,
  value?: string,
  format?: string,
  topic?: string
) => {
  return axios
    .post(`${api_url}/api/create_statick_gif_test/`, {
      token,
      country,
      language,
      value,
      format,
      topic,
    })
    .then((response) => {
      const data = response.data.file_urls;
      return data;
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(", ");
      throw new Error(errorMessages);
    });
};

export function gifAdd(
  token: string,
  country?: string,
  language?: string,
  value?: string,
  format?: string,
  topic?: string
) {
  return axios
    .post(`${api_url}/api/create_gif/`, {
      token,
      country,
      language,
      value,
      format,
      topic,
    })
    .then((response) => {
      const data = response.data.file_urls;
      return data
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(", ");
      throw new Error(errorMessages);
    });
}

export function createPromorcode(token: string, promocode: string) {
  return axios
    .post(`${api_url}/api/create_promocode/`, {
      token,
      promocode,
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(", ");
      throw new Error(errorMessages);
    });
}

export function downloadImg(
  file_name: string
) {
  return axios
    .post(`${api_url}/api/download_image/`, {
      file_name,
    }, { responseType: 'blob' })
    .then((response) => {
      const data = URL.createObjectURL(response.data);
      return data
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(", ");
      throw new Error(errorMessages);
    });
}
