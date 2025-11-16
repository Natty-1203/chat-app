import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { dataBase } from "./fb";

export const userStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (userId) => {
        if (!userId) return set({ currentUser: null, isLoading: false });

        try {
            const docRef = doc(dataBase, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false });
            }else set({ currentUser: null, isLoading: false })
        } catch (error) {
            console.log(error)
            return set({ currentUser: null, isLoading: false });
        }
    }
}));