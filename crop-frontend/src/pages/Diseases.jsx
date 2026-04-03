import React from "react";


const Diseases = () => {
  const diseases = [
    {
      id: 1,
      name: "Leaf Blight",
      crop: "Tomato",
      image: "/leaf-blight.png",
      symptoms: [
        "Brown spots on leaves",
        "Yellowing edges",
        "Leaf drying",
      ],
      severity: "High",
    },
    {
      id: 2,
      name: "Late Blight",
      crop: "Potato",
      image: "/late-blight.png",
      symptoms: [
        "Dark lesions on leaves",
        "White mold under leaf",
      ],
      severity: "High",
    },
    {
      id: 3,
      name: "Leaf Curl",
      crop: "Chilli",
      image: "/leaf-curl.png",
      symptoms: [
        "Curled leaves",
        "Stunted growth",
      ],
      severity: "Medium",
    },
  ];

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
      className="w-full min-h-screen flex"
      style={{ backgroundColor: "var(--dash)" }}
    >
      

      {/* MAIN CONTENT */}
      <div className="flex-1 px-10 pt-[14vh]">

        {/* HEADER */}
        <div
          className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
                     rounded-3xl p-6 mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-800">Disease Library</h1>
          <p className="text-gray-600 text-sm mt-1">
            Learn about common crop diseases, symptoms, and severity
          </p>
        </div>

        {/* DISEASE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {diseases.map((disease) => (
            <div
              key={disease.id}
              className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
                         rounded-3xl p-6 hover:scale-[1.02] transition"
            >
              <img
                src={disease.image}
                alt={disease.name}
                className="w-full h-40 object-contain mb-4"
              />

              <h2 className="text-xl font-semibold text-gray-800">
                {disease.name}
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                Affects: <strong>{disease.crop}</strong>
              </p>

              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700">
                  Symptoms:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {disease.symptoms.map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium
                              ${severityStyle(disease.severity)}`}
                >
                  {disease.severity} Severity
                </span>

                <button
                  className="px-4 py-2 rounded-xl bg-green-500 text-white text-sm
                             hover:bg-green-600 transition"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {diseases.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            No diseases available
          </div>
        )}
      </div>
    </div>
  );
};

export default Diseases;
