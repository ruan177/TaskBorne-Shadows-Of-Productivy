import { useState, useEffect } from 'react';
import { axios } from '../lib/axios';


interface CardType {
  id: string;
  title: string;
  status: string;
}


export const useCardData = (projetoId: string | undefined) => {
  const [todoList, setTodoList] = useState<CardType[]>([]);
  const [inProgressList, setInProgressList] = useState<CardType[]>([]);
  const [donelist, setDonelist] = useState<CardType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const response = await axios.get(`/projeto/${projetoId}/cards`);
      console.log(response.data.cards)
      const data: CardType[] = response.data.cards;
      const todo = data.filter((card) => card.status === 'TODO');
      const inProgress = data.filter((card) => card.status === 'IN_PROGRESS');
      const done = data.filter((card) => card.status === 'DONE');

      setTodoList(todo);
      setInProgressList(inProgress);
      setDonelist(done);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addCard = async ( title: string, status: string) => {
    try {
      const response = await axios.post(`/projeto/${projetoId}/cards`, { title, status });
      const newCard: CardType = response.data;
      const updatedList = getStatusList(status).concat(newCard);
      setStatusList(status, updatedList);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const editCard = async (id: string, title: string, status: string) => {
    try {
      const response = await axios.put(`/cards/${id}`, { title, status });
      const updatedCard: CardType = response.data;
      const updatedList = getStatusList(status).map((card) => (card.id === id ? updatedCard : card));
      setStatusList(status, updatedList);
    } catch (error) {
      console.error('Error editing card:', error);
    }
  };

  const deleteCard = async (id: string, status: string) => {
    try {
      // Send a request to the backend to delete the card
      await axios.delete(`/cards/${id}`);

      // Update the local state after successful deletion
      const updatedList = removeFromList(getStatusList(status), id);
      setStatusList(status, updatedList);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleDrop = (targetStatus: string) => async (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const card = findCard(cardId);

    if (card) {
      try {
        await updateCardStatusOnBackend(cardId, targetStatus);

        // Update the local state after a successful backend update
        const updatedList = removeFromList(getStatusList(card.status), cardId);
        setStatusList(targetStatus, [...getStatusList(targetStatus), card]);
      } catch (error) {
        console.error('Error updating card status:', error);

        // Revert changes in the local state if an error occurs
        setStatusList(card.status, [...getStatusList(card.status), card]);
      }
    }
  };

  const updateCardStatusOnBackend = async (cardId: string, targetStatus: string) => {
    // Send a request to the backend to update the card's status
    await axios.put(`/cards/${cardId}`, {
      status: targetStatus,
    });
  };

  const findCard = (id: string) => {
    return todoList.find((c) => c.id === id) || inProgressList.find((c) => c.id === id) || donelist.find((c) => c.id === id);
  };

  const removeFromList = (list: CardType[], id: string) => list.filter((c) => c.id !== id);

  const getStatusList = (status: string): CardType[] => {
    if (status === 'TODO') {
      return todoList;
    } else if (status === 'IN_PROGRESS') {
      return inProgressList;
    } else if (status === 'DONE') {
      return donelist;
    }
    return [];
  };

  const setStatusList = (status: string, updatedList: CardType[]) => {
    if (status === 'TODO') {
      setTodoList(updatedList);
    } else if (status === 'IN_PROGRESS') {
      setInProgressList(updatedList);
    } else if (status === 'DONE') {
      setDonelist(updatedList);
    }
  };

  return {
    todoList,
    inProgressList,
    donelist,
    addCard,
    editCard,
    deleteCard,
    handleDrop,
  };
};
