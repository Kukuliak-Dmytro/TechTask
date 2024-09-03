import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from './redux/store'; // Update path as needed
import { fetchTodo } from './redux/todoSlicer';
import Card from './Card/Card';

const Books = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error occurred while fetching books.</h1>;
  }

  return (
    <>
       {data.map((todo) => (
        <Card key={todo.id} book={todo}></Card>
      ))} 
      
    </>
  );
};

export default Books;
