"use client"

import { Button } from "../components/ui/button"
import { Settings, LogOut, ArrowLeft } from "lucide-react"

export default function Header({ hotelOwner, onLogout, currentPage, onNavigate }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {currentPage !== "dashboard" && (
              <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")} className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            )}
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{hotelOwner.name}</h1>
              <p className="text-sm text-gray-500">{hotelOwner.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
