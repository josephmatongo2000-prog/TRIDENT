"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function Dashboard() {
  const [quotations, setQuotations] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, sent: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/quotations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuotations(res.data);
        setStats({
          total: res.data.length,
          pending: res.data.filter(q => q.status === "pending").length,
          sent: res.data.filter(q => q.status === "sent").length,
        });
      } catch (err) {
        console.error("Error fetching quotations", err);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h2 className="text-gray-300">Total Quotations</h2>
          <p className="text-3xl font-bold text-blue-400">{stats.total}</p>
        </div>
        <div className="card">
          <h2 className="text-gray-300">Pending</h2>
          <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
        </div>
        <div className="card">
          <h2 className="text-gray-300">Sent</h2>
          <p className="text-3xl font-bold text-green-400">{stats.sent}</p>
        </div>
      </div>

      {/* Recent Quotations Table */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Sent Quotations</h2>
        <table className="w-full border">
          <thead className="bg-gray-800">
            <tr>
              <th>To</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map(q => (
              <tr key={q.id} className="border-t hover:bg-gray-700">
                <td>{q.toEmail}</td>
                <td>{q.subject}</td>
                <td className={`font-semibold ${
                  q.status === "sent" ? "text-green-400" :
                  q.status === "pending" ? "text-yellow-400" : "text-gray-400"
                }`}>
                  {q.status}
                </td>
                <td>{new Date(q.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {quotations.length === 0 && (
              <tr>
                <td colSpan="4" className="text-gray-400 p-3">No quotations yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
