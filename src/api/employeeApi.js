import { db } from "../firebase-config";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";

// Получить всех сотрудников
export const fetchEmployees = async () => {
  const snapshot = await getDocs(collection(db, "employees"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Добавить сотрудника
export const addEmployee = async (employeeData) => {
  const docRef = await addDoc(collection(db, "employees"), {
    ...employeeData,
    hiredAt: new Date()
  });
  return docRef.id;
};

// Обновить сотрудника
export const updateEmployee = async (id, employeeData) => {
  await updateDoc(doc(db, "employees", id), employeeData);
};

// Удалить сотрудника
export const deleteEmployee = async (id) => {
  await deleteDoc(doc(db, "employees", id));
};