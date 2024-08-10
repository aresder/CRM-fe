import axios from "axios";
import { useState } from "react";
import SwalComponent from "../../helper/SwalComponent";

const RegisterPage = () => {
  const intialFormData = {
    full_name: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(intialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validation = () => {
    const errors = {};
    if (!formData.full_name.trim()) {
      errors.full_name = "Name is required!";
    }
    if (!formData.email) {
      errors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

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
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormData(intialFormData);
      setErrors({});
      SwalComponent("Registrasion Successful", "success");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({});
        const res = await error.response.data.message;
        const errMsg = res[0].toUpperCase() + res.substring(1);
        SwalComponent(errMsg, "error");
      } else {
        SwalComponent("Registrasion failed. Please try again", "error");
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="h-svh max-w-full flex flex-col justify-center items-center">
          <h1 className="mb-8 text-2xl font-bold">Register...</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {/* Full name */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Full name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </label>
            {errors.full_name && (
              <p className="text-red-500 text-sm">{errors.full_name}</p>
            )}

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Min. 6 Character"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <button
              type="submit"
              className={`btn btn-neutral hover:text-white`}
              disabled={isLoading}>
              {isLoading ? "Submiting..." : "Register"}
            </button>
          </form>
          <p className="text-xs mt-8">
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-blue-500">
              Login here..
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
