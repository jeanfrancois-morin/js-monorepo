import { useState } from "react";
import { useItems } from "../../contexts/ItemContext";

export function ItemAdd() {
  const itemContext = useItems();
  if (!itemContext) {
    throw new Error("useItems must be used within a valid ItemContextProvider");
  }
  const { loadItems } = itemContext;
  const [openModal, setOpenModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle }),
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setNewTitle("");
      setOpenModal(false);
      loadItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="secondary"
        onClick={() => {
          setOpenModal(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpenModal(true);
          }
        }}
        title="Cliquer pour ajouter un nouvel élément"
      >
        ajouter un élément
      </button>

      {openModal && (
        <dialog open>
          <article>
            <header>
              <button
                type="button"
                aria-label="Close"
                rel="prev"
                onClick={() => setOpenModal(false)}
              />
            </header>
            <div>
              <label htmlFor="new-item">
                Nouvel élément
                <input
                  id="new-item"
                  type="text"
                  placeholder="Titre de l'élément"
                  title="Titre de l'élément"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAdd();
                      setOpenModal(false);
                    }
                  }}
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                />
              </label>
              <button type="button" onClick={() => handleAdd()}>
                ajouter
              </button>
            </div>
          </article>
        </dialog>
      )}
    </>
  );
}
export default ItemAdd;
