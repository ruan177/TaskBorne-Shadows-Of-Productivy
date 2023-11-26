// Import statements...
import { LuImageMinus } from "react-icons/lu";
import { FaCamera, FaTrash } from 'react-icons/fa'; // Add social network icons

import { Drawer } from "../components/drawer/drawer";
import { useState } from 'react';

import { useConta } from '../hooks/useConta';
import useProfileConta from '../hooks/useImageUpload';
import { useAuth } from '../context/authContext';

export function Conta() {
  
    const {setUsername, setPassword, error,handleSubmit} = useConta();
    const { isUploading, uploadImage, setSuccessMessage, successMessage } = useProfileConta();
    const {user} = useAuth();

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSave = () => {
        uploadImage(selectedImage, `/usuario/${user?.id}/upload` )
        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };

    return (
        <div className="flex h-screen bg-[url('/src/assets/6.png')]  bg-no-repeat bg-cover   ">
            {/* Drawer */}
            <Drawer />
            {/* Drawer */}
            
            <div className="  w-full flex flex-col items-center justify-center ">
                <h1 className="text-center font-mountains-of-christmas text-yellow-500 text-4xl mb-16 ">
                    Configurações do Usuario
                </h1>

                <div className="w-full h-4/6 p-4 ">


                    <div className="mb-6 px-8 flex flex-col items-center">
                        <label htmlFor="fileInput" className="cursor-pointer">
                            {selectedImage ? (
                                <div className="mb-4 relative rounded-full overflow-hidden w-32 h-32 mx-auto">
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="rounded-full bg-gray-50 border border-black p-4 mb-2 flex items-center justify-center">
                                    <LuImageMinus size={80} color="#333" />
                                </div>
                                
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                id="fileInput"
                                className="hidden"
                                
                            />
                        </label>
                        <div className="">
                           
                                <div className="text-right mb-6">
                                <p className=" font-mountains-of-christmas mb-2 text-green-500 text-xl italic">{ successMessage && ( successMessage)}</p>
                                    <button
                                        onClick={handleSave}
                                        className="bg-white block text-black text-lg font-mountains-of-christmas bg-blue-500 rounded-lg p-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline flex items-center">
                                        <FaCamera className="mr-2" />
                                        Salvar Imagem
                                    </button>
                                </div>
                                <p>{isUploading}</p>
                           

                        </div>
                        

                        <div className="mt-12 w-2/4 mb-6 px-8 flex flex-row items-center">
                            <label className="block text-gray-50 text-2xl font-mountains-of-christmas mb-2">
                                Nome:
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="shadow appearance-none bg-gray-700 border border-black rounded-lg w-full py-2 px-4 text-white leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Digite o nome de usuário"
                                onChange={event => setUsername(event.target.value)}
                                required
                            />
                        </div>

                        <div className="w-2/4 mb-6 px-8 flex items-center">
                            <label className="block text-gray-50 text-2xl font-mountains-of-christmas mb-2">
                                Senha:
                            </label>
                            <input
                                type="password"
                                id="senha"
                                className="shadow appearance-none bg-gray-700 border border-black rounded-lg w-full py-2 px-4 text-white leading-tight focus:outline-none focus:shadow-outline resize-none"
                                placeholder="Digite a nova senha"
                                onChange={event => setPassword(event.target.value)}
                                required
                            ></input>
                        </div>
                        <p className="text-red-500 text-xs italic">{error && (error)}</p>
                        <div className="grid grid-cols-2 gap-4 justify-items-end mt-20">
                            <div></div>
                            <div>
                                <button
                                    className="bg-white border-2 border-black text-black text-2xl font-mountains-of-christmas rounded-full py-1 px-20 focus:outline-none focus:shadow-outline"
                                    onClick={handleSubmit}
                                    style={{ borderRadius: '31px' }}
                                >
                                    Salvar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>
       
    );
}
