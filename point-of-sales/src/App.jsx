import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import { ContextProvider } from './contexts/ContextProvider'

function App() {

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  )
}

export default App
