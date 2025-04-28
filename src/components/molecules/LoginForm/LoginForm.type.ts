import {z} from "zod";

const schema = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string().min(8,"Password must be at least 8 characters"),
})

type LoginFormData = z.infer<typeof schema>;

export {schema};
export type {LoginFormData};