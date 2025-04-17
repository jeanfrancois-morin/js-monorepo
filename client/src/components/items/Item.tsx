import { useState } from "react";
import ItemDelete from "./ItemDelete";
import ItemEdit from "./ItemEdit";

interface ItemInterface {
  id: number;
  title: string;
}

function Item({ item }: { item: ItemInterface }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article>
      <h2>{item.title}</h2>
      {isEditing ? (
        <ItemEdit item={item} setIsEditing={setIsEditing} />
      ) : (
        <button
          type="button"
          className="btn btn-block"
          onClick={() => setIsEditing(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsEditing(true);
            }
          }}
          aria-label={`${item.title} - Cliquer pour modifier`}
        >
          {item.title}
        </button>
      )}
      <ItemDelete item={item} />
    </article>
  );
}
export default Item;

export type { ItemInterface };
