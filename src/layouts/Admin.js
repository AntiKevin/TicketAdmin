import React from "react";
import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserDataContext } from "context/userDataContext";
import { chamadosContext } from "context/chamadosContext";
import { refreshToken } from "utils/RefreshToken";

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

  const [user, setUser] = React.useState({});//User data State
  const [chamados, setChamados] = React.useState({});//User data State-


useEffect(() => {
  
  if (!Cookies.get("auth_token")){
  //checking if the auth token has expired and refreshing
    refreshToken()
  }})

  return (
    <>
    <UserDataContext.Provider value = {{user, setUser}}>
      <chamadosContext.Provider value = {{chamados, setChamados}}>
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
      </chamadosContext.Provider>
    </UserDataContext.Provider>
    </>
  );
}
