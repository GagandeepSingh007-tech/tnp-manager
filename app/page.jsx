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

  useEffect(() => {
    const savedDrives = localStorage.getItem('tnp_drives');
    if (savedDrives) {
      try {
        setDrives(JSON.parse(savedDrives));
      } catch (e) {
        console.error('Error parsing saved drives', e);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDrive = { ...form, id: Date.now() };
    const updatedDrives = [newDrive, ...drives];
    
    setDrives(updatedDrives);
    localStorage.setItem('tnp_drives', JSON.stringify(updatedDrives));

    // Reset form fields
    setForm({
      companyName: '',
      role: '',
      driveDate: '',
      eligibleBranch: '',
      minCGPA: '',
      jobType: 'Full-Time',
    });
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
            type="text"
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

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Add Placement Drive
            </button>
          </div>
        </form>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Drives</h2>
          {drives.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No placement drives added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="p-3">Company</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Branch</th>
                    <th className="p-3">Min CGPA</th>
                    <th className="p-3">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {drives.map((drive) => (
                    <tr key={drive.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{drive.companyName}</td>
                      <td className="p-3">{drive.role}</td>
                      <td className="p-3">{drive.driveDate}</td>
                      <td className="p-3">{drive.eligibleBranch}</td>
                      <td className="p-3">{drive.minCGPA || 'N/A'}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {drive.jobType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}