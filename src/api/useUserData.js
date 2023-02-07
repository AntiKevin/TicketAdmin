import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { UserDataContext } from 'context/userDataContext';
import { refreshToken } from 'utils/RefreshToken';

export default function useUserData() {
  const { setUser } = useContext(UserDataContext);

  useEffect(() => {
    const userId = localStorage.getItem("user_id")
    async function fetchData() {
      try {
        if(Cookies.get('auth_token')){
        const response = await axios.get(`https://api-ticketvision.up.railway.app/users/${userId}/`, {
            headers: {
              'Authorization': 'Bearer ' + Cookies.get('auth_token')}
        });
        const data = await response.data;
        setUser(data);
      }
      else{
        refreshToken()
      }
      } catch (error) {
        console.error(error);
      }
      
    }
    fetchData();
  }, [setUser]);
}
