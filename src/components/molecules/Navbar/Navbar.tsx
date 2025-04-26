import { Button, ButtonVariant } from "../../atoms/Button";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useThemeStore } from "../../../stores/themeStore/themeStore";
import { Link } from "react-router";

export const Navbar = () => {
  const logout = useAuthStore((state) => state.clearAuthData);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="bg-primary dark:bg-gray-900 flex items-center justify-between p-2 transition-colors">
      <h1 className="text-white font-bold">User Management</h1>
      <div className="flex space-x-3 justify-center items-center">
        <Link to="/dashboard/new">
        <Button variant={ButtonVariant.Primary_OUTLINE} >Create User</Button>
        </Link>
        <Button variant={ButtonVariant.Danger} onClick={logout}>
          Logout
        </Button>

        <button onClick={toggleTheme} className="p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={isDarkMode ? "white" : "black"}
            className="size-5 h-4 transition-colors duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
