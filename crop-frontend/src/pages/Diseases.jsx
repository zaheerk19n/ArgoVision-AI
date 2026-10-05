import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Diseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/diseases");
        const data = await res.json();
        if (Array.isArray(data)) {
          setDiseases(data);
        }
      } catch (err) {
        console.error("Error fetching diseases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  const severityStyle = (level) => {
    switch (level) {
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-600";
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col md:flex-row"
      style={{ backgroundColor: "var(--dash)" }}
    >
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-0 md:ml-64 px-4 md:px-10 pt-10 md:pt-[14vh] pb-10">

        {/* HEADER */}
        <div
          className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
                     rounded-3xl p-6 mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-800">Disease Library</h1>
          <p className="text-gray-600 text-sm mt-1">
            Explore common plant diseases, key identification symptoms, and severity levels
          </p>
        </div>

        {/* DISEASE CARDS */}
        {loading ? (
          <div className="text-center py-16 text-gray-600">Loading disease database...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diseases.map((disease) => (
              <div
                key={disease.id}
                className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
                           rounded-3xl p-6 hover:scale-[1.02] transition flex flex-col justify-between"
              >
                <div>
                  <img
                    src={disease.image}
                    alt={disease.name}
                    className="w-full h-40 object-contain mb-4"
                    onError={(e) => {
                      e.target.src = "/leaf.png";
                    }}
                  />

                  <h2 className="text-xl font-bold text-gray-800">
                    {disease.name}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1">
                    Target Crop: <strong className="text-green-800">{disease.crop}</strong>
                  </p>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Primary Symptoms:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                      {disease.symptoms.map((symptom, idx) => (
                        <li key={idx}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/20">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${severityStyle(disease.severity)}`}
                  >
                    {disease.severity} Severity
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && diseases.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No disease records available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Diseases;
