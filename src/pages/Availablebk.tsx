import React, { useState, useEffect } from 'react';
import { searchAvailableBooks } from '../api';
import { useCrossAppAuthSync } from '../useCrossAppAuthSync';

interface BookSchema {
  book_title: string;
  author: string;
  isbn_number: string;
  category: string;
  sub_category?: string;
}

function Availablebk(): React.JSX.Element {
  const isAuthReady = useCrossAppAuthSync(); // Call our new isolation sync tool
  const [books, setBooks] = useState<BookSchema[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // FIXED: If authentication isn't verified yet, set loading to true and wait safely
    if (!isAuthReady) {
      setLoading(true);
      return; 
    }
    
    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(async () => {
      try {
        const response = await searchAvailableBooks(searchQuery);
        if (response.success && response.data) {
          setBooks(response.data);
        } else {
          setError(response.message || 'Failed to load available books.');
        }
      } catch (err) {
        setError('A network exception occurred while fetching catalog files.');
      } finally {
        setLoading(false);
      }
    }, 400); // waits for typing to pause before firing the request

    return () => clearTimeout(timeoutId); // cancels the pending call if user keeps typing
  // FIXED: Both parameters are now securely combined into a unified, correct dependency array
  }, [searchQuery, isAuthReady]);

  return (
    <>
      <h1 className="head1">Book Dashboard</h1>

      <div className="search" style={{ padding: '0 30px', marginBottom: '20px' }}>
        <label htmlFor="book-search" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Search for a book
        </label>
        <input
          id="book-search"
          type="text"
          placeholder="Search title, author, or ISBN..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="table-part" style={{ padding: '0 30px' }}>
        {loading ? (
          <p>Loading available books...</p>
        ) : error ? (
          <p style={{ color: '#c0392b' }}>{error}</p>
        ) : books.length === 0 ? (
          <p>No available books match your search.</p>
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
              {books.map((b, idx) => (
                <tr key={b.isbn_number || idx}>
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

export default Availablebk;
