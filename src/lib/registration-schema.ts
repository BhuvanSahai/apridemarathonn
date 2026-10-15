import { z } from 'zod';

export const RegistrationStep1Schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Please select your gender',
  }),
  dob: z.string().min(1, 'Date of birth is required'),
  city: z.string().min(2, 'City is required'),
  emergencyContactName: z
    .string()
    .min(2, 'Emergency contact person is required'),
  emergencyContactPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
});

export const RegistrationStep2Schema = z.object({
  category: z.enum(['5k', '10k', '21k', '42k'], {
    message: 'Please select a race category',
  }),
  tShirtSize: z.enum(['XS', 'S', 'M', 'L', 'XL', '2XL'], {
    message: 'Please select your t-shirt size',
  }),
  bibName: z
    .string()
    .min(2, 'Bib name must be at least 2 characters')
    .max(16, 'Bib name maximum 16 characters')
    .regex(/^[A-Za-z0-9 ]+$/, 'Alphanumeric characters only'),
  medicalNotes: z.string().optional(),
});

export const RegistrationStep3Schema = z.object({
  acceptTerms: z.literal(true, {
    message: 'You must accept the race rules and indemnity waiver',
  }),
});

export const FullRegistrationSchema = RegistrationStep1Schema.merge(
  RegistrationStep2Schema
).merge(RegistrationStep3Schema);

export type RegistrationFormData = z.infer<typeof FullRegistrationSchema>;
