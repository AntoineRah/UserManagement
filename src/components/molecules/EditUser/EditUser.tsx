import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useNavigate, useParams } from "react-router"
import { useAuthStore } from "../../../stores/useAuthStore";
import { UserDetails } from "../UserDetails";
import { UserData } from "../UserDetails/UserDetails.type";
import { toast } from "react-toastify";
import LoadingSpinner from "../../atoms/loading/Loading";


export const EditUser = () => {
    const { id } = useParams();
    const accessToken = useAuthStore((state) => state.accessToken);
    const navigate = useNavigate();
    const getUser = useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const response = await axios.get(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            return response.data.result.data.user;
        }
    })

    const update = useMutation({
        mutationFn: async (newDetails: UserData) => {
            const response = await axios.put(`/api/users/${id}`, newDetails,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            )
            return response.data;
        },
        onSuccess: () => {
            toast.success("Details Updated!")
            navigate("/dashboard");
        },
        onError: (error) => {
            toast.error(error.message);
        }



    })

    return getUser.isLoading === true ? (<LoadingSpinner />) : (<UserDetails userFields={getUser.data} onSubmit={(data) => update.mutate(data)} pageTitle="Edit User Details" isPending={update.isPending} />)
}


