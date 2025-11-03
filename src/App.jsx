import { RouterProvider } from "react-router-dom"
import { AppRouter } from "./Routes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
      <ToastContainer position="top-center" autoClose={2000}/>
    </>
  )
}

export default App