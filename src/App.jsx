import { RouterProvider } from "react-router-dom"
import { AppRouter } from "./Routes";
function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  )
}

export default App
