import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { isAuthenticated } from "../../auth";
//hooks
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default function Login() {
  //router history
  const history = useHistory();
  //user States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //loading state
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/dashboard');}
  })

  //Login main function
  const loginJWT = async (e) => {
    //preventing the default reload
    e.preventDefault();
    //set loading state
    setIsLoading(true); 

    await axios.post('https://api-ticketvision.up.railway.app/auth-token/', {
      username: username,
      password: password,
    })
    .then(function (response) {
      Cookies.set('auth_token', response.data.access, {
        expires: 0.00347222});
      Cookies.set('refresh_token', response.data.refresh, {
          expires: 1});
      //storing user id from jwt token
      localStorage.setItem('user_id', jwt_decode(response.data.access).user_id);
    })
    .catch(function () {
      setIsLoading(false);
    })
    .finally(() => {
      if(isAuthenticated()){
        history.push('/dashboard');
      }})
    }

  //jsx area

  const loadingForm = () => {
    return (
      <div>Carregando...</div>
    )
  }
  
  const defaultForm = () => {
    return (
      <form>
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Username
          </label>
          <input
            type="email"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Email"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
            type="password"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              id="customCheckLogin"
              type="checkbox"
              className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
            />
            <span className="ml-2 text-sm font-semibold text-blueGray-600">
              Lembrar
            </span>
          </label>
        </div>

        <div className="text-center mt-6">
          <button
            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            type="submit"
            onClick={loginJWT}
          >
            Login
          </button>
        </div>
      </form>
    )
  }


  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                </div>
                <div className="btn-wrapper text-center">
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                </div>
                {isLoading ? loadingForm() : defaultForm()}
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2 text-right">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
