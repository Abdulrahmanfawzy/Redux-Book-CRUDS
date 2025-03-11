import React from 'react'
import Navbar from './components/Navbar/Navbar'
import BookForm from './components/BookForm/BookForm'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import Booklist from './components/Booklist/Booklist'
import BookDetails from './components/BookDetails/BookDetails'

export default function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <BookForm />   
      <div className='flex w-3/4 mt-5 m-auto gap-3'>
        <Booklist/>
        <BookDetails />
      </div> 
    </Provider>
  )
}
