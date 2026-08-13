import { create } from "zustand";
interface SelectedUser {
  id: string;
  name: string;
  email: string;
  credits: number;
}
interface ModelProps {
  isAddOpen: boolean;
  isDeductOpen: boolean;

  openAddModal: () => void;
  closeAddModal: () => void;

  openDeductModal: () => void;
  closeDeductModal: () => void;

  selectedUser: SelectedUser | null;
  setSelectedUser: (user: SelectedUser) => void;
}
export const useModel = create<ModelProps>((set) => ({
  isAddOpen: false,
  isDeductOpen: false,

  selectedUser: null,

  openAddModal: () =>
    set({
      isAddOpen: true,
      isDeductOpen: false,
    }),

  closeAddModal: () =>
    set({
      isAddOpen: false,
      selectedUser: null,
    }),

  openDeductModal: () =>
    set({
      isDeductOpen: true,
      isAddOpen: false,
    }),

  closeDeductModal: () =>
    set({
      isDeductOpen: false,
      selectedUser: null,
    }),

  setSelectedUser: (user) =>
    set({
      selectedUser: user,
    }),
}));
