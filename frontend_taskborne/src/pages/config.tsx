import { LuImageMinus } from "react-icons/lu";

import { Drawer } from "../components/drawer/drawer";
import { useParams } from "react-router-dom";
import { useProjeto } from "../hooks/useProjeto";
import { useState } from "react";

import useImageUpload from "../hooks/useImageUpload";

export function SettingsProjeto() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const {id} = useParams();
    const {
        setName,
        setDescription,
        error,
        handleSubmit,
      } = useProjeto(id);
      
    const { uploadImage, successMessage, setSuccessMessage } = useImageUpload();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSave = () => {
        uploadImage(selectedImage, `/projeto/${id}/upload` )
        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };

    
    return (
        <div className="flex h-screen bg-[#1A242E] bg-[url('/src/assets/6.png')] bg-no-repeat bg-cover">
            {/* Drawer */}
            <Drawer />
            {/* Drawer */}
  
            <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-center font-mountains-of-christmas text-yellow-500 text-4xl mb-4">
                        Configurações do Projeto
                    </h1>

                <div className="w-1/2 p-4">
                   

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
                        <p className=" font-mountains-of-christmas mb-2 text-green-500 text-xl italic">{ successMessage && ( successMessage)}</p>
                        <button onClick={handleSave} className="bg-white block text-black text-lg font-mountains-of-christmas bg-blue-500 rounded-lg p-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline">
                           Salvar Ícone do Projeto
                        </button>
                    </div>

                    <div className="mb-6 px-8">
                        <label className="block text-gray-50 text-2xl font-mountains-of-christmas mb-2">
                            Nome do Projeto:
                        </label>
                        <input
                            type="text"
                            id="nameproject"
                            className="shadow appearance-none bg-gray-700 border border-black rounded-lg w-full py-2 px-2 text-white leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Digite o nome do projeto"
                            onChange={event => setName(event.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6 px-8">
                        <label className="block text-gray-50 text-2xl font-mountains-of-christmas mb-2">
                            Descrição do projeto:
                        </label>
                        <textarea
                            id="descriptionproject"
                            className="shadow appearance-none bg-gray-700 border border-black rounded-lg w-full h-32 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline resize-none"
                            placeholder="Digite a descrição do projeto"
                            onChange={event => setDescription(event.target.value)}
                            required
                        ></textarea>
                    </div>
                    <p className="text-red-500 text-xs italic">{error && (error)}</p>
                    
                    <div className="grid justify-items-center gap-10">
                        <button
                            className="bg-[#1A242E] hover:bg-blue-600 border-2 border-white text-white text-2xl font-mountains-of-christmas rounded-full py-2 px-20 focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                            style={{ borderRadius: '31px' }}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
            </div>
       
    );
}
