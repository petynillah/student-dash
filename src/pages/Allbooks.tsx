import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../api';

interface BookSchema {
  book_title: string;
  author: string;
  isbn_number: string;
  category: string;
  sub_category?: string;
}

function Allbooks(): React.JSX.Element {
  const [books, setBooks] = useState<BookSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBooks().then(res => {
      if (res.success && res.data) setBooks(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className="head1">Books Category</h1>
      <h2 className="head2">Library Inventory</h2>
      <div className="table-part">
        {loading ? (
          <p>Reading library master catalog...</p>
        ) : books.length === 0 ? (
          <p>No books found in the catalog.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Book Title</th><th>Author</th><th>ISBN Number</th><th>Category</th><th>Sub-category</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b, i) => (
                <tr key={b.isbn_number || i}>
                  <td>{b.book_title}</td>
                  <td>{b.author}</td>
                  <td>{b.isbn_number}</td>
                  <td>{b.category}</td>
                  <td>{b.sub_category || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Allbooks;