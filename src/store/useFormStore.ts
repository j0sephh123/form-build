import { create } from "zustand";

export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}

interface FormStore {
  fields: FormField[];
  addField: (field: FormField) => void;
  updateField: (id: string, field: Partial<FormField>) => void;
  removeField: (id: string) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  fields: [
    {
      id: "field-1",
      label: "Full Name",
      placeholder: "Enter your full name",
      type: "text",
    },
    {
      id: "field-2",
      label: "Email Address",
      placeholder: "Enter your email",
      type: "text",
    },
  ],
  addField: (field) => {
    set((state) => {
      const newFields = [...state.fields, field];
      return { fields: newFields };
    });
  },
  updateField: (id, field) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...field } : f)),
    })),
  removeField: (id) =>
    set((state) => ({
      fields: state.fields.filter((f) => f.id !== id),
    })),
}));
