import axios from "axios";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

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

  export function googleAuthUser(email: string, username: string) {
    return axios.post(`${api_url}/api/google_auth/`,{
      email,
      username,
    })
    .then(response => {
        const data  = response.data.token
        console.log(data)
        return data
    })
    .catch(error => {
        const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
        throw new Error(errorMessages);
    })
}