import React, { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import NotFound from "./Pages/NotFound";
import Movie from "./Pages/Movie";
import SingleMovie from "./Pages/SingleMovie";
import WatchPage from "./Pages/WatchPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Dashboard/Profile";
import toast from "react-hot-toast";
import Aos from "aos";
import Password from "./Pages/Dashboard/Password";
import FavouriteMovie from "./Pages/Dashboard/FavouriteMovie";
import MoviesList from "./Pages/Dashboard/Admin/MovieList";
import Dashboard from "./Pages/Dashboard/Admin/Dashboard";
import Categories from "./Pages/Dashboard/Admin/Categories";
import Users from "./Pages/Dashboard/Admin/Users";
import AddMovie from "./Pages/Dashboard/Admin/AddMovie";
import ScrollOnTop from "./ScrollOnTop";
import DrawerContext from "./Context/DrawerContext";
import TosterContainer from "./Components/Notfications/TosterContainer";
import { AdminProtectedRoutes, PublicProtectedRoutes } from "./ProtectedRouter";
import { getLikedMoviesAction } from "./Redux/Actions/UserActions";
import { getAllCategories } from "./Redux/Actions/CategoriesActions";
import { useDispatch, useSelector } from "react-redux";
import EditMovie from "./Pages/Dashboard/Admin/EditMovies";

const App = () => {
  Aos.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError, isSuccess } = useSelector((state) => state.userLikeMovie);
  const { isError: catError } = useSelector((state) => state.categoriesList);

  useEffect(() => {
    dispatch(getAllCategories());

    if (userInfo) {
      dispatch(getLikedMoviesAction());
    }

    if (isError || catError) {
      toast.error(isError || catError);
      dispatch({ type: "USER_LIKE_MOVIE_RESET" });
    }

    if (isSuccess) {
      dispatch({ type: "USER_LIKE_MOVIE_RESET" });
    }
  }, [dispatch, userInfo, isError, isSuccess, catError]);

  return (
    <>
      <TosterContainer />
      <DrawerContext>
        <ScrollOnTop>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/movies/:search" element={<Movie />} />
            <Route path="/movie/:id" element={<SingleMovie />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />

            <Route element={<PublicProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/password" element={<Password />} />
              <Route path="/favourite" element={<FavouriteMovie />} />

              <Route element={<AdminProtectedRoutes />}>
                <Route path="/movieslist" element={<MoviesList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/users" element={<Users />} />
                <Route path="/addmovie" element={<AddMovie />} />
                <Route path="/edit/:id" element={<EditMovie />} />
              </Route>
            </Route>
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  );
};

export default App;
