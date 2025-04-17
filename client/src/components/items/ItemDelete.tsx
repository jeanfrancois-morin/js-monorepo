import { useItems } from "../../contexts/ItemContext";
import type { ItemInterface } from "./Item";

export function ItemDelete({ item }: { item: ItemInterface }) {
  const itemContext = useItems();
  if (!itemContext) {
    throw new Error("useItems must be used within a valid ItemContextProvider");
  }
  const { loadItems } = itemContext;
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-default"
      onClick={() => {
        handleDelete(item.id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleDelete(item.id);
        }
      }}
      title={`${item.title} - Cliquer pour supprimer`}
    >
      supprimer
    </button>
  );
}
export default ItemDelete;
