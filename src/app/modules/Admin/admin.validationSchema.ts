import { z } from 'zod';
export const createAdminValidation = z.object({
  password: z.string({
    required_error: "password is required"
  }),
  admin: z.object({
    name: z.string().min(2,{ message: "Must be 2 or more characters long" }),
    email: z.string(),
    contactNumber: z.string(),
    profilePhoto: z.string().optional(),
  }),
});
export const AdminValidations = {
  createAdminValidation,
};
