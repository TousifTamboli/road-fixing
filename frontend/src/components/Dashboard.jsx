import React from "react";
import AddComplaint from "./AddComplaint";
import MyComplaints from "./MyComplaints";

function Dashboard({ user, onLogout, onView, view }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 via-blue-50 to-purple-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 backdrop-blur-md bg-white/30 shadow-xl border-r border-white/40 p-6 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl">
        <div>
          <h2 className="text-3xl font-extrabold text-blue-900 mb-10 text-center">
            🧭 Dashboard
          </h2>

          <nav className="space-y-4">
            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition transform duration-200"
              onClick={() => onView("addComplaint")}
            >
              ➕ Add Complaint
            </button>
            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition transform duration-200"
              onClick={() => onView("myComplaints")}
            >
              📋 My Complaints
            </button>
          </nav>
        </div>

        <button
          onClick={onLogout}
          className="mt-10 py-3 px-4 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600 transition"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-10 py-8 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-1">
            Welcome, <span className="text-blue-700">{user.name}</span>
          </h1>
          <p className="text-lg text-gray-500">Manage your city issues elegantly.</p>
        </header>

        <section className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md">
          {view === "addComplaint" && <AddComplaint user={user} />}
          {view === "myComplaints" && (
            <MyComplaints user={user} onLogout={onLogout} onView={onView} />
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
