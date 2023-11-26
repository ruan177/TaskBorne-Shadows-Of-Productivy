import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useRegistration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.post("/register", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        setTimeout(() => {
          navigate("/login");
        }, 4000);
        
      }
    } catch (error: any) {
      setError(error.response.error);
    }
  };

  return {
    setUsername,
    setEmail,
    setPassword,
    error,
    handleSubmit,
  };
}