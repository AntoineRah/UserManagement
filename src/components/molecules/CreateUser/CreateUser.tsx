import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useController } from "react-hook-form";
import { schema, UserData } from "./CreateUser.type";
import { Button, ButtonVariant } from "../../atoms/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../stores/useAuthStore";
import {toast} from "react-toastify";

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
        onSuccess: () =>{
            reset();
            toast.success('User deleted successfully')
            nav("/dashboard");
        },
        onError:(error) => {
            console.log("failed to create user ",error);
        } 
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<UserData>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            status: "Active",
        },
    });

    const { field: statusField, fieldState: statusState } = useController({
        control,
        name: "status",
    });

    const onSubmit = (data: UserData) => {
        createUserMutation.mutate(data);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div >
                    <input {...register("firstName")} placeholder="First Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>

                <div >
                    <input {...register("lastName")} placeholder="Last Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>

                <div>
                    <input {...register("email")} placeholder="Email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div >
                    <input {...register("dateOfBirth")} placeholder="MM-DD-YYYY" type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
                </div>

                <div>
                    <select
                        value={statusField.value}
                        onChange={statusField.onChange}
                        onBlur={statusField.onBlur}
                        name={statusField.name}
                       className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="Active">Active</option>
                        <option value="Locked">Locked</option>
                    </select>
                    {statusState.error && <p className="text-red-500 text-sm">{statusState.error.message}</p>}
                </div>

                <div className="flex justify-center">
                    <Button variant={ButtonVariant.Primary_OUTLINE} type="submit" disabled={createUserMutation.isPending}>
                    {createUserMutation.isPending ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
