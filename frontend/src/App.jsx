import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotificationsPage from "./pages/NotificationsPage";
import ConnectionsPage from "./pages/ConnectionsPage";
import ChatPage from "./pages/ChatPage";
import RequestsPage from "./pages/RequestsPage";
import CallPage from "./pages/CallPage";
import OnboardingPage from "./pages/OnboardingPage";
import { Toaster } from "react-hot-toast";
import useAuthUser from "./hooks/useAuthUser";
import LoadingPage from "./components/LoadingPage";
import Layout from "./components/Layout";

const App = () => {
  const { authenticatedUser, isLoading } = useAuthUser();
  const isAuth = !!authenticatedUser;
  const isOnboarded = authenticatedUser?.isOnboarded ?? false;

  if (isLoading) return <LoadingPage />;

  return (
    <main>
      <Routes>
        <Route
          path="/signup"
          element={
            isAuth ? (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            ) : (
              <SignupPage />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              isAuth && isOnboarded ? (
                <HomePage />
              ) : (
                <Navigate to={isAuth ? "/onboarding" : "/login"} />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isAuth && isOnboarded ? (
                <NotificationsPage />
              ) : (
                <Navigate to={isAuth ? "/onboarding" : "/login"} />
              )
            }
          />
          <Route
            path="/connections"
            element={
              isAuth && isOnboarded ? (
                <ConnectionsPage />
              ) : (
                <Navigate to={isAuth ? "/onboarding" : "/login"} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuth && isOnboarded ? (
                <ChatPage />
              ) : (
                <Navigate to={isAuth ? "/onboarding" : "/login"} />
              )
            }
          />
          <Route
            path="/requests"
            element={
              isAuth && isOnboarded ? (
                <RequestsPage />
              ) : (
                <Navigate to={isAuth ? "/onboarding" : "/login"} />
              )
            }
          />
        </Route>
        <Route
          path="/call/:id"
          element={
            isAuth && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={isAuth ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuth && isOnboarded ? (
              <OnboardingPage editMode />
            ) : (
              <Navigate to={isAuth ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuth ? (
              isOnboarded ? (
                <Navigate to="/" />
              ) : (
                <OnboardingPage />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{ className: "!bg-base-100 !text-base-content" }}
      />
    </main>
  );
};

export default App;
