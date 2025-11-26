import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import ItemForm from './pages/ItemForm'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route />
        <Route path='item-form' element={<ItemForm />} />
      </Route>
    </Routes>
  )
}

export default App