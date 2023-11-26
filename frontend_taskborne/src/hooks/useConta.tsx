import { axios } from "./../lib/axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function useConta() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.put(`/usuario/${user?.id}`, {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'aplication/json'
        }
      });

      if (response.status === 200) {
        logout();
        
      }
    } catch (error: any) {
      console.log(error)
      setError(error.response.error);
    }
  };

  return {
    setUsername,
    setPassword,
    error,
    handleSubmit,
  };
}