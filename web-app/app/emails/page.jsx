"use client";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Emails() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const res = await axios.get("http://localhost:4000/emails"); // your backend route
        setEmails(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEmails();
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Live Emails</h2>
      <div className="space-y-4">
        {emails.length === 0 ? (
          <p>No emails yet.</p>
        ) : (
          emails.map((email) => (
            <div key={email.id} className="card">
              <p><strong>From:</strong> {email.from}</p>
              <p><strong>Subject:</strong> {email.subject}</p>
              <p><strong>Status:</strong> {email.status}</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
