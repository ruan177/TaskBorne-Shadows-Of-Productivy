import { axios } from "./../lib/axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function useDeleteAccount() {

  const [error, setError] = useState("");

  const { user, logout } = useAuth();

  const deleteUserAccount = async function () {

    try {
      const response = await axios.delete(`/usuario/${user?.id}`)

      if (response.status === 200) {
        logout();
        
      }
    } catch (error: any) {
      console.log(error)
      setError(error.response.error);
    }
  };

  return {
    error,
    deleteUserAccount,
  };
}