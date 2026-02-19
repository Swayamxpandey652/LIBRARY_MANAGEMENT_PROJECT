import { useState} from "react";
import BookContext from "./BookContext.jsx";

// Provider component
export const BookProvider = ({ children }) => {
  // Mock database of books
  const [books] = useState([
    { id: 1, name: "React Basics", author: "Dan Abramov" },
    { id: 2, name: "JavaScript Guide", author: "MDN Team" },
    { id: 3, name: "Clean Code", author: "Robert Martin" },
  ]);

  const [issuedBooks, setIssuedBooks] = useState([]);
  const [returnData, setReturnData] = useState([]);
  const [userRole, setUserRole] = useState("user"); // "admin" or "user"

  const issueBook = (book) => setIssuedBooks([...issuedBooks, book]);
  const returnBook = (data) => setReturnData([...returnData, data]);

  return (
    <BookContext.Provider
      value={{
        books,
        issuedBooks,
        returnData,
        userRole,
        setUserRole,
        issueBook,
        returnBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
