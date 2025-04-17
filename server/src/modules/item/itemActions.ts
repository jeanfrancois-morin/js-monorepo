import type { RequestHandler } from "express";

import { log } from "node:console";
// Import access to data
import itemRepository from "./itemRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const items = await itemRepository.readAll();

    // Respond with the items in JSON format
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const itemId = Number(req.params.id);
    const item = await itemRepository.read(itemId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  console.log("add", req.body);
  try {
    // Extract the item data from the request body
    const newItem = {
      title: req.body.title,
      user_id: null,
    };

    // Create the item
    const insertId = await itemRepository.create(newItem);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const itemId = Number(req.params.id);
    const updatedItem = await itemRepository.update(itemId, req.body.title);
    res.json({ updatedItem });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Delete operation
const remove: RequestHandler = async (req, res, next) => {
  try {
    const itemId = Number(req.params.id);
    await itemRepository.delete(itemId);
    res.sendStatus(204); // No Content
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, update, remove };
