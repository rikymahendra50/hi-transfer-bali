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
  const { t: $t } = useI18n();

  const notANumber = "Not a number";
  const emailField = string().email($t("validasi-email"));
  const passwordField = string()
    .min(7, $t("validasi-password"))
    .max(50, $t("validasi-max-password"));
  const confirmPasswordField = string()
    .min(7, $t("validasi-confirm-password"))
    .max(50, $t("validasi-confirm-max-password"));
  const firstNameField = string().min(1, $t("first-name-required"));
  const lastNameField = string().min(1, $t("last-name-required"));
  const otpField = string()
    .min(6, $t("otp-minimum"))
    .max(6, $t("otp-maksimum"));

  const passwordAndConfirm = object({
    password: passwordField,
    confirm_password: confirmPasswordField,
  }).superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        path: ["confirm_password"],
        code: "custom",
        message: $t("password-not-match"),
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
        .min(1, $t("orderCarSchema.telepon"))
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
      locations: z
        .array(z.number())
        .min(1, { message: "needs to be exactly 1" }),
      "description[en]": string().min(1, "description en harus diisi"),
      "description[id]": string().min(1, "description id harus diisi"),
      "meta[en]": string().min(1, "meta en harus diisi"),
      "meta[id]": string().min(1, "meta id harus diisi"),
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
      pickup_address: string().min(1, $t("carSearchSchema.pickup_address")),
      return_address: string().min(1, $t("carSearchSchema.return_address")),
      pickup_date: string().min(1, $t("carSearchSchema.pickup_address")),
      // return_date: string().min(1, $t("carSearchSchema.return_date")),
    })
  );

  const carSearchSchemaIfPickUpTrue = toTypedSchema(
    object({
      pickup_address: string().min(1, $t("carSearchSchema.pickup_address")),
      return_address: string().min(1, $t("carSearchSchema.return_address")),
      pickup_date: string().min(1, $t("carSearchSchema.pickup_address")),
      return_date: string().min(1, $t("carSearchSchema.return_date")),
    })
  );

  const tourSearchSchema = toTypedSchema(
    object({
      location: union([string(), number(), any()]).refine(
        (val) => val !== undefined && val !== null && val !== "", // Validasi required
        { message: $t("tourSearchSchema.location") }
      ),
      activity_date: string().min(1, $t("tourSearchSchema.activity_date")),
      // total_passengers: string().min(
      //   1,
      //   $t("tourSearchSchema.total_passengers")
      // ),
    })
  );

  const tourSearchSchema2 = toTypedSchema(
    object({
      activity_date: string().min(1, $t("tourSearchSchema.activity_date")),
    })
  );

  const orderCarSchema = toTypedSchema(
    object({
      name: string().min(1, $t("orderCarSchema.name")),
      email: emailField,
      phone: string()
        .min(1, $t("orderCarSchema.telepon"))
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

  // const bookingSchema = toTypedSchema()

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
    tourSearchSchema,
    carSearchSchemaIfPickUpTrue,
    tourSearchSchema2,
  };
}
