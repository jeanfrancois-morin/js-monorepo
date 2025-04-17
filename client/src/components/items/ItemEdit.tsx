import { useEffect, useRef } from "react";
import { useItems } from "../../contexts/ItemContext";
import type { ItemInterface } from "./Item";

function ItemEdit({
  item,
  setIsEditing,
}: { item: ItemInterface; setIsEditing: (isEditing: boolean) => void }) {
  const itemContext = useItems();
  if (!itemContext) {
    throw new Error("useItems must be used within a valid ItemContextProvider");
  }
  const { loadItems } = itemContext;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleEdit = async (id: number, title: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        },
      );
      if (!response.ok) {
        throw new Error(`Fail to update ${title} for item with id: ${id}`);
      }
      loadItems();
    } catch (error) {}
  };
  return (
    <input
      type="text"
      ref={inputRef}
      defaultValue={item.title}
      onBlur={(e) => {
        handleEdit(item.id, e.target.value);
        setIsEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleEdit(item.id, e.currentTarget.value);
          setIsEditing(false);
        } else if (e.key === "Escape") {
          setIsEditing(false);
        }
      }}
    />
  );
}
export default ItemEdit;
