import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AddProjectFormProps {
  onAddProject: (projectName: string) => void;
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onAddProject }) => {
  const [projectName, setProjectName] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (projectName.trim() !== '') {
      onAddProject(projectName);
      setProjectName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <label htmlFor="projectName" className="font-mountains-of-christmas text-white text-xl mr-2">
        Project Name:
      </label>
      <input
        type="text"
        id="projectName"
        value={projectName}
        onChange={handleInputChange}
        className="rounded-md p-2 px-20"
      />
      <button type="submit" className="font-mountains-of-christmas bg-white text-[#1A242E] p-2 ml-2 rounded-md">
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;
