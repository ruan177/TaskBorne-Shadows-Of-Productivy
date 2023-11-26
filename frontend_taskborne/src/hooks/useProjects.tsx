import { useQuery, useMutation } from 'react-query';
import { axios } from './../lib/axios';
import { useAuth } from '../context/authContext';

interface Project {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
}

export const useProjects = () => {
  const { user } = useAuth();

  const { data: projects = [], isLoading, refetch } = useQuery<Project[]>('projects', fetchProjects);

  const addProjectMutation = useMutation((newProjectName: string) =>
    axios.post<Project>(`/usuario/${user?.id}/projetos`, { name: newProjectName })
  );

  const deleteProjectMutation = useMutation((projectId: string) =>
    axios.delete(`/projeto/${projectId}`)
  );

  async function fetchProjects() {
    try {
      const response = await axios.get<{ projects: Project[] }>(`/usuario/${user?.id}/projetos`);
      console.log(response.data.projects)
      return response.data.projects;
     
    } catch (error) {
      throw new Error('Error fetching projects');
    }
  }

  const handleAddProject = async (projectName: string) => {
    try {
      // Use the addProjectMutation function to add a new project
      await addProjectMutation.mutateAsync(projectName);

      // Manually refetch the projects after mutation is successful
      refetch();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      // Use the deleteProjectMutation function to delete a project
      await deleteProjectMutation.mutateAsync(projectId);

      // Manually refetch the projects after mutation is successful
      refetch();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return { projects, isLoading, handleAddProject, handleDeleteProject };
};
