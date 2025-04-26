import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../../molecules/Card/Card";
import { CardProps } from "../../molecules/Card/Card.type";
import { useAuthStore } from "../../../stores/useAuthStore/useAuthStore";
import LoadingSpinner from "../../atoms/loading/Loading";
import { Searchbar } from "../../atoms/Searchbar/Searchbar";
import { getUsers } from "../../../services/services";

export const Cardcontainer = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [search, setSearch] = useState("");

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 200),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(e.target.value);
  };

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: () => getUsers(search, accessToken),
    enabled: !!accessToken,
  });

  if (isError) {
    return (
      <div className="m-4 text-red-500">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-300 min-h-screen">
      <Searchbar onChange={handleSearch} />
      {isLoading ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <div className="text-red-500 text-center mt-4">No result</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {users.map((user: CardProps) => (
            <Card key={user.id} {...user} />
          ))}
        </div>
      )}
    </div>
  );
};
