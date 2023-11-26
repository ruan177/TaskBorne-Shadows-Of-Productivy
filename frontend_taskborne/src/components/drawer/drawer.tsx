import React, { useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { FiSettings, FiChevronRight } from 'react-icons/fi';
import { LuPanelLeft } from 'react-icons/lu';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useAuth } from '../../context/authContext';
import { useDeleteAccount } from '../../hooks/useDeleteAccount';

export function
  Drawer() {
  const { id } = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const { user, logout } = useAuth();

  const { deleteUserAccount } = useDeleteAccount();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteConfirmation('');
  };

  const handleDeleteConfirmation = () => {
    if (deleteConfirmation.toUpperCase() === 'DELETE') {
      deleteUserAccount(); // Add your logic to delete the account
    }
    closeDeleteModal();
  };


  return (
    <div className="flex transition-all duration-300 ease-in-out">
      {/* Botão fora do drawer para abrir */}
      {!isDrawerOpen && (
        <button onClick={openDrawer}>
          <FiChevronRight className="text-white" />
        </button>
      )}

      {/* Drawer */}

      {isDrawerOpen && (
        <div className={`w-40 bg-gray-50 p-4 transition-all duration-300 ease-in-out relative`}>
          <div className="flex items-center justify-between">
            {/* Ícone dentro do drawer para fechar */}
            <h1 className="font-mountains-of-christmas  text-xl flex items-center text-gray-900">
              <Link className="" to={`/home`}>
                <img className="w-20 text-black" src="/src/assets/taskbornelogo.png" alt="" />
              </Link>
            </h1>

            <button onClick={closeDrawer}>
              <HiMenuAlt3 className="w-6 h-6" />
            </button>
          </div>
          <ul className="mt-6 text-black">
            {/* Existing menu items */}
            <li className="flex items-center justify-items hover-bg-gray-200 py-2">
              <LuPanelLeft className="ml-4" />
              <Link className="font-mountains-of-christmas gap-2 ml-2.5" to={`/projeto/${id}`}>
                Painel
              </Link>
            </li>
            <li className="flex items-center justify-items hover-bg-gray-200 py-2">
              <FiSettings className="ml-4" />
              <Link className="font-mountains-of-christmas gap-2 ml-2.5" to={`/config/${id}`}>
                Settings
              </Link>
            </li>
          </ul>

          {/* New button and menu */}
          <div className="absolute bottom-4 left-4">
            <div className="w-full flex items-center">
              <button className="italic gap-4 flex items-center border border-[#FFBF00] rounded-full" onClick={handleMenuToggle}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
                  <img src="/public/Lady_Maria.png" className="w-full h-full object-cover" alt="" />
                </div>
              </button>

              <p className='gap-2 font-mountains-of-christmas text-black' style={{ marginLeft: '8px' }}>{user?.username}</p>
            </div>
            {menuOpen && (
              <div className="absolute left-0 bottom-16 z-10">
                <ul className="w-48 py-2 bg-white rounded-md shadow-xl dropdown-menu">
                  <li className="font-mountains-of-christmas text-black px-4 py-2 hover:bg-gray-100">
                    <NavLink to={`/projeto/${id}/conta`}>Alterar Conta</NavLink>
                  </li>

                  <li className="font-mountains-of-christmas  text-black px-4 py-2 hover:bg-gray-100">
                    <button onClick={openDeleteModal}>Delete Account</button>
                  </li>
                  <li className="font-mountains-of-christmas text-black px-4 py-2 hover:bg-gray-100">
                    <NavLink to="/login" onClick={logout}>Deslogar</NavLink>
                  </li>
                </ul>
              </div>
            )}
            {deleteModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className=" bg-white items-center p-4 rounded-md shadow-md">
                  <p className=" font-mountains-of-christmas text-gray-800 mb-4">Are you sure you want to delete your account?</p>
                  <p className=" font-mountains-of-christmas text-gray-600 mb-4">Type "DELETE" to confirm:</p>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="w-full border p-2 mb-4"
                  />
                  <div className="flex justify-end">
                    <button
                      className="font-mountains-of-christmas bg-yellow-500 text-white px-4 py-2 mr-2 rounded-md"
                      onClick={handleDeleteConfirmation}
                    >
                      Confirm
                    </button>
                    <button
                      className=" font-mountains-of-christmas bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={closeDeleteModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
