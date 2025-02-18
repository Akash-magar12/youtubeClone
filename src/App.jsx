import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import { Provider } from "react-redux";
import store from "./store/store";
import VideoDetails from "./Pages/VideoDetails";
import Body from "./Pages/Body";
import Search from "./Pages/Search";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Body /> },
        { path: "/search", element: <Search /> },
        { path: "/watch/:categoryId/:id", element: <VideoDetails /> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
