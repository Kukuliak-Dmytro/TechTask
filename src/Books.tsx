import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from './redux/store'; // Update path as needed
import { fetchBooks } from './redux/bookSlicer';
import Card from './Card/Card';
import Modal from './Functions/Functions';
import UpdateBookForm from './Form/UpdateForm';

const Books = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
      setModalContent(content);
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
      setModalContent(null);
  };
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error occurred while fetching books.</h1>;
  }
  const emptyBook= {
     id :Math.floor(Math.random()*100),
    imageUrl: '',
    name: '',
    count: 0,
    size: {
      width: 0,
      height: 0,
    },
    weight: '',
    pages: 0,
    comments: [],
  };

  return (
    <>
      <button onClick={()=>openModal(<UpdateBookForm book={emptyBook} updateOrInsert='insert'></UpdateBookForm>)}> Add a book</button>
       {data.map((book) => (
        <Card key={book.id} book={book}></Card>
      ))} 

       <Modal isOpen={isModalOpen} onClose={closeModal} title="Dynamic Content Modal">
                {modalContent}
            </Modal>
    </>
  );
};

export default Books;
