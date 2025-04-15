import { useEffect, useState } from "react";
import { Card } from "../../molecules/Card/Card.tsx";
import { CardProps } from "../../molecules/Card/Card.type.ts";
import { useAuthStore } from "../../../stores/useAuthStore/useAuthStore.ts";
import LoadingSpinner from "../../atoms/loading/Loading.tsx";
import { Searchbar } from "../../atoms/Searchbar/Searchbar.tsx";

export const Cardcontainer = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [users, setUsers] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      if (!accessToken) {
        setError("No access token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/users?search=' + search, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data.result.data.users);
        if (data.status === 200) { setUsers(data.result.data.users) }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [accessToken, search]);

  if (error) return <div className="m-4 text-red-500">Error: {error}</div>;

  return (
    <div className="dark:bg-gray-300 min-h-screen ">
      <Searchbar onChange={(e) => (setSearch(e.target.value))} />
      {loading ? <LoadingSpinner /> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 ">
          {users.map((user: CardProps) => (
            <Card {...user} />
          ))}
        </div>
      }

    </div>
  );
};
