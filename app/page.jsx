'use client';

import { useState, useEffect } from 'react';

export default function PlacementManager() {
  const [drives, setDrives] = useState([]);
  const [form, setForm] = useState({
    companyName: '',
    role: '',
    driveDate: '',
    eligibleBranch: '',
    minCGPA: '',
    jobType: 'Full-Time',
  });

  const fetchDrives = async () => {
    try {
      const res = await fetch('/api/drives');
      const data = await res.json();
      if (Array.isArray(data)) setDrives(data);
    } catch (err) {
      console.error('Error fetching drives:', err);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/drives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({
        companyName: '',
        role: '',
        driveDate: '',
        eligibleBranch: '',
        minCGPA: '',
        jobType: 'Full-Time',
      });
      fetchDrives();
    } catch (err) {
      console.error('Error adding drive:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          GNDEC Placement Drive Manager
        </h1>
        <p className="text-gray-600 mb-8">
          Track upcoming recruitment drives and company eligibility criteria.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Company Name"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Role / Designation"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={form.driveDate}
            onChange={(e) => setForm({ ...form, driveDate: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Eligible Branch (e.g. CSE, IT, ECE)"
            value={form.eligibleBranch}
            onChange={(e) => setForm({ ...form, eligibleBranch: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            step="0.1"
            placeholder="Min CGPA"
            value={form.minCGPA}
            onChange={(e) => setForm({ ...form, minCGPA: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={form.jobType}
            onChange={(e) => setForm({ ...form, jobType: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Internship">Internship</option>
            <option value="Both">Both</option>
          </select>
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Add Placement Drive
          </button>
        </form>

        {/* Drives Table */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Drives</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">Company</th>
                <th className="p-3">Role</th>
                <th className="p-3">Date</th>
                <th className="p-3">Branch</th>
                <th className="p-3">Min CGPA</th>
                <th className="p-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {drives.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No placement drives added yet.
                  </td>
                </tr>
              ) : (
                drives.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.companyName}</td>
                    <td className="p-3">{item.role}</td>
                    <td className="p-3">
                      {new Date(item.driveDate).toLocaleDateString()}
                    </td>
                    <td className="p-3">{item.eligibleBranch}</td>
                    <td className="p-3">{item.minCGPA ?? 'N/A'}</td>
                    <td className="p-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold">
                        {item.jobType}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}