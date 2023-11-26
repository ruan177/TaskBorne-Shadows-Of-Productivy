import React from "react";
import { Card } from "../card";
import { useCardData } from "../../hooks/useBoard";

interface BoardProps{
  projetoid: string
} 

export const Board = ( { projetoid }:BoardProps) => {
  const { todoList, inProgressList, donelist, addCard, editCard, deleteCard, handleDrop } = useCardData(projetoid);

  

  return (
    <div className="flex p-4 space-x-4">
      <div className="flex-1 bg-gray-100 p-4 rounded-lg items-center" onDrop={handleDrop("TODO")} onDragOver={(e) => e.preventDefault()}>
        <h2 className="text-xl font-semibold mb-4">A fazer</h2>
        {todoList.map((card) => (
          <Card key={card.id} id={card.id} title={card.title} onEdit={(id, newTitle) => editCard(id, newTitle, "TODO")} onDelete={(id) => deleteCard(id, "TODO")} />
        ))}
        <button onClick={() => addCard("Nova Tarefa", "TODO")}>Adicionar Card</button>
      </div>

      <div className="flex-1 bg-gray-100 p-4 rounded-lg" onDrop={handleDrop("IN_PROGRESS")} onDragOver={(e) => e.preventDefault()}>
        <h2 className="text-xl font-semibold mb-4">Em progresso</h2>
        {inProgressList.map((card) => (
          <Card key={card.id} id={card.id} title={card.title} onEdit={(id, newTitle) => editCard(id, newTitle, "IN_PROGRESS")} onDelete={(id) => deleteCard(id, "IN_PROGRESS")} />
        ))}
        <button onClick={() => addCard("Nova Tarefa", "IN_PROGRESS")}>Adicionar Card</button>
      </div>

      <div className="flex-1 bg-gray-100 p-4 rounded-lg" onDrop={handleDrop("DONE")} onDragOver={(e) => e.preventDefault()}>
        <h2 className="text-xl font-semibold mb-4">Feito</h2>
        {donelist.map((card) => (
          <Card key={card.id} id={card.id} title={card.title} onEdit={(id, newTitle) => editCard(id, newTitle, "DONE")} onDelete={(id) => deleteCard(id, "DONE")} />
        ))}
        <button onClick={() => addCard("Nova Tarefa", "DONE")}>Adicionar Card</button>
      </div>
    </div>
  );
};
