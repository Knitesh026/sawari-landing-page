import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50, {
    message: "Name cannot be longer than 50 characters."
  }).regex(/^[a-zA-Z\s]+$/, {
    message: "Name can only contain letters and spaces."
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z.string().min(10, {
    message: "Mobile number must be at least 10 digits.",
  }).max(15, {
    message: "Mobile number cannot be longer than 15 digits."
  }).regex(/^[0-9+\-\s]+$/, {
    message: "Mobile number can only contain digits, +, -, and spaces."
  }),
  address: z.string().min(5, {
    message: "Please enter your complete address.",
  }).max(200, {
    message: "Address cannot be longer than 200 characters."
  }),
  district: z.string().min(2, {
    message: "Please enter your district.",
  }),
  state: z.string().min(2, {
    message: "Please enter your state.",
  }),
  licenseNumber: z.string().min(5, {
    message: "Please enter a valid license number.",
  }).regex(/^[A-Z0-9\-\/]+$/i, {
    message: "License number can only contain letters, numbers, hyphens and forward slashes."
  }),
  rcNumber: z.string().min(5, {
    message: "Please enter a valid RC number.",
  }).regex(/^[A-Z0-9\-\/]+$/i, {
    message: "RC number can only contain letters, numbers, hyphens and forward slashes."
  }),
  insuranceNumber: z.string().min(5, {
    message: "Please enter a valid insurance number.",
  }).regex(/^[A-Z0-9\-\/]+$/i, {
    message: "Insurance number can only contain letters, numbers, hyphens and forward slashes."
  }),
  vehicleDetails: z.string().min(5, {
    message: "Please provide vehicle details.",
  }).max(500, {
    message: "Vehicle details cannot be longer than 500 characters."
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
  pincode: z.string().min(6, {
    message: "PIN code must be 6 digits.",
  }).max(6).regex(/^[0-9]+$/, {
    message: "PIN code can only contain numbers."
  }),
});
