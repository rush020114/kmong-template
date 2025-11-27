import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import ItemForm from './pages/ItemForm'
import ItemList from './pages/ItemList'
import ItemDetail from './pages/ItemDetail'
import ItemEdit from './pages/ItemEdit'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<ItemList />} />
        <Route path='item-form' element={<ItemForm />} />
        <Route path=':id' element={<ItemDetail />} />
        <Route path='edit/:id' element={<ItemEdit />} />
      </Route>
    </Routes>
  )
}

export default App