import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/Error";
import Mockman from "mockman-js";
import SignupPage from "./pages/Signup";
import UserProfilePage from "./pages/UserProfile";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "mockman",
        element: <Mockman />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <WishlistPage />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "user_profile",
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
