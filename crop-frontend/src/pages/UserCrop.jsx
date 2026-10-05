import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const UserCrops = () => {
  const [userCrops, setUserCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCropName, setNewCropName] = useState("");
  const [newCropType, setNewCropType] = useState("Vegetable");

  const fetchCrops = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch("http://localhost:3000/api/crops", { headers });
      const data = await res.json();
      if (Array.isArray(data)) {
        setUserCrops(data);
      }
    } catch (err) {
      console.error("Fetch crops error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const handleAddCrop = async (e) => {
    e.preventDefault();
    if (!newCropName.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("http://localhost:3000/api/crops", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: newCropName,
          type: newCropType,
          image: "/leaf.png",
          status: "Healthy",
        }),
      });

      if (res.ok) {
        setNewCropName("");
        setShowModal(false);
        fetchCrops();
      } else {
        alert("Failed to add crop. Make sure you are logged in.");
      }
    } catch (err) {
      console.error("Add crop error:", err);
    }
  };

  const handleDeleteCrop = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch(`http://localhost:3000/api/crops/${id}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        fetchCrops();
      }
    } catch (err) {
      console.error("Delete crop error:", err);
    }
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: "var(--dash)" }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-0 md:ml-64 px-4 md:px-10 pt-10 md:pt-[14vh] pb-10">

        {/* HEADER */}
        <div
          className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
          rounded-3xl p-5 md:p-6 mb-6 md:mb-8
          flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        >
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              My Managed Crops
            </h1>

            <p className="text-gray-600 text-sm mt-1">
              Add and monitor your personal crop fields and latest health status
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium
            hover:bg-green-700 transition w-full md:w-auto shadow-md cursor-pointer"
          >
            + Add Crop
          </button>
        </div>

        {/* CROPS GRID */}
        {loading ? (
          <div className="text-center py-16 text-gray-600">Loading your crops...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {userCrops.map((crop) => (
              <div
                key={crop._id || crop.id}
                className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
                rounded-3xl p-6 hover:scale-[1.02] transition relative group"
              >
                <img
                  src={crop.image || "/leaf.png"}
                  alt={crop.name}
                  className="w-full h-36 md:h-40 object-contain mb-4"
                />

                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">
                      {crop.name}
                    </h2>
                    <p className="text-xs text-gray-500">{crop.type || "General"}</p>
                  </div>

                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-semibold
                    ${
                      crop.status === "Healthy"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {crop.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Last checked: {crop.lastChecked || "Recently"}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleDeleteCrop(crop._id || crop.id)}
                    className="flex-1 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && userCrops.length === 0 && (
          <div className="text-center py-16 text-gray-500 bg-white/20 rounded-3xl backdrop-blur-md">
            You haven’t added any managed crops yet. Click "+ Add Crop" to begin!
          </div>
        )}
      </div>

      {/* ADD CROP MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Crop</h2>

            <form onSubmit={handleAddCrop} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  placeholder="e.g. Wheat Sector 1"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category / Type</label>
                <select
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newCropType}
                  onChange={(e) => setNewCropType(e.target.value)}
                >
                  <option value="Vegetable">Vegetable</option>
                  <option value="Grain">Grain</option>
                  <option value="Fruit">Fruit</option>
                  <option value="Spice">Spice</option>
                </select>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                >
                  Add Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCrops;