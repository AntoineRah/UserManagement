import { useState } from "react";
import { Button, ButtonVariant } from "../../atoms/Button";
import show from "../../../assets/show.svg";
import hide from "../../../assets/hide.svg";
import { LoginFormData, schema } from "./LoginForm.type";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const useAuth = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormData) => axios.post("/api/login", data),
    onSuccess: (data) => {
      toast.success("Successful login");
      useAuth.setAuthData(data.data.result.data.accessToken, data.data.result.data.expiresIn);
    },

    onError: () => {
      toast.error("invalid credentials");
    }
  })


  return (
    <form
      className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6"
      onSubmit={handleSubmit((data) => mutate(data))}
    >

      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        {errors.email && (
          <p className="text-red-500 text-sm mb-1">{errors.email.message}</p>
        )}
        <input
          type="text"
          id="email"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
          {...register("email")}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        {errors.password && (
          <p className="text-red-500 text-sm mb-1">{errors.password?.message}</p>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
              }`}
            {...register("password")}
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

      <div className="flex justify-center">
        <Button
          variant={ButtonVariant.PRIMARY}
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};
