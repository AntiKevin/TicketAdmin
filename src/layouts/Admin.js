import React from "react";
import axios from 'axios';
import { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";

// views
import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Cookies from 'js-cookie';


export default function Admin() {
  //defining the useHistory hook as a variable
  const history = useHistory();
  
  const user_data = JSON.parse(localStorage.getItem("user_data"))

  const refreshToken = async (userRefreshToken) => {
    //refresh token async function
    await axios.post('https://api-ticketvision.up.railway.app/auth-refresh-token/', {
        refresh: userRefreshToken,
      })
      .then(function (response) {
        Cookies.set('auth_token', response.data.access, {
          expires: 0.00347222});
      })
  }
  
  const getUserData = async (userId, userToken) => {
    const res = await axios.get(`https://api-ticketvision.up.railway.app/Users/${userId}/`, {
    headers: {
      'Authorization': `Bearer ${userToken}`
    }})
    return (res.data)
  }


useEffect(() => {
  //all api auth credentials
  const userId = localStorage.getItem("user_id")
  const userToken = Cookies.get("auth_token")
  const userRefreshToken = Cookies.get("refresh_token")
  
  if (!Cookies.get("auth_token")){
  //checking if the auth token has expired and refreshing
    refreshToken(userRefreshToken)
  }
  //storing and accessing the userData object
  getUserData(userId, userToken)
  .then(function (userData) {
    localStorage.setItem("user_data", JSON.stringify(userData))
  })
  .catch(function (error) {
    //refreshing token if the actual token has expired for this user
    if (error.code === '401') {
      history.go(0)
    }})
  })

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar userData = {user_data} />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/chamados" exact component={Tables} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
}
