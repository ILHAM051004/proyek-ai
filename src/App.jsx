import React, { useState } from "react";
import { prediksiAPI } from "./services/AppService";

function App() {
  const [hari, setHari] = useState("");
  const [waktu, setWaktu] = useState("");
  const [cuaca, setCuaca] = useState("");
  const [label, setLabel] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hasilLabel = getLabel(hari, waktu, cuaca);
    setLabel(hasilLabel);
    try {
      await prediksiAPI.createPrediksi({
        hari,
        waktu,
        cuaca,
        label: hasilLabel,
      });
      console.log("Terkirim ke Supabase!");
    } catch (error) {
      console.error("Gagal kirim ke Supabase:", error);
    }
  };

  function getLabel(hari, waktu, cuaca) {
    if (
      ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].includes(
        hari
      )
    ) {
      if (["Pagi", "Siang"].includes(waktu)) return "Sepi";
      if (waktu === "Sore" || waktu === "Malam") {
        if (cuaca === "Cerah") return "Ramai";
        if (cuaca === "Mendung") return "Cukup ramai";
        if (cuaca === "Hujan") return "Sepi";
      }
    }
    return "-";
  }

  const iconCuaca = {
    Cerah: "☀️",
    Mendung: "☁️",
    Hujan: "🌧️",
  };

  const iconWaktu = {
    Pagi: "🌅",
    Siang: "🌞",
    Sore: "🌇",
    Malam: "🌙",
  };

  const badgeColor = {
    Ramai: "bg-green-100 text-green-700",
    "Cukup ramai": "bg-yellow-100 text-yellow-700",
    Sepi: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6FAF4] to-[#DDFBFF] flex items-center justify-center px-3 py-6 font-sans text-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-5 sm:p-6 border-t-4 border-[#106EBE] transition-all duration-500 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-[#106EBE] flex items-center justify-center gap-2">
            <span className="text-3xl">🍜</span> RameIn
          </h1>
          <p className="text-gray-500 mt-1 leading-normal text-sm">
            Cek potensi keramaian kuliner puswil <br className="hidden sm:inline" />{" "}
            berdasarkan hari, waktu, dan cuaca.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            [
              "Hari",
              hari,
              setHari,
              ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
            ],
            ["Waktu", waktu, setWaktu, ["Pagi", "Siang", "Sore", "Malam"]],
            ["Cuaca", cuaca, setCuaca, ["Cerah", "Mendung", "Hujan"]],
          ].map(([label, value, setter, options], idx) => (
            <div key={idx}>
              <label className="block font-semibold text-gray-700 mb-1">
                {label}:
              </label>
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E6FAF4] focus:border-[#106EBE] text-sm appearance-none bg-white pr-8 shadow-sm hover:ring-1 hover:ring-[#0FFCBE] transition"
              >
                <option value="" disabled hidden>
                  Pilih {label}
                </option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {label === "Cuaca" && iconCuaca[opt]
                      ? `${iconCuaca[opt]} ${opt}`
                      : label === "Waktu" && iconWaktu[opt]
                      ? `${iconWaktu[opt]} ${opt}`
                      : opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] hover:from-[#0FFCBE] hover:to-[#106EBE] text-white font-semibold py-2 px-3 rounded-lg text-sm shadow hover:shadow-md transition-transform hover:-translate-y-0.5"
          >
            ✨ Dapatkan Prediksi
          </button>
        </form>

        {label && (
          <div className="mt-6 p-4 rounded-2xl bg-[#F0FDFA] border-l-4 border-[#0FFCBE] shadow text-sm flex items-start gap-3 transition-opacity duration-300 animate-fade-in">
            <div className="text-2xl flex-shrink-0">
              {label === "Ramai" && "🥳"}
              {label === "Cukup ramai" && "😊"}
              {label === "Sepi" && "😴"}
            </div>
            <div className="w-full">
              <h2 className="text-base font-bold text-gray-800 mb-1">
                Hasil Prediksi:
              </h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <p>
                  <strong>Hari:</strong>{" "}
                  <span className="text-[#106EBE] font-medium">{hari}</span>
                </p>
                <p>
                  <strong>Waktu:</strong>{" "}
                  <span className="text-[#106EBE] font-medium">{waktu}</span>
                </p>
                <p>
                  <strong>Cuaca:</strong>{" "}
                  <span className="text-[#106EBE] font-medium">{cuaca}</span>
                </p>
              </div>
              <div className="mt-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    badgeColor[label] || "bg-gray-200 text-gray-600"
                  }`}
                >
                  Tingkat Keramaian: {label}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
