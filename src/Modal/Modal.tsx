// Modal.tsx
import React from 'react';
import styles from './Modal.module.css'; // Include your modal styling here
interface Comment {
    id: number;
    description: string;
    date: string;
}

interface Size {
    width: number;
    height: number;
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

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}
export const deleteBook = async (id: number) => {
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
export const updateBook = async (id: number, updatedData: Book) => {
    try {
        const response = await fetch(`http://localhost:8000/books/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update');
        }

        console.log('Book updated successfully');
    } catch (error) {
        console.error('Error:', error);
    }
};
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                {title && <div className={styles.modalHeader}>
                    <h2>{title}</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>}
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
