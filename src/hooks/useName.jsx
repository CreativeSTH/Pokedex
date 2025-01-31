import { create } from "zustand";

export const useName = create((set) => ({
        name: null,
        setName: (name) => set({ name }),
        clearName: () => {name: ''},
    })
)