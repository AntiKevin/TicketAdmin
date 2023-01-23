import Cookies from "js-cookie";

export const isAuthenticated = () => {
    if (Cookies.get("auth_token")) {
        return true;
    }
    else{
        return false;
    }
};