import {
    object,
    string,
    any,
    number,
    optional,
    boolean,
    union,
    array,
  } from "zod";
  import { toTypedSchema } from "@vee-validate/zod";

export default function (){
    const emailField=string().email("Please enter a valid email")
    const passwordField=string().min(7, "Password should be at least 7 characters").max(50, "Password should be at most 50 characters")
    const confirmPasswordField=string().min(7, "Confirm Password should be at least 7 characters").max(50, "Confirm Password should be at most 50 characters")
    const firstNameField=string().min(1, "First name is required")
    const lastNameField=string().min(1, "Last name is required")
    const otpField=string().min(6, "OTP should be at least 6 characters").max(6, "OTP should be at most 6 characters")



    const passwordAndConfirm=object({
        password: passwordField,
        confirm_password: confirmPasswordField
    }).superRefine((data, ctx) => {
        if (data.password !== data.confirm_password) {
            ctx.addIssue({
                path: ["confirm_password"],
                code: "custom",
                message: "Passwords do not match",
            });
        }
    })


    const loginSchema = toTypedSchema(
        object({
            email: emailField,
            password: passwordField
        })
    )

    const registerSchema = toTypedSchema(
        object({
            first_name: firstNameField,
            last_name: lastNameField,
            email: emailField,
        }).and(passwordAndConfirm)
    )

    const onlyEmailSchema = toTypedSchema(
        object({
            email: emailField
        })
    )

    const otpSchema = toTypedSchema(
        object({
            otp: otpField
        })
    )

 

    const resetPasswordSchema = toTypedSchema(
        passwordAndConfirm
    )

    const updatePasswordSchema=toTypedSchema(
        object({
            old_password: passwordField,
        }).and(passwordAndConfirm)
    )

    

    return {
        loginSchema,
        registerSchema,
        onlyEmailSchema,
        otpSchema,
        resetPasswordSchema,
        updatePasswordSchema
    }
}