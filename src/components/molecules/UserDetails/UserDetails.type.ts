import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    firstName: z.string().trim().min(1, "First Name must be at least one character"),
    lastName: z.string().trim(),
    email: z.string().email("Email is invalid"),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid Date must be in the form yyyy-mm-dd"),
    status: z.enum(["active", "locked"], {
        errorMap: () => ({
            message: "Must Choose status"
        })
    }),
});

type UserData = z.infer<typeof schema>;
type UserDetailsProps = {
    isPending: boolean,
    onSubmit: SubmitHandler<UserData>,
    userFields?: Partial<UserData>,
    pageTitle: string,
}
export type { UserData, UserDetailsProps };
export { schema };
