
import { useAuth } from "../context/authContext";
import { FormEvent, useState } from "react";


export function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await login(email, password);

        } catch (error: any) {
            setError(error.message); // Defina a mensagem de erro
        }
    };

    return (
        <div className="grid bg-black-800 h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full">
                <div className={`bg-[url('/public/bloodborne.jpg')] lg:col-span-2 bg-no-repeat bg-cover w-full lg:block md:block sm:hidden`}></div>
                <div className="flex justify-center items-center bg-white md:w-70 w-full">
                    <form className="h-4/4 w-full   px-8 pt-8 pb-10 mb-6 justify-center bg-white text-left">
                        <div className="flex justify-center items-center">
                        <img
                            className=" w-4/6 h-4/6"
                            src="/src/assets/taskbornelogo.png"
                            alt=""

                        />
                        </div>
                        <div className="mb-6 px-8 ">
                            <label className="block text-gray-700 text-2xl font-mountains-of-christmas mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none bg-gray-50 border border-black rounded-lg w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Digite seu email"
                                onChange={event => setEmail(event.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-16 px-8 ">
                            <div className="flex justify-between items-center">
                                <label className="block text-gray-700 text-2xl font-mountains-of-christmas mb-2">Senha</label>
                                <a href="/esqueci-a-senha" className="text-blue-500 font-mountains-of-christmas text-lg underline underline-offset-1">Esqueci a senha ?</a>
                            </div>



                            <input
                                type="password"
                                id="password"
                                className="shadow appearance-none bg-gray-50 border border-black rounded-lg w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="*********"
                                onChange={event => setPassword(event.target.value)}
                                required
                            />
                            <p className="text-red-500 text-xs italic">{error && (error)}</p>

                        </div>

                        <div className="grid justify-items-center gap-10">
                            <button
                                className="bg-black bg-center bg-cover border-2 border-white text-white text-2xl font-mountains-of-christmas rounded-full py-2 px-20 focus:outline-none focus:shadow-outline"
                                style={{ borderRadius: '31px' }}
                                onClick={handleSubmit}
                            >
                                Logar
                            </button>
                            <div className="mt-6">
                                <a className="font-mountains-of-christmas text-xl">Ainda não tem uma conta? </a>
                                <a href="/registro" className="text-blue-500 font-mountains-of-christmas text-xl underline underline-offset-1">Inscreva-se</a>
                            </div>
                        </div>


                    </form>
                </div>


            </div>
        </div>

    )
}