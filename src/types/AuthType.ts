import { z } from "zod";

export const RegistrationSchema = z
  .object({
    email: z
      .string()
      .email("Проверьте правильность ввода электронной почты")
      .max(320, "Превышена максимальная длина адреса электронной почты"),
    password: z
      .string()
      .min(8, "Введите более 8 символов")
      .max(25, "Не более 25 символов")
      .regex(
        /^[a-zA-Z0-9~!@#$%^&*()[\]{}><\/\\|"'.,:;]+$/,
        "Пароль может содержать только латинские буквы, цифры и ~!@#$%^&*()[]{}>< и другие символы"
      )
      .refine(
        (value) => !value.startsWith(" "),
        "Пароль не должен начинаться с пробела"
      ),
    confirmPassword: z.string(),
    consent: z
      .boolean()
      .refine((value) => value, "Для регистрации необходимо дать согласие"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
      });
    }
  });
export type RegistrationForm = z.infer<typeof RegistrationSchema>;

export const LoginScheme = z.object({
  email: z
    .string()
    .email("Проверьте правильность ввода электронной почты")
    .max(320, "Превышена максимальная длина адреса электронной почты"),
  password: z
    .string()
    .min(7, "Введите более 7 символов")
    .max(25, "Не более 25 символов")
    .regex(
      /^[a-zA-Z0-9~!@#$%^&*()[\]{}><\/\\|"'.,:;]+$/,
      "Пароль может содержать только латинские буквы, цифры и ~!@#$%^&*()[]{}>< и другие символы"
    )
    .refine(
      (value) => !value.startsWith(" "),
      "Пароль не должен начинаться с пробела"
    ),
});

export type LoginType = z.infer<typeof LoginScheme>;

  export const ForgotEmailScheme = z.object({
    email: z
    .string()
    .email("Проверьте правильность ввода электронной почты")
    .max(320, "Превышена максимальная длина адреса электронной почты"),
  })

  export type ForgotEmailType = z.infer<typeof ForgotEmailScheme>

  export const ForgotCodeScheme = z.object({
    password: z
      .string()
      .min(7, "Введите более 7 символов")
      .max(25, "Не более 25 символов")
      .regex(
        /^[a-zA-Z0-9~!@#$%^&*()[\]{}><\/\\|"'.,:;]+$/,
        "Пароль может содержать только латинские буквы, цифры и ~!@#$%^&*()[]{}>< и другие символы"
      )
      .refine(
        (value) => !value.startsWith(" "),
        "Пароль не должен начинаться с пробела"
      ),
    confirmPassword: z.string(),

  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
      });
    }
  });

  export type ForgotCodeType = z.infer<typeof ForgotCodeScheme>
