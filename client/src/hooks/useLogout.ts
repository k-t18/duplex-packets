import axios from "axios";
import { useState } from "react";

const useLogout = () => {
  const [isTabClose, setIsTabClose] = useState(false);
  const handleVisibilityChange = () => {
    console.log("uselogout");
    // if (document.visibilityState === "hidden") {
    //   setIsTabClose(true);
    // } else {
    //   setIsTabClose(false);
    // }
  };
  const handleBeforeUnload = async () => {
    // const body = JSON.stringify({});
    // const url = `${process.env.REACT_APP_API_URL}/api/auth/logout`;
    // const blob = new Blob([body], { type: "application/json" });
    // navigator.sendBeacon(url, blob);
    // localStorage.removeItem("isAuthenticated");

    const logout = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/logout`, undefined, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return { handleBeforeUnload };
};
export default useLogout;
