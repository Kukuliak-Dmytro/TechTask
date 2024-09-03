import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Book {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  pages: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  description: string;
  date: string; 
}
interface BooksState {
  isLoading: boolean;
  data: Book[];
  error: boolean;
}

const initialState: BooksState = {
  isLoading: false,
  data: [],
  error: false,
};

export const fetchBooks = createAsyncThunk<Book[]>(
  'todo/fetchBooks',
  async () => {
    const response = await fetch('http://localhost:8000/books');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response.json();
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default todoSlice.reducer;
