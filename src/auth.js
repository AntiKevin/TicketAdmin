import Cookies from "js-cookie";

export const isAuthenticated = () => {
    if (Cookies.get("refresh_token")) {
        return true;
    }
    else{
        return false;
    }
};