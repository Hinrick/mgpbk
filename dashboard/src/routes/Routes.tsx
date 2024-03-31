// src/routes/Routes.tsx

import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page components
import LoginPage from "../pages/Public/LoginPage";
import HomePage from "../pages/Authenticated/HomePage";
import LeagueListPage from "../pages/Authenticated/LeagueListPage";
import AdminGamePage from "../pages/Authenticated/AdminPage";
import RegistrationGamePage from "../pages/Public/RegistrationGamePage";
import GameRecordPage from "../pages/Public/GameRecordPage";
import GameScorePage from "../pages/Public/GameScorePage";
import TimerPage from "../pages/Public/TimerPage";
import Scoreboard from "../pages/Public/Scoreboard";

// Route protection component
import ProtectedRoute from "./PrivateRoute";

import Header from "../components/Header";

const RoutesComponent: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <Router>
        <Routes>
          <Route
            path="/admin/game"
            element={
              <ProtectedRoute>
                <AdminGamePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leagues"
            element={
              <ProtectedRoute>
                <LeagueListPage />
              </ProtectedRoute>
            }
          />
          <Route path="/register-game" element={<RegistrationGamePage />} />
          <Route path="/record/:gameId" element={<GameRecordPage />} />
          <Route path="/game-score" element={<GameScorePage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Fragment>
  );
};

export default RoutesComponent;
