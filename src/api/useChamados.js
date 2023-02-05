import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { chamadosContext } from 'context/chamadosContext';

export default function useChamados() {
  const { setChamados } = useContext(chamadosContext);

  useEffect(() => {
    //const userId = JSON.parse(localStorage.getItem("user_data"))
    async function fetchData() {
      try {
        const response = await axios.get(`https://api-ticketvision.up.railway.app/chamados/`, {
            headers: {
              'Authorization': 'Bearer ' + Cookies.get('auth_token')}
        });
        const data = await response.data;
        setChamados(data);
      } catch (error) {
        console.error(error);
      }
      
    }
    fetchData();
  }, [setChamados]);
}