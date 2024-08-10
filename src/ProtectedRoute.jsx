import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { Navigate, Route } from "react-router-dom";


const ProtectedRoute = (Component, ...rest) => {
  const cookies = cookieParser();
  const token = cookies.token;

  if (!token) {
    return <Navigate to={"/auth/login"} />;
  }

  try {
    const secret = import.meta.env.VITE_SECRET_JWT_KEY;
    jwt.verify(token, secret);
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } catch (e) {
    console.error(e);
    return <Navigate to="/auth/login" />;
  }
};

export default ProtectedRoute;
