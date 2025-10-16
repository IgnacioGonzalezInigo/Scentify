import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection, doc,
  getDocs, getDoc, query, where,
  addDoc, serverTimestamp
} from "firebase/firestore";
import products from "../data/products.js";

const firebaseConfig = {
  apiKey: "AIzaSyBclqmU4Rnn4qACghvpF9IHGgOs6EoflmY",
  authDomain: "scentify-ecommerce.firebaseapp.com",
  projectId: "scentify-ecommerce",
  storageBucket: "scentify-ecommerce.firebasestorage.app",
  messagingSenderId: "888603337731",
  appId: "1:888603337731:web:e9d96b3f8ba335d8e35a36",
  measurementId: "G-2Y81F6H37T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// --- Lecturas ---
export async function getProducts() {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map(d => ({ docId: d.id, ...d.data() })); // no pisamos
}

export async function getProductsByCategory(categ) {
  const q = query(collection(db, "products"), where("category", "==", categ));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ docId: d.id, ...d.data() }));
}

export async function getProductById(id) {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Producto no encontrado");
  return { id: snap.id, ...snap.data() };
}


export async function createOrder(order) {
  // order: { buyer, items, total }
  const ref = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });
  return ref.id; 
}