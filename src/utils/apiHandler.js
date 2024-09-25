//utils/apiHandler.js

const API_URL = "https://example.com/api"; // Replace with your actual API URL

// Function to fetch all items (GET)
export const fetchItems = async () => {
  try {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Return the fetched items
  } catch (error) {
    console.error("Fetch items error:", error);
    throw error; // Propagate the error for further handling
  }
};

// Function to fetch a single item by ID (GET)
export const fetchItemById = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Return the fetched item
  } catch (error) {
    console.error("Fetch item error:", error);
    throw error; // Propagate the error for further handling
  }
};

// Function to create a new item (POST)
export const createItem = async (itemData) => {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Return the created item
  } catch (error) {
    console.error("Create item error:", error);
    throw error; // Propagate the error for further handling
  }
};

// Function to update an existing item (PUT)
export const updateItem = async (itemId, itemData) => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Return the updated item
  } catch (error) {
    console.error("Update item error:", error);
    throw error; // Propagate the error for further handling
  }
};

// Function to delete an item (DELETE)
export const deleteItem = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Return a success message or confirmation
  } catch (error) {
    console.error("Delete item error:", error);
    throw error; // Propagate the error for further handling
  }
};

// Common error handling utility
export const handleErrorResponse = (error) => {
  // Customize error handling logic here
  console.error("API error:", error.message);
  alert("An error occurred. Please try again later.");
};
