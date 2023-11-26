import { axios } from "./../lib/axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";


export function useProjeto(projectid: string | undefined) {
  const [name, setName] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.put(`/projeto/${projectid}`, {
        name,
        description,
      }, {
        headers: {
          'Content-Type': 'aplication/json'
        }
      });

      if (response.status === 200) {
        navigate("/")
      }
    } catch (error: any) {
      console.log(error)
      setError(error.response.error);
    }
  };

  return {
    setName,
    setDescription,
    error,
    handleSubmit,
  };
}