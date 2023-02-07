import Cookies from "js-cookie";
import axios from "axios";


export const refreshToken = async () => {
    //refresh token async function
    const userRefreshToken = Cookies.get("refresh_token")
    
    await axios.post('https://api-ticketvision.up.railway.app/auth-refresh-token/', {
        refresh: userRefreshToken,
      })
      .then(function (response) {
        Cookies.set('auth_token', response.data.access, {
          expires: 0.000694444});
      })}