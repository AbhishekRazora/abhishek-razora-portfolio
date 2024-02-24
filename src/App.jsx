import { useState } from 'react'
import './App.css'
import { createBrowserRouter,Route,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import ProjectPage from './pages/ProjectPage'


function App() {
const router=createBrowserRouter(createRoutesFromElements(
  <>
  
  <Route path='/' element={<HomePage/>}/>
  <Route path='/about' element={<AboutPage/>}/>
  <Route path='/contact' element={<ContactPage/>}/>
  <Route path='/projects' element={<ProjectPage/>}/>
  </>
)

)
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
