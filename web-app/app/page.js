"use client";

export default function DashboardPage() {
  return (
    <div className="container mx-auto space-y-10">
      <h1 className="text-4xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card glass p-6 text-center">
          <h2 className="text-lg font-semibold">Total Quotes</h2>
          <p className="text-4xl font-bold mt-2 text-primary">1,245</p>
        </div>
        <div className="card glass p-6 text-center">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-4xl font-bold mt-2 text-warning">53</p>
        </div>
        <div className="card glass p-6 text-center">
          <h2 className="text-lg font-semibold">Approved</h2>
          <p className="text-4xl font-bold mt-2 text-success">1,021</p>
        </div>
        <div className="card glass p-6 text-center">
          <h2 className="text-lg font-semibold">Rejected</h2>
          <p className="text-4xl font-bold mt-2 text-error">171</p>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="card glass p-8">
          <h3 className="text-xl font-semibold mb-4">Quote Trends</h3>
          <div className="bg-base-200/30 rounded-lg h-60 flex items-center justify-center">
            📈 Chart Placeholder
          </div>
        </div>

        <div className="card glass p-8">
          <h3 className="text-xl font-semibold mb-4">Work Distribution</h3>
          <div className="bg-base-200/30 rounded-lg h-60 flex items-center justify-center">
            🧠 Graph Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
