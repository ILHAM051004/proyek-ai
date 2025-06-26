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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6FAF4] to-[#DDFBFF] flex items-center justify-center px-4 py-12 font-sans text-lg">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border-t-8 border-[#106EBE] transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#106EBE] flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-5xl">🍜</span> Prediksi Kuliner Puswil
          </h1>
          <p className="text-gray-500 mt-3 text-xl leading-relaxed">
            Cek potensi keramaian tempat kuliner berdasarkan <br className="hidden sm:inline"/> hari, waktu, dan kondisi cuaca.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
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
            <div key={idx} className="relative group">
              <label className="block font-semibold text-gray-700 mb-2 transform transition-transform duration-300 group-focus-within:translate-x-1">
                {label}:
              </label>
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
                className="w-full p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#E6FAF4] focus:border-[#106EBE] text-lg appearance-none bg-white pr-10 shadow-sm transition-all duration-300 hover:border-gray-400"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em' }}
              >
                <option value="" disabled hidden>
                  Pilih {label}
                </option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#106EBE] to-[#0FFCBE] hover:from-[#0FFCBE] hover:to-[#106EBE] text-white font-bold py-4 px-6 rounded-xl text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#E6FAF4] flex items-center justify-center gap-2"
          >
            <span className="text-2xl">✨</span> Dapatkan Prediksi
          </button>
        </form>

        {label && (
          <div className="mt-10 p-6 rounded-3xl bg-[#F0FDFA] border-l-8 border-[#0FFCBE] shadow-lg animate-fadeIn text-lg flex items-start gap-5">
            <div className="text-5xl flex-shrink-0">
              {label === "Ramai" && "🥳"}
              {label === "Cukup ramai" && "😊"}
              {label === "Sepi" && "😴"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Hasil Prediksi:
              </h2>
              <p className="mb-1">
                <strong>Hari:</strong>{" "}
                <span className="text-[#106EBE] font-medium">{hari}</span>
              </p>
              <p className="mb-1">
                <strong>Waktu:</strong>{" "}
                <span className="text-[#106EBE] font-medium">{waktu}</span>
              </p>
              <p className="mb-1">
                <strong>Cuaca:</strong>{" "}
                <span className="text-[#106EBE] font-medium">{cuaca}</span>
              </p>
              <p className="mt-3 text-xl">
                <strong>Tingkat Keramaian:</strong>{" "}
                <span
                  className={`font-extrabold ${
                    label === "Ramai"
                      ? "text-green-600"
                      : label === "Cukup ramai"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {label}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;