import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteBook, getAllBooks, oneBook } from "../../redux/reducers/BookSlice";

export default function Booklist() {
    const {data , isLoading , error} = useSelector(store=>store.allBooks);
    const dispatch = useDispatch();
    
    useEffect(()=>{
      dispatch(getAllBooks());   
    } , [dispatch , data])    

    function getBook(id){
      dispatch(oneBook(id));
    }

    function handleDeleteBook(id){
      dispatch(deleteBook(id))
    }

  return (
    <div className="w-1/2">
      <h2 className="text-3xl text-center mb-3">Book List</h2>
      {isLoading ? <h2>Loading...</h2> : ""}
      {error ? <h2>{error}</h2>:""}
     
      {data && data.map(item=><div className="border p-4 flex items-center rounded justify-between mb-2" key={item.id}>
        <section>{item.title}</section>
        <div>
          <button onClick={()=>getBook(item.id)} className="bg-yellow-300 cursor-pointer py-1 px-3 rounded me-1">Read</button>
          <button onClick={()=>handleDeleteBook(item.id)} className="bg-red-500 cursor-pointer text-white py-1 px-3 rounded">delete</button>
        </div>
      </div>)}
    </div>
  )
}
