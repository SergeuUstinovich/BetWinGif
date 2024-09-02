import { z } from "zod";

export const RegistrationSchema = z
  .object({
    email: z.string().email("Email_error").max(320, "Email_error_length"),
    password: z
      .string()
      .min(8, "Password_error_min_length")
      .max(25, "Password_error_max_length")
      .regex(
        /^[a-zA-Z0-9~!@#$%^&*()[\]{}><\/\\|"'.,:;]+$/,
        "Password_other_symbols"
      )
      .refine((value) => !value.startsWith(" "), "Password_space"),
    confirmPassword: z.string(),
    consent: z.boolean().refine((value) => value, "Consent_is_required"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords_do_not_match",
        path: ["confirmPassword"],
      });
    }
  });
export type RegistrationForm = z.infer<typeof RegistrationSchema>;

export const LoginScheme = z.object({
  email: z.string().email("Email_error").max(320, "Email_error_length"),
  password: z
    .string()
    .min(8, "Password_error_min_length")
    .max(25, "Password_error_max_length")
    .regex(
      /^[a-zA-Z0-9~!@#$%^&*()[\]{}><\/\\|"'.,:;]+$/,
      "Password_other_symbols"
    )
    .refine((value) => !value.startsWith(" "), "Password_space"),
});

export type LoginType = z.infer<typeof LoginScheme>;

export const ForgotEmailScheme = z.object({
  email: z.string().email("Email_error").max(320, "Email_error_length"),
});

export type ForgotEmailType = z.infer<typeof ForgotEmailScheme>;

export const ForgotCodeScheme = z
  .object({
    password: z
      .string()
      .min(8, "Password_error_min_length")
      .max(25, "Password_error_max_length")
      .regex(
        /^[a-zA-Z0-9~!@#$%^&*()[\]{}><\/\\|"'.,:;]+$/,
        "Password_other_symbols"
      )
      .refine((value) => !value.startsWith(" "), "Password_space"),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords_do_not_match",
        path: ["confirmPassword"],
      });
    }
  });

export type ForgotCodeType = z.infer<typeof ForgotCodeScheme>;
