import { useState } from 'react';

import { axios } from '../lib/axios';


const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const uploadImage = async (selectedImage: File | null, rota: string | null) => {
    if (!selectedImage) {
      setError('Por favor, selecione uma imagem antes de salvar.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      // Substitua '/upload-profile-image' pelo endpoint correto no seu backend
       await axios.put(`${rota}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      setSuccessMessage('Imagem alterada com sucesso!');
      // Você pode adicionar lógica adicional aqui para atualizar o estado do usuário
    } catch (error: any) {
      console.error('Erro ao enviar a imagem de perfil:', error);
      setError('Ocorreu um erro ao enviar a imagem de perfil.');
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, error, uploadImage, successMessage,setSuccessMessage };
};

export default useImageUpload; 