import BASE_URL from "@/lib/baseUrl";

export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const createBook = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getAllBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/book`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Unexpected response format! Expected JSON.");
    }
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const editBook = async (book) => {
  const { id, title, author, publisher, year, pages } = book;
  try {
    const response = await fetch(`${BASE_URL}/book/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, author, publisher, year, pages }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/book/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getBookDetailById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/book/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};
