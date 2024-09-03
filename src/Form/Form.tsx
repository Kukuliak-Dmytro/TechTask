import React, { useState } from 'react';
import { updateBook } from '../Modal/Modal';

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

interface UpdateBookFormProps {
  book: Book;  
}

const UpdateBookForm: React.FC<UpdateBookFormProps> = ({ book }) => {
  const id=book.id;
  const [name, setName] = useState(book.name);
  const [imageUrl, setImageUrl] = useState(book.imageUrl);
  const [count, setCount] = useState(book.count);
  const [width, setWidth] = useState(book.size.width);
  const [height, setHeight] = useState(book.size.height);
  const [weight, setWeight] = useState(book.weight);
  const [pages, setPages] = useState(book.pages);
  const comments=book.comments;

  const handleSubmit = () => {
    const updatedData = {
        id,
      name,
      imageUrl,
      count,
      size: { width, height },
      weight,
      pages,
      comments
    };

   updateBook(book.id, updatedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Count:
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Weight:
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Pages:
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(parseInt(e.target.value))}
          />
        </label>
      </div>
      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBookForm;
