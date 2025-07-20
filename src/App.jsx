import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";
import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
import UserRouteRedirector from "./components/UserRouteRedirector";

const Home = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const RecipePage = lazy(() => import("./pages/RecipePage/RecipePage.jsx"));
const AddRecipePage = lazy(() =>
  import("./pages/AddRecipePage/AddRecipePage.jsx")
);
const UserPage = lazy(() => import("./pages/UserPage/UserPage.jsx"));

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export function App() {
  return (
    <Suspense fallback={<Loader />}>
      <UserRouteRedirector />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/recipe/add" element={<AddRecipePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
