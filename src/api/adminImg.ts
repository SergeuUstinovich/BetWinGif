import axios from "axios";
import { adImage } from "../types/adminImgType";

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

export const unifiedPicture = (pictures: adImage[]) => {
  return axios
    .post(`${api_url}/api/createFullPicture/`, {
      pictures,
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

export const deletePicture = (token: string, full_picture_id: number) => {
  return axios
    .post(`${api_url}/api/delete_fullpicture/`, {
      token,
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

export const filterPicture = (
  token: string,
  country: string,
  language: string,
  value: string,
  format: string,
  topic: string
) => {
  return axios
    .post(`${api_url}/api/filter_admin_picture/`, {
      token,
      country,
      language,
      value,
      format,
      topic
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

export const staticGifDemo = (token: string, create_picture_id?:number) => {
  return axios.post(`${api_url}/api/create_statick_gif_test/`, {
      token,
      create_picture_id,
  })
  .then(response => {
      const data = response.data.file_url
      return data
  })
  .catch(error => {
      const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
      throw new Error(errorMessages);
  })
}

export function allGif() {
  return axios
    .get(`${api_url}/api/all_gif/`)
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

export const filterGif = (
  token: string,
  country: string,
  language: string,
  value: string,
  format: string,
  topic: string
) => {
  return axios
    .post(`${api_url}/api/filter_admin_gif/`, {
      token,
      country,
      language,
      value,
      format,
      topic
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

export const GifDemo = (token: string, create_picture_id?:number) => {
  return axios.post(`${api_url}/api/create_gif/`, {
      token,
      create_picture_id,
  })
  .then(response => {
      const data = response.data.file_url
      return data
  })
  .catch(error => {
      const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
      throw new Error(errorMessages);
  })
}
