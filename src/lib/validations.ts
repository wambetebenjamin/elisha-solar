import { z } from "zod";
import { counties } from "@/lib/counties";

const kenyanPhone = /^(?:\+?254|0)[17]\d{8}$/;

export const quoteSchema = z.object({
  propertyType: z.enum(["residential", "commercial", "agricultural"]),
  monthlyBill: z
    .number({ invalid_type_error: "Select a monthly bill range" })
    .min(1000, "Monthly bill must be at least KES 1,000")
    .max(2000000, "Monthly bill is too high for this form"),
  county: z.enum(counties, { errorMap: () => ({ message: "Select a Kenyan county" }) }),
  facilitySize: z
    .string()
    .trim()
    .min(1, "Tell us the number of rooms or the facility size")
    .max(120, "Keep this under 120 characters"),
  contactMethod: z.enum(["call", "whatsapp", "email"]),
  name: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(kenyanPhone, "Use a Kenyan mobile number, for example 0712 345 678"),
  email: z.string().trim().email("Enter a valid email address"),
  notes: z.string().trim().max(800, "Keep notes under 800 characters").optional(),
  recaptchaToken: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept the privacy notice to continue" }),
  }),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(kenyanPhone, "Use a Kenyan mobile number, for example 0712 345 678"),
  topic: z.enum(["quote", "maintenance", "support", "partnership", "other"]),
  message: z
    .string()
    .trim()
    .min(20, "Please give us at least 20 characters")
    .max(1500, "Keep your message under 1,500 characters"),
  recaptchaToken: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept the privacy notice to continue" }),
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const recaptchaVerifySchema = z.object({
  token: z.string().min(1, "Missing reCAPTCHA token"),
  action: z.string().min(1).max(60).optional(),
});

export const billBands = [
  { label: "Under KES 5,000", value: 4000 },
  { label: "KES 5,000 to 10,000", value: 7500 },
  { label: "KES 10,000 to 20,000", value: 15000 },
  { label: "KES 20,000 to 40,000", value: 30000 },
  { label: "KES 40,000 to 80,000", value: 60000 },
  { label: "Above KES 80,000", value: 120000 },
] as const;

export const propertyTypes = [
  { value: "residential", label: "Residential", hint: "Home, apartment or rental" },
  { value: "commercial", label: "Commercial", hint: "Office, retail, school or factory" },
  { value: "agricultural", label: "Agricultural", hint: "Farm, borehole or irrigation" },
] as const;

export const contactMethods = [
  { value: "call", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
] as const;
