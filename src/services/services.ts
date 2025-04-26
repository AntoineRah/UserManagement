import axios from "axios";

export const getUsers = async (search: string, accessToken: string | null) => {
  const response = await axios.get("/api/users", {
    params: { search },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.result.data.users;
};
