import { CardProps } from "./Card.type";
import { Button, ButtonVariant } from "../../atoms/Button";

export const Card = ({ firstName, lastName, id, status, email, dateOfBirth }: CardProps) => {

  const initials = `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}`;

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
        <Button variant={ButtonVariant.Danger}>Delete</Button>
      </div>
    </div>
  );
};
