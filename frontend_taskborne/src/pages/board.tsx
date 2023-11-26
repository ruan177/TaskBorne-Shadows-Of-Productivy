import { Header } from "../components/headers/header"
import { Drawer } from "../components/drawer/drawer"
import { useParams } from "react-router-dom"
import { useCardData } from "../hooks/useBoard";
import { Card } from "../components/card";



export function Board() {
    const { id } = useParams();
    if (!id) {
        return <div>Error: ID not found</div>;
    }
    const { todoList, inProgressList, donelist, addCard, editCard, deleteCard, handleDrop } = useCardData(id);
    return (
        <div className="flex h-screen bg-[#1A242E]">
            <Drawer id={id} />
            <div className="w-full">
            <div className={`bg-[url('/src/assets/1.jpg')]  lg:col-span-2 bg-no-repeat bg-cover lg:block md:block w-full h-full`}>
                <Header />
                <div className="flex p-4 space-x-4">
                    <div className="flex-1 bg-gray-100 p-4 rounded-lg items-center" onDrop={handleDrop("TODO")} onDragOver={(e) => e.preventDefault()}>
                        <h2 className="font-mountains-of-christmas text-black text-xl font-semibold mb-4">A fazer</h2>
                        {todoList.map((card) => (
                            <Card key={card.id} id={card.id} title={card.title} onEdit={(id, newTitle) => editCard(id, newTitle, "TODO")} onDelete={(id) => deleteCard(id, "TODO")} />
                        ))}
                        <button className="font-mountains-of-christmas" onClick={() => addCard("Nova Tarefa", "TODO")}>Adicionar Card</button>
                    </div>

                    <div className="flex-1 bg-gray-100 p-4 rounded-lg" onDrop={handleDrop("IN_PROGRESS")} onDragOver={(e) => e.preventDefault()}>
                        <h2 className="font-mountains-of-christmas text-black text-xl font-semibold mb-4">Em progresso</h2>
                        
                        {inProgressList.map((card) => (
                            <Card key={card.id} id={card.id} title={card.title} onEdit={(id, newTitle) => editCard(id, newTitle, "IN_PROGRESS")} onDelete={(id) => deleteCard(id, "IN_PROGRESS")} />
                        ))}
                        <button className="font-mountains-of-christmas" onClick={() => addCard("Nova Tarefa", "IN_PROGRESS")}>Adicionar Card</button>
                    </div>

                    <div className="flex-1 bg-gray-100 p-4 rounded-lg" onDrop={handleDrop("DONE")} onDragOver={(e) => e.preventDefault()}>
                        <h2 className="font-mountains-of-christmas text-black text-xl font-semibold mb-4">Feito</h2>
                        {donelist.map((card) => (
                            <Card key={card.id} id={card.id} title={card.title} onEdit={(id, newTitle) => editCard(id, newTitle, "DONE")} onDelete={(id) => deleteCard(id, "DONE")} />
                        ))}
                        <button className="font-mountains-of-christmas" onClick={() => addCard("Nova Tarefa", "DONE")}>Adicionar Card</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}