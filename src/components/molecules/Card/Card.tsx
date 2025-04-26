import { CardProps } from "./Card.type";
import { Button, ButtonVariant } from "../../atoms/Button";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../../../stores/useAuthStore";


export const Card = ({ firstName, lastName, id, status, email, dateOfBirth }: CardProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const initials = `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}`;
  const queryClient = useQueryClient()
  const DeleteUser = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })


      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["users"] })
      toast.success('User deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })


  return (
    <div key={id} className="bg-white shadow-md rounded p-4 justify-center space-y-3 dark:bg-gray-800">
      <div className="flex justify-center">

        <h1 className="bg-primary rounded-full flex items-center justify-center text-lg h-16 w-16 font-bold text-white dark:bg-black">
          {initials || 'N/A'}
        </h1>
      </div>
      <h2 className="font-bold text-lg mb-2">{firstName + " " + (lastName || "")}</h2>
      <div>
        <p className="text-gray-500 text-sm">Email: {email}</p>
        <p className="text-gray-500 text-sm">Status: {status}</p>
        <p className="text-gray-500 text-sm">Date of Birth: {dateOfBirth}</p>
      </div>
      <div className="flex justify-end gap-3 ">
        <Button >Edit</Button>
        <Button variant={ButtonVariant.Danger} onClick={() => DeleteUser.mutate()}>Delete</Button>
      </div>
    </div>
  );
}
