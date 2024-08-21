import axios from "axios";

export function googleAuth(response: any) {
    return axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      })
      .then((response) => {
        const email = response.data.email;
        const username = response.data.given_name;
        const lastname = response.data.family_name;
        const id = response.data.sub;
        return {
          email,
          username,
          lastname,
          id,
        };
      })
      .catch((error) => {
        if (error) {
          throw new Error("Ошибка");
        }
      });
  }