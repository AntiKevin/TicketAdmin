import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Cookies from 'js-cookie';
import axios from 'axios';


export default function Admin() {

//user states
const [userToken, setUserToken] = useState('')
const [userId, setUserId] = useState('')

useEffect(() => {
  setUserId(localStorage.getItem("user_id"))
  setUserToken(Cookies.get("auth_token"))
  
  const res = axios.get(`https://api-ticketvision.up.railway.app/Users/${userId}/`, {
    headers: {
      'Authorization': `Bearer ${userToken}`
    }
  });


  axios.post('https://api-ticketvision.up.railway.app/auth-refresh-token/', {
        refresh: userToken,
      })
      .then(function (response) {
        Cookies.set('auth_token', response.data.access);
        setUserToken(response.data.access)
      })
  })

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
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
