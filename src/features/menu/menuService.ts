import axios from "axios";

// create a new menu

const createMenu = async (
  menuData: {
    categoryName: string;
  },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/menus", menuData, config);
  return response.data;
};

// get user menu

const getMenus = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/menus", config);
  return response.data;
};

// get menu by id

const getMenuById = async (menuId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/menus/" + menuId, config);
  return response.data;
};

// delete menu

const deleteMenu = async (menuId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("/api/menus/" + menuId, config);
  return response.data;
};

// add a new item
const addItem = async (
  itemData: {
    menuId: string;
    name: string;
    price: number;
    description: string;
  },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/items", itemData, config);
  return response.data;
};

// delete Item
const deleteItem = async (itemData: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put("/api/items/delete", itemData, config);
  return response.data;
};

// update Item
const updateItem = async (itemData: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put("/api/items/update", itemData, config);
  return response.data;
};

const menuService = {
  createMenu,
  getMenus,
  deleteMenu,
  getMenuById,
  addItem,
  deleteItem,
  updateItem,
};

export default menuService;
