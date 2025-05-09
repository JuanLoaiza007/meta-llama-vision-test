"use client";

import { useEffect, useState } from "react";
import {
  getAll,
  getById,
  create as dbCreate,
  update as dbUpdate,
  remove as dbRemove,
} from "@/app/services/database/indexeddb";
import {
  modelName as IMAGE_STORE,
  ImageSchema,
} from "@/app/services/models/image";

export function useImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    const all = await getAll(IMAGE_STORE);
    setImages(all);
  }

  async function getImageById(id) {
    return await getById(IMAGE_STORE, id);
  }

  async function createImage({ name, dataUrl }) {
    const payload = { name, dataUrl, createdAt: new Date().toISOString() };
    const schema = ImageSchema.omit({ id: true });
    const result = schema.safeParse(payload);
    if (!result.success) throw result.error;

    const created = await dbCreate(IMAGE_STORE, result.data);
    await refresh();
    return created;
  }

  async function updateImage(img) {
    const result = ImageSchema.safeParse(img);
    if (!result.success) throw result.error;

    const updated = await dbUpdate(IMAGE_STORE, result.data);
    await refresh();
    return updated;
  }

  async function deleteImage(id) {
    await dbRemove(IMAGE_STORE, id);
    await refresh();
  }

  return {
    images,
    refresh,
    getImageById,
    createImage,
    updateImage,
    deleteImage,
  };
}
