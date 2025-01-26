import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postReq } from "../../../Api/axios";
import { toast } from "react-toastify";
import { useState } from "react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true); // Loader start
    try {
      const response = await postReq('/auth/login', data);
      toast.success("Login successfully");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false); // Loader stop
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div> // Loader
            ) : (
              "Submit"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account? 
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-600 hover:underline ml-1"
          >
            Sign up
          </button>
        </p>

        {/* Forgot Password Link */}
        <p className="text-sm text-center text-gray-600 mt-2">
          <button
            onClick={() => navigate('/forgotPassword')}
            className="text-indigo-600 hover:underline"
          >
            Forgot your password?
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
