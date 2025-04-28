import { UserData } from "../UserDetails/UserDetails.type";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { UserDetails } from "../UserDetails";


export const CreateUser = () => {
    const nav = useNavigate();
    const accessToken = useAuthStore((state) => state.accessToken);
    const createUserMutation = useMutation({
        mutationFn: async (newUser: UserData) => {
            const response = await axios.post("/api/users", newUser, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('User added successfully')
            nav("/dashboard");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return <UserDetails  onSubmit={(data)=>createUserMutation.mutate(data)} isPending={createUserMutation.isPending} pageTitle={"Add new user"} />
}

