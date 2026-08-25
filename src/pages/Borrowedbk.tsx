import React, { useState, useEffect } from 'react';
import { getBorrowedBooks } from '../api';
import { useCrossAppAuthSync } from '../useCrossAppAuthSync';

interface BorrowSchema {
  book_title: string;
  author: string;
  isbn_number: string;
  category: string;
  sub_category?: string;
  borrow_date: string;
}

// Helper utility remains outside the component (clean functional tool)
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
  // FIXED: Hook moved inside the component block where it belongs!
  const isAuthReady = useCrossAppAuthSync(); 
  
  const [books, setBooks] = useState<BorrowSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // FIXED: If authorization isn't ready yet, hold on loading state and exit safely
    if (!isAuthReady) {
      setLoading(true);
      return;
    }

    setLoading(true);
    setError(null);

    // Grab identity data only after the sync hook has written the token to storage
    const studentId = getStudentIdFromToken();
    if (!studentId) {
      setError('Could not identify your account safely. Please log in again.');
      setLoading(false);
      return;
    }

    getBorrowedBooks(studentId)
      .then(res => {
        if (res.success && res.data) {
          setBooks(res.data);
        } else {
          setError(res.message || 'Failed to load your borrowed book indices.');
        }
      })
      .catch(() => {
        setError('A network exception occurred while fetching loan balances.');
      })
      .finally(() => {
        setLoading(false); // Guarantees the loading screen drops safely
      });

  }, [isAuthReady]); // Correctly recalculates instantly when auth switches to true

  return (
    <>
      <h1 className="head1">Borrow Category</h1>
      <h2 className="head2">List of Borrowed Books</h2>
      <div className="table-part" style={{ padding: '0 30px' }}>
        {loading ? (
          <p>Gathering active borrowing statements...</p>
        ) : error ? (
          <p className="error-text" style={{ color: '#c0392b' }}>⚠️ {error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                <th>ISBN Number</th>
                <th>Category</th>
                <th>Sub-category</th>
                <th>Borrowed On</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '20px 0' }}>
                    You have no active book loans.
                  </td>
                </tr>
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
