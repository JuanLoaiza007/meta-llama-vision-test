"use client";

import { useState, useEffect } from "react";
import { useImages } from "@/app/hooks/useImages";
import { Trash2, Edit2, Check, X } from "lucide-react";

export default function ImageUploadPage() {
  const { images, refresh, createImage, updateImage, deleteImage } =
    useImages();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Load images on mount
  useEffect(() => {
    refresh();
  }, []);

  // Generate dataURL preview when file changes
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name.trim()) return;
    try {
      await createImage({ name: name.trim(), dataUrl: preview });
      setFile(null);
      setName("");
      setPreview("");
    } catch (err) {
      console.error("Error creating image:", err);
    }
  };

  const startEdit = (img) => {
    setEditingId(img.id);
    setEditName(img.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async (img) => {
    try {
      await updateImage({ ...img, name: editName.trim() });
      cancelEdit();
    } catch (err) {
      console.error("Error updating image:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">CRUD de Imágenes (IndexedDB)</h1>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-2xl mb-1 font-bold">Selecciona imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full bg-blue-700 text-white border-1 rounded-2xl p-4 hover:cursor-pointer"
          />
        </div>
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover rounded"
          />
        )}
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Subir imagen
        </button>
      </form>

      {/* Images List */}
      <div className="space-y-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="flex items-center space-x-4 border p-4 rounded"
          >
            <img
              src={img.dataUrl}
              alt={img.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              {editingId === img.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border-b pb-1"
                />
              ) : (
                <p className="font-medium">{img.name}</p>
              )}
              <p className="text-sm text-gray-500">
                Creado: {new Date(img.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-2">
              {editingId === img.id ? (
                <>
                  <button onClick={() => saveEdit(img)} title="Guardar">
                    <Check className="w-5 h-5 text-green-600 hover:opacity-80" />
                  </button>
                  <button onClick={cancelEdit} title="Cancelar">
                    <X className="w-5 h-5 text-red-600 hover:opacity-80" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(img)} title="Editar">
                    <Edit2 className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                  </button>
                  <button onClick={() => deleteImage(img.id)} title="Eliminar">
                    <Trash2 className="w-5 h-5 text-red-600 hover:opacity-80" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <p className="text-center text-gray-500">No hay imágenes aún.</p>
        )}
      </div>
    </div>
  );
}
