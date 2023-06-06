import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from "react-query"

function App() {
  const [books, setBooks] = useState([]);
  const fetchBooks = () =>
    axios
      .get("http://localhost:5000/books")
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        throw new Error("An error occurred while fetching books.");
      });

  const { data, isLoading, error, isSuccess, refetch } = useQuery("BOOKS", fetchBooks);

  const deleteBook = (paramId) => {
    if(window.confirm("are you sure ?")){
       axios
      .delete("http://localhost:5000/books/deletebook/" + paramId)
      .then((res) => fetchBooks())
      .catch((error) => {
        console.error(error);
        throw new Error("An error occurred while fetching books.");
      })
    }else{
      return 0
    }
   
  }
  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>error</h1>}
      {isSuccess &&
        !data.length > 0 ? <h1>!!! Empty !!!</h1> :
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Photo</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Writer</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Release date</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(item => (
              <tr key={item._id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>


                  <img src={`http://localhost:5000/img/${item.imgpath.substring(item.imgpath.lastIndexOf("\\") + 1)}`} width="100" alt={item.name} />
                  {console.log(`${item.imgpath.substring(item.imgpath.lastIndexOf("\\") + 1)}`)}

                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{item.writer.firstname} {item.writer.lastname} </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{item.description}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{item.publishDate}</td>
                <td style={{ border: '1px solid black', padding: '8px', }}>
                  <button style={{ border: '1px solid black', padding: '6px', background: "red", color: "white", border: "none" }} onClick={() => deleteBook(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}




    </div>
  );
}

export default App;
