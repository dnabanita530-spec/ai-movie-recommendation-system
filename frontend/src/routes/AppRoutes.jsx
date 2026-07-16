import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AdminAnalytics from "../pages/AdminDashboard/AdminAnalytics";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AdminMovies from "../pages/AdminDashboard/AdminMovies";
import AdminRecommendations from "../pages/AdminDashboard/AdminRecommendations";
import AdminReviews from "../pages/AdminDashboard/AdminReviews";
import AdminUsers from "../pages/AdminDashboard/AdminUsers";
import RecommendationPerformance from "../pages/AdminDashboard/RecommendationPerformance";
import BrowseMovies from "../pages/BrowseMovies/BrowseMovies";
import Dashboard from "../pages/Dashboard/Dashboard";
import Genres from "../pages/Genres/Genres";
import History from "../pages/History/History";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import MyList from "../pages/MyList/MyList";
import Recommendations from "../pages/Recommendations/Recommendations";
import Reviews from "../pages/Reviews/Reviews.jsx";
import Signup from "../pages/Signup/Signup";
import SmartRecommendation from "../pages/SmartRecommendation/SmartRecommendation";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
// import Emotion from "../pages/Emotion/Emotion";
import AIChat from "../pages/AIChat/AIChat";
import EmotionRecommendation from "../pages/EmotionRecommendation/EmotionRecommendation";
import Profile from "../pages/Profile/Profile";
import Ratings from "../pages/Ratings/Ratings";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/signup" />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
<Route
  path="/browse"
  element={<BrowseMovies />}
/>
<Route
  path="/movies/:id"
  element={<MovieDetails />}
/>
<Route
  path="/my-list"
  element={<MyList />}
/>
<Route
  path="/recommendations"
  element={<Recommendations />}
/>
<Route
  path="/history"
  element={<History />}
/>
<Route
  path="/ratings"
  element={<Ratings />}
/>
<Route
  path="/dashboard"
  element={<Dashboard />}
/>
<Route
  path="/smart-recommendation"
  element={
    <SmartRecommendation />
  }
/>
<Route
  path="/user-dashboard"
  element={<UserDashboard />}
/>
<Route
  path="/admin-dashboard"
  element={
  <ProtectedRoute><AdminDashboard /></ProtectedRoute>}
/>
<Route
  path="/admin-movies"
  element={<AdminMovies />}
/>

<Route
  path="/admin-users"
  element={<AdminUsers />}
/>

<Route
  path="/admin-reviews"
  element={<AdminReviews />}
/>

<Route
  path="/admin-analytics"
  element={<AdminAnalytics />}
/>
<Route
  path="/admin-recommendations"
  element={
    <AdminRecommendations />
  }
/>
<Route
  path="/recommendation-performance"
  element={
    <RecommendationPerformance />
  }
/>
<Route
  path="/reviews"
  element={<Reviews />}
/>
  <Route
  path="/profile"
  element={<Profile />}
/>
<Route

    path="/emotion"

    element={<EmotionRecommendation />}

/>


<Route
    path="/ai-chat"
    element={<AIChat />}
/>
<Route
    path="/genres"
    element={<Genres />}
/>

      </Routes>
    

    </BrowserRouter>
  );
}

export default AppRoutes;