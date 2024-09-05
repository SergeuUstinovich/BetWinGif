import axios from "axios";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export function loadingImg(formData: FormData) {
  return axios
    .post(`${api_url}/api/load_picture/`, formData)
    .then(() => undefined);
}

export function allPicture() {
  return axios
    .get(`${api_url}/api/all_picture/`)
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

export const unifiedPicture = (
  picture_id: number,
  country: string,
  language: string,
  value: string,
  format: string,
  topic: string,
  color: string,
  left: string,
  right: string,
  top: string,
  bottom: string,
  size?: number
) => {
  return axios
    .post(`${api_url}/api/createFullPicture/`, {
      picture_id,
      country,
      language,
      value,
      format,
      topic,
      color,
      left,
      right,
      top,
      bottom,
      size
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
};

export const allUnifiedPicture = (
  full_picture_id: number,
  country?: string,
  language?: string,
  value?: string,
  format?: string,
  topic?: string,
  color?: string,
  left?: string,
  right?: string,
  top?: string,
  bottom?: string,
  size?: number
) => {
  return axios
    .post(`${api_url}/api/createFullPicture/`, {
      full_picture_id,
      country,
      language,
      value,
      format,
      topic,
      color,
      left,
      right,
      top,
      bottom,
      size
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
};

export const getPictureId = (full_picture_id: number) => {
  return axios
    .post(`${api_url}/api/get_is_publish/`, {
      full_picture_id,
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
};
