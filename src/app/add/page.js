"use client";
import { useState } from "react";

export default function AddBookPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      // Handle error
      return;
    }
    const formData = new FormData(event.target);
    try {
      // await createBook(formData);
      event.target.reset();
      // Handle success
      setSelectedImage(null);
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Add a New Book
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium leading-6 text-white"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              id="title"
              name="title"
              type="text"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-white"
              htmlFor="author"
            >
              Author
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              id="author"
              name="author"
              type="text"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-white"
              htmlFor="publisher"
            >
              Publisher
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              id="publisher"
              name="publisher"
              type="text"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-white"
              htmlFor="year"
            >
              Year
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              id="year"
              name="year"
              type="number"
              required
            />
          </div>
          {selectedImage && (
            <img className="w-64" src={selectedImage} alt="Selected Image" />
          )}
          <div>
            <label
              className="block text-sm font-medium leading-6 text-white"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 bg-white text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(URL.createObjectURL(file));
              }}
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            type="submit"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}
