import { Link } from 'react-router-dom';
import AddProjectForm from '../components/forms/projectform';
import { Header } from '../components/headers/header';
import { useProjects } from '../hooks/useProjects';
import { FaSpinner, FaTrash } from 'react-icons/fa';

export function Home() {
  const { projects, isLoading, handleAddProject, handleDeleteProject } = useProjects();
  console.log

  return (
    <div className="flex h-screen bg-[#1A242E]">
      {/* Drawer */}
      <div className="w-full">
        <Header />
        <div className="grid items-center justify-center container mx-auto p-8 justify-center">
          <h1 className="font-mountains-of-christmas text-3xl font-extrabold text-white mb-6">Projetos</h1>
          <ul className="text-white">
            {isLoading ? (
              <li className="flex items-center justify-center">
                <FaSpinner className="font-mountains-of-christmas text-white animate-spin mr-2" />
                Carregando...
              </li>
            ) : (
              projects.map((project) => (
                <li
                  className="mt-6 p-6 bg-[#2A3640] border border-gray-300 rounded shadow-md relative flex items-center flex-row"
                  key={project.id}
                >
                  
                  <img
                   src={project.iconUrl ? project.iconUrl : 'http://localhost:3333/images/camera.jpg'}// Substitua pela URL da sua imagem
                    alt="Project Image"
                    className="w-16 h-16 rounded-full"
                  />
                  <Link to={`/projeto/${project.id}`} className="flex-1 ml-4">
                    <h3 className="font-mountains-of-christmas text-2xl font-bold text-yellow-500 mb-2">
                      {project.name}
                    </h3>
                    <p className="font-mountains-of-christmas text-gray-400">{project.description}</p>
                  </Link>
                  <div className="mt-2 flex justify-between items-center">
                    {/* Adicione o espaço para a imagem */}
                    <div className="flex items-center space-x-4">
                      {/* Adicione o botão de excluir */}
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-white e hover:text-gray-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <hr className="mt-6 border-gray-500" />
                </li>
              ))
            )}
          </ul>
          <AddProjectForm onAddProject={handleAddProject} />
        </div>
      </div>
    </div>
  );
}
