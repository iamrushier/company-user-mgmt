import { z } from "zod";
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  link: z.string().optional(),
});
export type BlogFormData = z.infer<typeof blogSchema>;

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  address: z.string().min(1, "Address is required"),
  zip: z.string().min(4, "Zip code must be valid").max(10, "Zip code too long"),
  country: z.string().min(2, "Country must be valid"),
  employeeCount: z.number().min(1, "Must have at least 1 employee"),
  industry: z.string().min(2, "Industry is required"),
  marketCap: z.number().min(0, "Market cap must be positive"),
  domain: z.string().min(1, "Domain is required"),
  logo: z.string().url("Invalid logo URL"),
  ceoName: z.string().min(1, "CEO name is required"),
});
export type CompanyFormData = z.infer<typeof companySchema>;

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username must contain only letters, numbers, or underscores"
    ),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[+\d-]+$/, "Phone number can only contain digits, '+', and '-'")
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number cannot exceed 15 characters"),

  company: z.string().min(1, "Company is required"),
  address: z.string().min(1, "Address is required"),
  zip: z.string().regex(/^\d{4,10}$/, "Zip code must be between 4-10 digits"),
  state: z.string().min(2, "State must be valid"),
  country: z.string().min(2, "Country must be valid"),
});
export type UserFormData = z.infer<typeof userSchema>;
