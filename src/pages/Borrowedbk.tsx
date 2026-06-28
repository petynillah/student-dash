function Borrowedbk(){
    return(
        <>
         <h1 className="head1">borrow category</h1>
       
        <h2 className="head2">list of borrowed books</h2>

            <div className="table-part">
                <table>
                    <thead>
                        <tr>
                            <th>book title</th>
                            <th>Author</th>
                            <th>ISBN number</th>
                            <th>Category</th>
                            <th>Sub-category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bad one</td>
                            <td>David</td>
                            <td>345234</td>
                            <td>fiction</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Borrowedbk