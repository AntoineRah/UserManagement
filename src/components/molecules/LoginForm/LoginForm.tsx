import { ChangeEvent, FormEvent, useState } from "react";
import { Button, ButtonVariant } from "../../atoms/Button";
import show from "../../../assets/show.svg";
import hide from "../../../assets/hide.svg";
import { LoginFormData } from "./LoginForm.type";
import { useAuthStore } from "../../../stores/useAuthStore";

export const LoginForm = () => {
  const useAuth = useAuthStore();
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const errors = {
      email:
        !loginFormData.email
          ? "Please enter your email"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginFormData.email)
            ? "Please enter a valid email"
            : "",
      password: !loginFormData.password ? "Please enter your password" : "",
    };

    setFormErrors(errors);

    if (errors.email || errors.password) {
      setLoading(false);
      return;
    }

    try {
      setErrorMessage("");
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
            email: loginFormData.email,
            password: loginFormData.password,
  
        }),
      });

      const result = await response.json();

      if (!response.ok || result.status !== 200) {
        throw new Error(result.message || "Login failed");
      }

      useAuth.setAuthData(
        result.result.data.accessToken,
        result.result.data.expiresIn
      );
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <form
      className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        {formErrors.email && (
          <p className="text-red-500 text-sm mb-1">{formErrors.email}</p>
        )}
        <input
          type="text"
          id="email"
          name="email"
          value={loginFormData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
            `}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        {formErrors.password && (
          <p className="text-red-500 text-sm mb-1">{formErrors.password}</p>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={loginFormData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
              }`}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-primary-dark focus:outline-none text-sm"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <img className="w-5 h-5" src={showPassword ? show : hide} />
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm text-center">{errorMessage}</div>
      )}

      <div className="flex justify-center">
        <Button
          variant={ButtonVariant.PRIMARY}
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};
