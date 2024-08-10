import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwalComponent from "../../helper/SwalComponent";
import axios from "axios";
import setCookie from "../../hooks/setCookie";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validation = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = validation();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        SwalComponent("Login successful", "success");
        setFormData({ email: "", password: "" });
        setErrors({});
        navigate("/admin");
        setCookie("x-access-token", res.data.data.access_token);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again";
      SwalComponent(errorMsg, "error");
      setErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="h-svh max-w-full flex flex-col justify-center items-center">
          <h1 className="mb-8 text-2xl font-bold">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChangeFormData}
              />
            </label>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChangeFormData}
              />
            </label>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}

            <button
              type="submit"
              className={`btn btn-neutral`}
              disabled={isLoading}>
              {isLoading ? "Wait..." : "Login"}
            </button>
          </form>
          <p className="text-xs mt-8">
            Don’t have an account yet?{" "}
            <a href="/register" className="underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
