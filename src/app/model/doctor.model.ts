import { Specialty } from "./specialty.model";

// Doctor Model (doctor.model.ts)
export interface Doctor {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    gender: boolean;
    profilePicture: string;
    createdAt: Date;
    updatedAt: Date;
    specialty: Specialty;
  }
  