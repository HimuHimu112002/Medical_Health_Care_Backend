import { z } from 'zod';
export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: z.string().min(2,{ message: "Must be 2 or more characters long" }),
      email: z.string().email(),
      contactNumber: z.string(),
      profilePhoto: z.string().optional(),
    }),
  })
});
export const AdminValidations = {
  updateAdminValidationSchema,
};
