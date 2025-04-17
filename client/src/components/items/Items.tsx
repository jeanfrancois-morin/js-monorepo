import { useItems } from "../../contexts/ItemContext";
import Item from "./Item";
import type { ItemInterface } from "./Item";
import ItemAdd from "./ItemAdd";

interface ItemsInterface {
  items: ItemInterface[];
}

function Items() {
  const { items } = useItems() as ItemsInterface;
  return (
    <>
      <h1>Exemple d'un CRUD de trucs</h1>
      <ItemAdd />
      <section className="grid">
        {items.map((item: ItemInterface) => (
          <Item key={item.id} item={item} />
        ))}
      </section>
    </>
  );
}

export default Items;

export type { ItemsInterface };
