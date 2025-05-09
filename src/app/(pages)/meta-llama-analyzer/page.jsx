"use client";

import { useState } from "react";
import { analyzeFoodImage } from "@/app/utils/togheterai";
import {
  SUPPORTED_IMAGE_TYPES,
  TASKS_FOOD_ANALYSIS,
} from "@/app/constants/togheterai";
import { ImagePlus, LoaderCircle } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { print_error, print_log } from "@/app/utils/development";

export default function HomePage() {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskIndex, setTaskIndex] = useState(0);

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    let image_type = file["name"].split(".").pop();
    if (!SUPPORTED_IMAGE_TYPES.includes(image_type)) {
      alert(
        `El tipo de imagen no es compatible. Sube una imagen tipo: ${SUPPORTED_IMAGE_TYPES}`
      );
      print_log(`Se ha detectado ${image_type} como tipo de imagen.`);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const onAnalyze = async () => {
    if (!preview) return alert("Sube primero una imagen.");
    setResult("");
    setLoading(true);

    try {
      const selectedTask = TASKS_FOOD_ANALYSIS[taskIndex].task;
      const stream = await analyzeFoodImage(preview, selectedTask);

      for await (const chunk of stream) {
        setResult((r) => r + chunk);
      }
    } catch (e) {
      print_error(e);
      alert("Error al procesar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col md:flex-row w-screen h-screen bg-slate-100 gap-4 p-4">
      <div className="flex flex-col h-full bg-white p-8 border-2 rounded-lg gap-4">
        {/* Selector de tarea */}
        <div className="w-full max-w-xs ">
          <label
            htmlFor="task"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <h2 className="text-black text-lg font-bold mb-2">
              Elige una tarea
            </h2>
          </label>
          <select
            id="task"
            value={taskIndex}
            onChange={(e) => setTaskIndex(Number(e.target.value))}
            className="p-4 w-full rounded-md border-slate-200 border-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {TASKS_FOOD_ANALYSIS.map((t, i) => (
              <option key={i} value={i}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de imagen */}
        <h2 className="text-black text-lg font-bold mb-2">Elige una imagen</h2>
        <label className="cursor-pointer flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-lg p-6 hover:bg-gray-100 transition">
          <ImagePlus className="w-12 h-12 text-gray-500 mb-2" />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
          />
        </label>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="max-w-xs max-h-64 rounded shadow"
          />
        )}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full items-center"
          onClick={onAnalyze}
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
            "Analizar Imagen"
          )}
        </button>
      </div>

      <div className="flex flex-col flex-1 h-full bg-white p-4 border-2 rounded-lg shadowtext-sm justify-between">
        <div>
          <h1 className="text-black flex-1 text-2xl font-bold mb-4">
            Resultado
          </h1>
          <div className="text-black overflow-y-auto h-100 p-4">
            <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
          </div>
        </div>

        <p className="text-xs text-black text-center m-4 p-2 bg-amber-200 rounded-2xl">
          ChatGPT puede cometer errores. Comprueba la información importante.
        </p>
      </div>
    </main>
  );
}
