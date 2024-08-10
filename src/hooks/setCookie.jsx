import Cookies from "js-cookie";

const setCookie = (name, value) => {
  Cookies.set(name, value, {
    expires: 1,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export default setCookie;
