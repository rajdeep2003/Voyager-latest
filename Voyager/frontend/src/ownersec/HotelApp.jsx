"use client";

import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import BookingsPage from "./components/BookingsPage";
import RoomsPage from "./components/RoomsPage";
import AnalyticsPage from "./components/AnalyticsPage";

export default function HotelApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hotelOwner, setHotelOwner] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    const savedOwner = localStorage.getItem("hotelOwner");
    if (savedOwner) {
      setHotelOwner(JSON.parse(savedOwner));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (owner) => {
    localStorage.setItem("hotelOwner", JSON.stringify(owner));
    setHotelOwner(owner);
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("hotelOwner");
    setHotelOwner(null);
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "bookings":
        return <BookingsPage />;
      case "rooms":
        return <RoomsPage />;
      case "analytics":
        return <AnalyticsPage />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        hotelOwner={hotelOwner}
        onLogout={handleLogout}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      {renderCurrentPage()}
    </div>
  );
}
