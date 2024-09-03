import styles from './Card.module.css'
import Modal, { updateBook } from '../Modal/Modal';
import { useState } from 'react';
import { deleteBook } from '../Modal/Modal';
import UpdateBookForm from '../Form/Form';
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


const Card: React.FC<Props> = ({ book }) => {
    const { id, imageUrl, name, count, size, weight, pages, comments } = book;
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
    return (
        <div className={styles.card}>
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
            <button onClick={() => openModal(<div><UpdateBookForm book={book}></UpdateBookForm></div>)}>Edit</button>
            <button onClick={() => openModal(<div><button onClick={() => { deleteBook(id); location.reload(); }}>delete book</button></div>)}>Delete</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Dynamic Content Modal">
                {modalContent}
            </Modal>
        </div>
    );
};

export default Card;
