import { useState } from "react";

export const useUserList = (initialSelectedUser = "Carolin") => {
  const [selectedUser, setSelectedUser] = useState(initialSelectedUser);
  const users = ["Albert", "Boyd", "Carolin", "Dave", "Elliot"];

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return {
    selectedUser,
    users,
    handleUserSelect,
  };
};
