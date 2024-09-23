import z, {
  object,
  string,
  any,
  number,
  optional,
  boolean,
  union,
  array,
  instanceof as instanceof_,
} from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export default function () {
  const notANumber = "Not a number";
  const emailField = string().email("Please enter a valid email");
  const passwordField = string()
    .min(7, "Password should be at least 7 characters")
    .max(50, "Password should be at most 50 characters");
  const confirmPasswordField = string()
    .min(7, "Confirm Password should be at least 7 characters")
    .max(50, "Confirm Password should be at most 50 characters");
  const firstNameField = string().min(1, "First name is required");
  const lastNameField = string().min(1, "Last name is required");
  const otpField = string()
    .min(6, "OTP should be at least 6 characters")
    .max(6, "OTP should be at most 6 characters");

  const passwordAndConfirm = object({
    password: passwordField,
    confirm_password: confirmPasswordField,
  }).superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        path: ["confirm_password"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

  const loginSchema = toTypedSchema(
    object({
      email: emailField,
      password: passwordField,
    })
  );

  const registerSchema = toTypedSchema(
    object({
      first_name: firstNameField,
      last_name: lastNameField,
      phone: string()
        .min(1, "Telepon harus diisi")
        .transform((value, ctx) => {
          const parsed = parseInt(value);
          if (isNaN(parsed)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: notANumber,
            });
            return z.NEVER;
          }
          return parsed;
        }),
      email: emailField,
    }).and(passwordAndConfirm)
  );

  const onlyEmailSchema = toTypedSchema(
    object({
      email: emailField,
    })
  );

  const otpSchema = toTypedSchema(
    object({
      otp: otpField,
    })
  );

  const resetPasswordSchema = toTypedSchema(passwordAndConfirm);

  const updatePasswordSchema = toTypedSchema(
    object({
      old_password: passwordField,
    }).and(passwordAndConfirm)
  );

  const transportSchema = toTypedSchema(
    object({
      mobil: string().min(1, "Mobil is required"),
    })
  );

  const tourPackageSchema = toTypedSchema(
    object({
      name: string().min(1, "Nama package harus diisi"),
      price: number()
        .int()
        .min(1, "Harga harus lebih dari 0")
        .superRefine((data, ctx) => {
          if (isNaN(data)) {
            ctx.addIssue({
              path: ["price"],
              code: "custom",
              message: "Harga harus berupa angka yang valid",
            });
          }
        }),
      max_person: number().min(1, "Maksimal orang harus diisi"),
      is_active: string().min(1, "Status harus diisi"),
      locations: z.array(z.number()),
    })
  );

  const tourPackageEditSchema = toTypedSchema(
    object({
      name: string().min(1, "Nama package harus diisi"),
      price: string().min(1, "Harga package harus diisi"),
    })
  );

  const driverSchema = toTypedSchema(
    object({
      name: string().min(1, "Nama Driver wajib diisi"),
      email: emailField,
      phone: string()
        .min(1, "Telepon harus diisi")
        .transform((value, ctx) => {
          const parsed = parseInt(value);
          if (isNaN(parsed)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: notANumber,
            });
            return z.NEVER;
          }
          return parsed;
        }),
    })
  );

  const facilityCar = toTypedSchema(
    object({
      "description[en]": string().min(1, "Nama fasilitas English wajib diisi"),
      "description[id]": string().min(
        1,
        "Nama fasilitas Indonesia wajib diisi"
      ),
      // image: z.instanceof(File),
    })
  );

  const facilityCarEdit = toTypedSchema(
    object({
      "description[en]": string().min(1, "Nama fasilitas English wajib diisi"),
      "description[id]": string().min(
        1,
        "Nama fasilitas Indonesia wajib diisi"
      ),
    })
  );

  const destinationsSchema = toTypedSchema(
    object({
      name: string().min(1, "Nama destinasi wajib diisi"),
    })
  );

  const profileSchema = toTypedSchema(
    object({
      name: string().min(1, "Nama wajib diisi"),
      email: emailField,
    })
  );

  const updateProfileSchema = toTypedSchema(
    object({
      first_name: firstNameField,
      last_name: lastNameField,
      email: emailField,
    })
  );

  const carSearchSchema = toTypedSchema(
    object({
      pickup_address: string().min(1, "Lokasi penjemputan harus diisi"),
      return_address: string().min(1, "Lokasi tujuan harus diisi"),
      pickup_date: string().min(1, "Tanggal penjemputan harus diisi"),
      return_date: string().min(1, "Tanggal kembali harus diisi"),
    })
  );

  const orderCarSchema = toTypedSchema(
    object({
      name: string().min(1, "Lokasi penjemputan harus diisi"),
      email: emailField,
      // flight_number: string().min(1, "Lokasi penjemputan harus diisi"),
      phone: string()
        .min(1, "Telepon harus diisi")
        .transform((value, ctx) => {
          const parsed = parseInt(value);
          if (isNaN(parsed)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: notANumber,
            });
            return z.NEVER;
          }
          return parsed;
        }),
    })
  );

  const unSetPasswordSchema = toTypedSchema(passwordAndConfirm);

  return {
    loginSchema,
    registerSchema,
    onlyEmailSchema,
    otpSchema,
    resetPasswordSchema,
    updatePasswordSchema,
    transportSchema,
    tourPackageSchema,
    tourPackageEditSchema,
    driverSchema,
    facilityCar,
    destinationsSchema,
    profileSchema,
    updateProfileSchema,
    unSetPasswordSchema,
    facilityCarEdit,
    carSearchSchema,
    orderCarSchema,
  };
}
