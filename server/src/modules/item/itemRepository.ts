import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Item = {
  id: number;
  title: string;
  user_id: number | null;
};

class ItemRepository {
  // The C of CRUD - Create operation

  async create(item: Omit<Item, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into item (title, user_id) values (?, ?)",
      [item.title, item.user_id],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from item where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Item;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from item");

    // Return the array of items
    return rows as Item[];
  }

  // The U of CRUD - Update operation
  async update(id: number, title: string) {
    const [result] = await databaseClient.query<Result>(
      "update item set title = ? where id = ?",
      [title, id],
    );

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      throw new Error(`Item with id ${id} not found or no changes made.`);
    }

    // Return a success message or the updated item ID
    return { id, title };
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to remove an item by its ID
    const [result] = await databaseClient.query<Result>(
      "delete from item where id = ?",
      [id],
    );

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      throw new Error(`Item with id ${id} not found.`);
    }

    // Return a success message or the deleted item ID
    return { id };
  }
}

export default new ItemRepository();
