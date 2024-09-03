import  { FunctionComponent } from 'react';

interface Size {
    width: number;
    height: number;
}

interface Comment {
    id: number;
    description: string;
    date: string;
}

interface Book {
    id: number;
    imageUrl: string;
    name: string;
    count: number;
    size: Size;
    weight: string;
    pages: number;
    comments: Comment[];
}

interface Props {
    book: Book;
}
const deleteBook = async (id:number) => {
    try {
      const response = await fetch(`http://localhost:8000/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
  
      console.log('Book deleted successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
const Card: FunctionComponent<Props> = ({ book }) => {
    const { id, imageUrl, name, count, size, weight, pages, comments } = book;
    return (
        <div className="card">
            <img src={imageUrl} alt={name} />
            <h2>{name}</h2>
            <p>ID: {id}</p>
            <p>Count: {count}</p>
            <p>Size: {size.width} x {size.height}</p>
            <p>Weight: {weight}</p>
            <p>Pages: {pages}</p>
            <div className="comments">
                <h3>Comments:</h3>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.description}</p>
                            <p>{comment.date}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <button>Edit</button>
            <button onClick={()=>deleteBook(id)}>Delete</button>

        </div>
    );
};

export default Card;
