import { Gender } from "@prisma/client";
import { z } from "zod";
export const createAdminValidation = z.object({
  password: z.string({
    required_error: "password is required",
  }),
  admin: z.object({
    name: z.string().min(2, { message: "Must be 2 or more characters long" }),
    email: z.string(),
    contactNumber: z.string(),
    profilePhoto: z.string().optional(),
  }),
});

export const createDoctorValidation = z.object({
  password: z.string({
    required_error: "password is required",
  }),
  doctor: z.object({
    name: z.string().min(2, { message: "Must be 2 or more characters long" }),
    email: z.string({
      required_error: "Email is required",
    }),
    contactNumber: z.string({
      required_error: "Contact number is required",
    }),
    profilePhoto: z.string().optional(),
    address: z.string({
      required_error: "Address is required",
    }),
    registrationNumber: z.string({
      required_error: "Registration number is required",
    }),
    experience: z.number({
      required_error: "Experience is required",
    }),
    gender: z.enum([Gender.MALE, Gender.FEMALE],{
      required_error: "Gender is required",
    }),
    appointmentFee: z.number({
      required_error: "Appointment fee is required",
    }),
    qualification: z.string({
      required_error: "Qualification is required",
    }),
    designation: z.string({
      required_error: "designation is required",
    }),
    currentWorkingPlace: z.string({
      required_error: "currentWorkingPlace is required",
    }),
  })
});
export const AdminValidations = {
  createAdminValidation,
  createDoctorValidation,
};
