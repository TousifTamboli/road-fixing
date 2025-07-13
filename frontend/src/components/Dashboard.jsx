import AddComplaint from "./AddComplaint";

function Dashboard({ user, onLogout, onView, view }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <button
          className="mb-3 py-2 px-4 bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => onView("addComplaint")}
        >
          Add New Complaint
        </button>
        <button
          className="mb-3 py-2 px-4 bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => onView("myComplaints")}
        >
          My Complaints
        </button>
        <button
          className="mt-auto py-2 px-4 bg-red-600 rounded hover:bg-red-700"
          onClick={onLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user.name}
        </h1>

        {view === "addComplaint" && <AddComplaint />}
        {/* Later add view === "myComplaints" etc */}
      </main>
    </div>
  );
}

export default Dashboard;
