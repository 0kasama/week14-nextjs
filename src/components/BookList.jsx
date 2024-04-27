"use client";

import { useEffect, useState } from "react";
import { getAllBooks, editBook, deleteBook } from "@/app/fetch";
import Image from "next/image";
import BASE_IMAGE_URL from "@/lib/baseImage";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    const fetchedBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchedBooks();
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    await editBook(selectedBook);
    setIsEditModalOpen(false);
    const updatedBooks = await getAllBooks();
    setBooks(updatedBooks);
  };

  const handleDeleteConfirmation = (book) => {
    setBookToDelete(book);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDelete = async () => {
    await deleteBook(bookToDelete.id);
    const updatedBooks = await getAllBooks();
    setBooks(updatedBooks);
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8">
      {books.map((book, index) => (
        <div
          key={index}
          className="card card-compact w-96 bg-base-100 shadow-xl"
        >
          <figure>
            <Image
              className="w-full"
              src={`${BASE_IMAGE_URL}/${book.image}`}
              alt={book.title}
              width={400}
              height={400}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{book.title}</h2>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Publisher:</span> {book.publisher}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Year:</span> {book.year}
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleEdit(book)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteConfirmation(book)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {selectedBook && (
        <dialog id="edit_modal" className="modal" open={isEditModalOpen}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Book</h3>
            {/* Form for editing */}
            <form>
              <label>Title:</label>
              <input
                type="text"
                value={selectedBook.title}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, title: e.target.value })
                }
              />
              <label>Author:</label>
              <input
                type="text"
                value={selectedBook.author}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, author: e.target.value })
                }
              />
              <label>Publisher:</label>
              <input
                type="text"
                value={selectedBook.publisher}
                onChange={(e) =>
                  setSelectedBook({
                    ...selectedBook,
                    publisher: e.target.value,
                  })
                }
              />
              <label>Year:</label>
              <input
                type="number"
                value={selectedBook.year}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, year: e.target.value })
                }
              />
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
              <button className="btn" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </dialog>
      )}

      {bookToDelete && (
        <dialog
          id="delete_confirmation_modal"
          className="modal"
          open={isDeleteConfirmationOpen}
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this book?</p>
            <div className="modal-action">
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="btn"
                onClick={() => setIsDeleteConfirmationOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
