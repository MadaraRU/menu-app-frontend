import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menuService from "./menuService";

interface MenuState {
  categories: any[];
  category: any;
  isCateogryError: boolean;
  isCategorySuccess: boolean;
  isCategoryLoading: boolean;
  isDeleteMenuError: boolean;
  isDeleteMenuSuccess: boolean;
  isDeleteMenuLoading: boolean;
  isItemError: boolean;
  isItemSuccess: boolean;
  isItemLoading: boolean;
  isDeleteError: boolean;
  isDeleteSuccess: boolean;
  isDeleteLoading: boolean;
  isUpdateError: boolean;
  isUpdateSuccess: boolean;
  isUpdateLoading: boolean;
  categoryMessage: string;
}

const initialState = {
  categories: [],
  category: [{}],
  isCateogryError: false,
  isCategorySuccess: false,
  isCategoryLoading: false,
  isDeleteMenuError: false,
  isDeleteMenuSuccess: false,
  isDeleteMenuLoading: false,
  isItemError: false,
  isItemSuccess: false,
  isItemLoading: false,
  isDeleteError: false,
  isDeleteSuccess: false,
  isDeleteLoading: false,
  isUpdateError: false,
  isUpdateSuccess: false,
  isUpdateLoading: false,
  categoryMessage: "",
} as MenuState;

// Create new menu
export const createMenu = createAsyncThunk(
  "menus/create",
  async (menuData: { categoryName: string }, thunkAPI: any) => {
    try {
      const token: string = thunkAPI.getState().auth.user.token;
      return await menuService.createMenu(menuData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user menus
export const getMenus = createAsyncThunk(
  "menus/getAll",
  async (_, thunkAPI: any) => {
    try {
      const token: string = thunkAPI.getState().auth.user.token;
      return await menuService.getMenus(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user menu by id
export const getMenuById = createAsyncThunk(
  "menu/getById",
  async (id: string, thunkAPI: any) => {
    try {
      const token: string = thunkAPI.getState().auth.user.token;
      return await menuService.getMenuById(id!, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Delete user menu
export const deleteMenu = createAsyncThunk(
  "menu/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token: string = thunkAPI.getState().auth.user.token;
      return await menuService.deleteMenu(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add a new item

export const createItem = createAsyncThunk(
  "menus/items/addItem",
  async (itemData: any, thunkAPI: any) => {
    try {
      const token: string = thunkAPI.getState().auth.user.token;
      return await menuService.addItem(itemData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete item

export const deleteItem = createAsyncThunk(
  "menus/items/deleteItem",
  async (itemData: any, thunkAPI: any) => {
    try {
      const token: string = thunkAPI.getState().auth.user.token;
      return await menuService.deleteItem(itemData!, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateItem = createAsyncThunk(
  "menus/items/updateItem",
  async (itemData: any, thunkAPI: any) => {
    try {
      const token: string = thunkAPI.getState().auth.user.token;
      return await menuService.updateItem(itemData!, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    reset: (state) => {
      state.categoryMessage = "";
      state.isCategoryLoading = false;
      state.isCategorySuccess = false;
      state.isCateogryError = false;
    },
    resetItem: (state) => {
      state.isItemError = false;
      state.isItemLoading = false;
      state.isItemSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategorySuccess = true;
        state.categories.push(action.payload);
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.isCateogryError = true;
        state.categoryMessage = action.payload as string;
      })
      .addCase(getMenus.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategorySuccess = true;
        state.categories = action.payload;
      })
      .addCase(getMenus.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.isCateogryError = true;
        state.categoryMessage = action.payload as string;
      })
      .addCase(getMenuById.pending, (state) => {
        state.isItemLoading = true;
      })
      .addCase(getMenuById.fulfilled, (state, action) => {
        state.isItemLoading = false;
        state.isItemSuccess = true;
        state.category = action.payload;
      })
      .addCase(getMenuById.rejected, (state, action) => {
        state.isItemLoading = false;
        state.isItemError = true;
        state.categoryMessage = action.payload as string;
      })
      .addCase(deleteMenu.pending, (state) => {
        state.isDeleteMenuLoading = true;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.isDeleteMenuLoading = false;
        state.isDeleteMenuSuccess = true;
        // state.categories = state.categories.filter(
        //   (cat) => cat._id !== action.payload.id
        // );
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.isDeleteMenuLoading = false;
        state.isDeleteMenuError = true;
        state.categoryMessage = action.payload as string;
      })
      .addCase(createItem.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategorySuccess = true;
        state.category = action.payload;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.isCateogryError = true;
        state.categoryMessage = action.payload as string;
      })
      .addCase(deleteItem.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isDeleteLoading = false;
        state.isDeleteSuccess = true;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isDeleteLoading = false;
        state.isDeleteError = true;
        state.categoryMessage = action.payload as string;
      })
      .addCase(updateItem.pending, (state) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
        state.isUpdateSuccess = true;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isUpdateLoading = false;
        state.isUpdateError = true;
        state.categoryMessage = action.payload as string;
      });
  },
});

export const { reset, resetItem } = menuSlice.actions;
export default menuSlice.reducer;
