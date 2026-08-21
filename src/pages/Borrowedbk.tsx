import React, { useState, useEffect } from 'react';
import { getBorrowedBooks } from '../api';

interface BorrowSchema {
  book_title: string;
  author: string;
  isbn_number: string;
  category: string;
  sub_category?: string;
  borrow_date: string;
}

function getStudentIdFromToken(): string | number | null {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;
  try {
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    return payload.student_id || payload.id || null;
  } catch {
    return null;
  }
}

function Borrowedbk(): React.JSX.Element {
  const [books, setBooks] = useState<BorrowSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const studentId = getStudentIdFromToken();
    if (!studentId) {
      setError('Could not identify your account. Please log in again.');
      setLoading(false);
      return;
    }

    getBorrowedBooks(studentId).then(res => {
      if (res.success && res.data) setBooks(res.data);
      else setError(res.message || 'Failed to load your borrowed books.');
      setLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className="head1">Borrow Category</h1>
      <h2 className="head2">List of Borrowed Books</h2>
      <div className="table-part">
        {loading ? (
          <p>Gathering active borrowing statements...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Book Title</th><th>Author</th><th>ISBN Number</th><th>Category</th><th>Sub-category</th><th>Borrowed On</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center' }}>You have no active book loans.</td></tr>
              ) : (
                books.map((b, i) => (
                  <tr key={b.isbn_number || i}>
                    <td>{b.book_title}</td>
                    <td>{b.author}</td>
                    <td>{b.isbn_number}</td>
                    <td>{b.category}</td>
                    <td>{b.sub_category || 'N/A'}</td>
                    <td>{new Date(b.borrow_date).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Borrowedbk;