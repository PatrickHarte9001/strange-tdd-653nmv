import { useState } from "react";
import Profile from "./svg/Profile";
import User from "../types/User";

interface UserDetailsProps extends User {
  id: number;
  name: string;
  email: string;
  status: string;
  setEditingModalUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const UserDetails = ({
  id,
  name,
  email,
  status,
  setEditingModalUser,
}: UserDetailsProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <tr
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className="
      even:bg-light-lightened
      odd:bg-light-darkened
      hover:bg-light-hover

      dark:even:bg-dark-lightened
      dark:odd:bg-dark-darkened
      hover:dark:bg-dark-hover"
    >
      <td className="flex flex-row items-center px-4 py-2">
        <Profile />
        <span className="ml-4">
          <span>{name}</span>
          <br />
          <small>{email}</small>
        </span>
      </td>
      <td className="px-4">{id}</td>
      <td className="px-4 w-32">{status}</td>
      <td className="w-8">
        <button
          className={`p-1 mr-1 w-8 bg-light-darkened border border-1 border-dark dark:bg-light dark:bg-dark ${
            hovered ? "visible" : "invisible"
          }`}
          onClick={() => {
            setEditingModalUser({
              id: id,
              name: name,
              email: email,
              status: status,
            });
          }}
        >
          📝
        </button>
      </td>
    </tr>
  );
};

export default UserDetails;
