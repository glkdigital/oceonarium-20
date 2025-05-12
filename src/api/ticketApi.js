import { db } from "../firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const calculateTickets = async (adults, children) => {
  const price = {
    adult: 500,
    child: 300
  };
  const total = adults * price.adult + children * price.child;

  const docRef = await addDoc(collection(db, "tickets"), {
    adults,
    children,
    total,
    createdAt: new Date()
  });

  return { total, id: docRef.id };
};

export const fetchTicketHistory = async () => {
  const snapshot = await getDocs(collection(db, "tickets"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};