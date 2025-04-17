import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ItemInterface } from "../components/items/Item";

interface ItemContextType {
  items: ItemInterface[];
  setItems: React.Dispatch<React.SetStateAction<ItemInterface[]>>;
  loadItems: () => Promise<void>;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export function ItemProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemInterface[]>([]);

  const loadItems = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }, []);
  // Load items when the component mounts
  useEffect(() => {
    loadItems();
  }, [loadItems]);
  return (
    <ItemContext.Provider value={{ items, setItems, loadItems }}>
      {children}
    </ItemContext.Provider>
  );
}

export const useItems = () => {
  return useContext(ItemContext);
};
