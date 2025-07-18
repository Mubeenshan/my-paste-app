import "./App.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import Paste from "./components/Paste";
import Error404 from "./components/Error404";
import View from "./components/View";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/paste",

    element: (
      <div>
        <Navbar />
        <Paste />,
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <View />,
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div>
        <Error404 />
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
