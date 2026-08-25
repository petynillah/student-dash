import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../api';
import { useCrossAppAuthSync } from '../useCrossAppAuthSync';

interface BookSchema {
  book_title: string;
  author: string;
  isbn_number: string;
  category: string;
  sub_category?: string;
}

function Allbooks(): React.JSX.Element {
  const isAuthReady = useCrossAppAuthSync(); // Call our new isolation sync tool
  const [books, setBooks] = useState<BookSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error tracking for robustness

  useEffect(() => {
    // FIXED: If authentication isn't verified yet, lock loading to true and wait safely
    if (!isAuthReady) {
      setLoading(true);
      return;
    }

    setLoading(true);
    setError(null);

    getAllBooks()
      .then((res) => {
        if (res.success && res.data) {
          setBooks(res.data);
        } else {
          setError(res.message || 'Failed to pull master library inventories.');
        }
      })
      .catch(() => {
        setError('A network exception occurred while fetching inventory indices.');
      })
      .finally(() => {
        setLoading(false); // FIXED: Guarantees the loading screen drops whether the call succeeds or fails
      });
  // FIXED: Added isAuthReady to the array so the block re-runs the split-second the token sync completes
  }, [isAuthReady]);

  return (
    <>
      <h1 className="head1">Books Category</h1>
      <h2 className="head2">Library Inventory</h2>
      <div className="table-part" style={{ padding: '0 30px' }}>
        {loading ? (
          <p>Reading library master catalog...</p>
        ) : error ? (
          <p style={{ color: '#c0392b' }}>⚠️ {error}</p>
        ) : books.length === 0 ? (
          <p>No books found in the catalog.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                <th>ISBN Number</th>
                <th>Category</th>
                <th>Sub-category</th>
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
