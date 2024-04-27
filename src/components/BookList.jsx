import Image from "next/image";
import BASE_IMAGE_URL from "@/lib/baseImage";
import { editBook, deleteBook, getAllBooks } from "@/app/fetch";

export default function Home({ books }) {
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
      {books?.books?.map((book, index) => (
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
      {/* Edit and delete modals */}
    </div>
  );
}

export async function getServerSideProps() {
  const books = await getAllBooks();
  return {
    props: {
      books,
    },
  };
}
