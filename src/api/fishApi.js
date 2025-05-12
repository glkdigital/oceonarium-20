import { db } from "../firebase-config";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";

// Получить всех рыб
export const fetchFish = async () => {
  const snapshot = await getDocs(collection(db, "fish"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Добавить рыбу
export const addFish = async (fishData) => {
  const docRef = await addDoc(collection(db, "fish"), {
    ...fishData,
    createdAt: new Date()
  });
  return docRef.id;
};

// Обновить рыбу
export const updateFish = async (id, fishData) => {
  await updateDoc(doc(db, "fish", id), fishData);
};

// Удалить рыбу
export const deleteFish = async (id) => {
  await deleteDoc(doc(db, "fish", id));
};