import {
  Role,
  AuthCredential,
  AuthUser,
  CommonResponse,
  Provider,
} from "@/types";

import { SubmissionContext } from "vee-validate";

interface useAuthOptions {
  // determine who using this auth composable
  usedBy: "user" | "admin";
  // callback that called after do some action inside the composable
  callback?: Function;
}

/**
 * composable for all auth related
 *
 */
export default function (options?: useAuthOptions) {
  // other composable

  /**
   * use request options
   */
  const { requestOptions } = useRequestOptions();

  const {
    setErrorMessage,
    setSuccessMessage,
    message,
    alertType,
    transformErrors,
    loading,
  } = useRequestHelper();

  const { $Oauth, $OauthProviders } = useNuxtApp();

  const { $toast } = useNuxtApp();

  // state

  const defaultRedirect = "/sign-in";

  const userProfileURL = "/users/profile";
  const userLogoutURL = "/users/logout";

  const userLoginURL = "/users/login";
  const adminLoginURL = "/admins/login";

  const adminProfileURL = "/admins/profile";
  const adminLogoutURL = "/admins/logout";

  const adminRedirect = "/admin/orders";
  const userRedirect = "/user";

  /**
   * use cookie for auth
   */
  const $credential = useCookie<AuthCredential | null>("auth-token", {
    expires: new Date(Date.now() + 12096e5), // 2 weeks from now
    sameSite: "lax",
    path: "/",
    watch: true,
  });

  /**
   * state of logged user
   */
  const $user = useState<AuthUser | undefined>("auth-user");

  /**
   * state of credential form
   * can use for $login and $register
   */
  const $credentialForm = ref({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  /**
   * state of forgot password
   */
  const $credentialForgotPassword = ref({
    email: "",
    pin: "",
    password: "",
    confirm_password: "",
  });

  const _emailForResent = ref();

  const $showRegisterSubmitBtn = ref(true);
  const $showResentEmailBtn = ref(false);

  /**
   * state of forgot password setup
   */
  const $countdownHelper = ref({
    showExpired: false,
    // after email forgot password was request then this value countdown
    expiredTime: 60,
  });

  // computed

  /**
   * determine if user is logged in
   */
  const $isLoggedIn = computed(() => {
    return !!$credential.value;
  });

  /**
   * determine if user is admin role
   */
  const $isAdmin = computed(() => {
    return $credential.value?.role === Role.ADMIN;
  });

  /**
   * determine if user is user role
   */
  const $isUser = computed(() => {
    return $credential.value?.role === Role.USER;
  });

  /**
   * Redirect After Login Section
   *
   * this not limited to admin and user role
   * you can use it for other role
   *
   *
   */
  const _redirectLogin = computed(() => {
    if (options?.usedBy === "admin") {
      return adminRedirect;
    }
    return userRedirect;
  });

  /**
   * Path for login url
   *
   * can be modified to fit your need
   */
  const _loginURL = computed(() => {
    if (options?.usedBy === "admin") {
      return adminLoginURL;
    }
    return userLoginURL;
  });

  /**
   * Path for register url
   *
   * most register only by role user only . but this not limited you to modify
   */
  const _registerURL = computed(() => {
    return "/users/register";
  });

  /**
   * Path for verification email
   *
   */
  const _verificationEmailURL = computed(() => {
    if (options?.usedBy === "admin") {
      return "/admins/email-verification";
    }
    return "/users/email-verification";
  });

  /**
   * Path for verification email change
   */
  const _verificationEmailChangeURL = computed(() => {
    if (options?.usedBy === "admin") {
      return "/admins/verify-email-changes";
    }
    return "/users/verify-email-changes";
  });

  /**
   * Path for forgot password
   */
  const _requestForgotPasswordURL = computed(() => {
    if (options?.usedBy === "admin") {
      return "/admins/forget-password";
    }
    return "/users/forget-password";
  });

  /**
   * Path for verify pin
   *
   */
  const _verificationForgotPasswordPinURL = computed(() => {
    if (options?.usedBy === "admin") {
      return "/admins/forget-password/verify-pin";
    }
    return "/users/forget-password/verify-pin";
  });

  /**
   * Path for reset password
   */
  const _resetPasswordURL = computed(() => {
    if (options?.usedBy === "admin") {
      return "/admins/forget-password/reset-password";
    }
    return "/users/forget-password/reset-password";
  });

  const _registerRequestResendEmailVerificationURL = computed(() => {
    return "/users/resend-email-verification";
  });

  // functions

  /**
   * Clear credential in cookie and redirect to default login page
   */
  function _clearCredential(redirectUrl?: string) {
    // clear credential in cookie
    useCookie("auth-token").value = null;
    // redirect to default login page
    if (redirectUrl) {
      // console.log(redirectUrl);
      window.location.replace(redirectUrl);
    } else {
      // console.log(defaultRedirect);
      window.location.replace(defaultRedirect);
    }
  }

  /**
   * Set user object to state
   * @param {AuthUser | undefined} user - user object from backend response
   */
  function $setAuthUser(user: AuthUser | undefined) {
    /**
     * Set state of logged user
     * @type {AuthUser | undefined}
     */
    $user.value = user;
  }

  /**
   * fetch credential current logged in user
   */
  async function _fetchProfile(url: string) {
    loading.value = true;

    const { data } = await useFetch<CommonResponse<AuthUser>>(url, {
      method: "GET",
      ...requestOptions,
    });

    if (data.value?.data) {
      $setAuthUser(data.value.data);
    }

    loading.value = false;
  }

  async function _logoutAuth(url: string, redirectUrl?: string) {
    loading.value = true;

    await useFetch<CommonResponse<{ message: string }>>(url, {
      method: "POST",
      ...requestOptions,
    });

    _clearCredential(redirectUrl);

    loading.value = false;
  }

  /**
   * fetch credential current logged in user
   *
   * call this function on start app or while update user
   *
   * following name should be import to:
   * - loading
   */
  async function $fetchAuthProfile() {
    let url = userProfileURL;

    if ($credential.value?.role === Role.ADMIN) {
      url = adminProfileURL;
    }

    return await _fetchProfile(url);
  }

  /**
   * handle logout for all users
   *
   * following name should be import to:
   * - loading
   */
  async function $logout() {
    loading.value = true;

    let url = userLogoutURL;

    let redirectUrl = "/sign-in";

    if ($credential.value?.role === Role.ADMIN) {
      url = adminLogoutURL;

      redirectUrl = "/admin/sign-in";
    }

    return await _logoutAuth(url, redirectUrl);
  }

  /**
   * Handles the login request for the user
   *
   *  following name should be import to:
   * - loading
   * - message
   * - alertType
   * - $credentialForm
   *
   * @param {any} values
   * @param {SubmissionContext}
   *
   */
  async function $login(values: any, ctx: SubmissionContext) {
    loading.value = true;

    /**
     * Send a POST request to login
     * to the backend server
     */
    const { data, error } = await useFetch<{ token: string; message: string }>(
      _loginURL.value,
      {
        method: "POST",
        /**
         * The body of the request must
         * contain an email and password
         */
        body: {
          email: $credentialForm.value.email,
          password: $credentialForm.value.password,
        },
        ...requestOptions,
      }
    );

    /**
     * If there is an error
     * set the error message and the errors from the backend
     */
    if (error.value) {
      setErrorMessage(error.value?.data?.message ?? "Credential is not valid");
      ctx.setErrors(transformErrors(error.value?.data));
    } else if (data.value?.token) {
      /**
       * If the request is successful
       * then set the credential in the store
       */
      const role = options?.usedBy === "admin" ? Role.ADMIN : Role.USER;

      $credential.value = {
        token: data.value.token,
        role,
        provider: Provider.LOCAL,
      };
      /**
       * Redirect the user to the page
       * they were trying to access before
       */
      window.location.replace(_redirectLogin.value);
    }

    /**
     * Set the pending to false
     * to stop the loading indicator
     */
    loading.value = false;
  }

  /**
   * login with google account powered by universal-sosial-auth
   *
   * following name should be import to:
   * - loading
   */
  async function $loginWithGoogle() {
    loading.value = true;
    const response:
      | { code: string; promps: string; scope: string }
      | undefined = await $Oauth.authenticate(
      "google",
      // @ts-ignore
      $OauthProviders("google")
    );

    if (response?.code) {
      _loginTokenGoogle(response?.code);
    } else {
      $toast.error("Something went wrong. Please try again later.");
    }
    loading.value = false;
  }

  /**
   * for now we only used by user for google login
   */
  async function _loginTokenGoogle(code: string) {
    loading.value = true;
    const { data, error } = await useFetch<{ token: string }>(
      "/users/google/login",
      {
        method: "POST",
        body: { code },
        ...requestOptions,
      }
    );

    if (error.value) {
      $toast.error(
        error.value?.data?.message ??
          "Something went wrong. Please try again later."
      );
    } else if (data.value?.token) {
      const role = Role.USER;
      $credential.value = {
        token: data.value.token,
        role,
        provider: Provider.GOOGLE,
      };

      window.location.replace(_redirectLogin.value);
    }
    loading.value = false;
  }

  /**
   * user register
   *
   * following name should be import to:
   * - loading
   * - message
   * - alertType
   * - $registerRequestEmailForActiveAccount
   * - $showResentEmailBtn
   *  -$credentialForm
   */
  async function $register(values: any, ctx: SubmissionContext) {
    // if user already registered
    if ($showResentEmailBtn.value) {
      return;
    }

    loading.value = true;
    _emailForResent.value = $credentialForm.value.email;

    /**
     * Send a POST request to login
     * to the backend server
     */
    const { data, error } = await useFetch<{ message: string }>(
      _registerURL.value,
      {
        method: "POST",
        body: { ...$credentialForm.value },
        ...requestOptions,
      }
    );

    /**
     * If there is an error
     * set the error message and the errors from the backend
     */
    if (error.value) {
      setErrorMessage(error.value?.data?.message ?? "Credential is not valid");
      ctx.setErrors(transformErrors(error.value?.data));
    } else if (data.value) {
      /**
       * If the request is successful
       * then set the credential in the store
       */
      ctx.resetForm();
      setSuccessMessage(
        `Account has been created please check your email to activate your account`
      );

      /**
       * Show the resend email button
       *
       * sometime the email while register not sending to the user so we need to show the resend email button
       * to resend the email
       */
      _setShowResendEmailButton();
    }

    /**
     * Set the pending to false
     * to stop the loading indicator
     */
    loading.value = false;
  }

  /**
   * sometime the email while register not sending to the user so we request for new token
   *
   * following name should be import to:
   * - loading
   * - $register
   * - message
   * - alertType
   */
  async function $registerRequestEmailForActiveAccount() {
    loading.value = true;

    loading.value = true;
    const { data, error } = await useFetch<{ data: { message: string } }>(
      _registerRequestResendEmailVerificationURL.value,
      {
        method: "POST",
        body: {
          email: _emailForResent.value,
        },
        ...requestOptions,
      }
    );

    if (error.value) {
      setErrorMessage(error.value?.data?.message);
    } else {
      setSuccessMessage(
        data.value?.data?.message ??
          "Please check your email to activate your account."
      );
    }

    loading.value = false;
  }

  /**
   * verification email is used for
   * activate account after user register or admin create new user
   *
   * following name should be import to:
   * - loading
   *
   */
  async function $verificationEmail(token: string) {
    loading.value = true;
    const { data, error } = await useFetch<{ data: { message: string } }>(
      `${_verificationEmailURL.value}/${token}`,
      {
        method: "POST",
        ...requestOptions,
      }
    );
    loading.value = false;

    /**
     * some times verification email has their own style
     * so we let the component to decide what to do about the response
     */

    return {
      data: data?.value,
      error: error?.value,
    };
  }

  /**
   * verification email is used for
   * after user change email with not same with old email
   *
   * following name should be import to:
   * - loading
   */
  async function $verificationEmailChange(token: string) {
    loading.value = true;
    const { data, error } = await useFetch<{ data: { message: string } }>(
      `${_verificationEmailChangeURL.value}/${token}`,
      {
        method: "POST",
        ...requestOptions,
      }
    );
    loading.value = false;

    /**
     * some times verification email has their own style
     * so we let the component to decide what to do about the response
     */

    return {
      data: data.value,
      error: error.value,
    };
  }

  /**
   * STEP 1 FORGOT PASSWORD
   * 
   * following name should be import to:
   * - loading
   * - $credentialForgotPassword
   * - message
   * - alertType 
   * 
   * and don't forget to passing options for the composable example
   *  - useAuth({
     usedBy:"user",
     callback:reload()
   })
   **/
  async function $requestForgotPassword(values: any, ctx: SubmissionContext) {
    loading.value = true;
    const { data, error } = await useFetch<CommonResponse<{ message: string }>>(
      _requestForgotPasswordURL.value,
      {
        method: "POST",
        body: { email: $credentialForgotPassword.value.email },
        ...requestOptions,
      }
    );

    if (error.value) {
      setErrorMessage(error.value?.data?.message);
      ctx.setErrors(transformErrors(error.value?.data));
    } else {
      $toast.success(
        data.value?.data?.message ??
          "OTP has been sent to your email. Please check your email."
      );
      if (options?.callback) {
        options?.callback();
      }
    }
    loading.value = false;
  }

  /**
   * STEP 1 FORGOT PASSWORD SOME CASE THE EMAIL IS NOT SEND TO THE USER
   *
   */
  async function $reRequestForgotPassword() {
    loading.value = true;
    const { data, error } = await useFetch<CommonResponse<{ message: string }>>(
      _requestForgotPasswordURL.value,
      {
        method: "POST",
        body: { email: $credentialForgotPassword.value.email },
        ...requestOptions,
      }
    );
    if (error.value) {
      setErrorMessage(error.value?.data?.message);
    } else {
      $toast.success(
        data.value?.data?.message ??
          "OTP has been sent to your email. Please check your email."
      );
    }
    loading.value = false;
  }

  /**
    * STEP 2 FORGOT PASSWORD VERIFY THE TOKEN OR PIN
    * 
    * following name should be import to:
    * - loading
    * - $credentialForgotPassword
    * - message
    * - alertType 
    * 
    * and don't forget to passing options for the composable example
    *  - useAuth({
      usedBy:"user",
      callback:reload()
    })
    **/
  async function $verificationOTPForgotPassword(
    values: any,
    ctx: SubmissionContext
  ) {
    loading.value = true;
    const { data, error } = await useFetch<CommonResponse<{ message: string }>>(
      _verificationForgotPasswordPinURL.value,
      {
        method: "POST",
        body: {
          email: $credentialForgotPassword.value.email,
          pin: $credentialForgotPassword.value.pin,
        },
        ...requestOptions,
      }
    );

    if (error.value) {
      setErrorMessage(error.value?.data?.message);
      ctx.setErrors(transformErrors(error.value?.data));
    } else {
      $toast.success(
        data.value?.data?.message ??
          "OTP has been sent to your email. Please check your email."
      );
      if (options?.callback) {
        options?.callback();
      }
    }

    loading.value = false;
  }

  /**
  * STEP 3 FORGOT PASSWORD SET NEW PASSWORD
  * 
  * following name should be import to:
  * - loading
  * - $credentialForgotPassword
  * - message
  * - alertType 
  * 
  * and don't forget to passing options for the composable example
  *  - useAuth({
    usedBy:"user",
    callback:reload()
  })
  **/
  async function $setNewPasswordForgotPassword(
    values: any,
    ctx: SubmissionContext
  ) {
    loading.value = true;

    const { data, error } = await useFetch<CommonResponse<{ message: string }>>(
      _resetPasswordURL.value,
      {
        method: "POST",
        body: {
          email: $credentialForgotPassword.value.email,
          pin: $credentialForgotPassword.value.pin,
          password: $credentialForgotPassword.value.password,
          confirm_password: $credentialForgotPassword.value.confirm_password,
        },
        ...requestOptions,
      }
    );

    if (error.value) {
      setErrorMessage(error.value?.data?.message);
      ctx.setErrors(transformErrors(error.value?.data));
    } else {
      $toast.success(
        data.value?.data?.message ??
          "Your password has been set. Please login with your new password."
      );
      if (options?.callback) {
        options?.callback();
      }
    }
  }

  /**
   * helper function for countdown expired token for forgot password
   * -call this function onMounted
   */
  function $countdownTokenExpired() {
    const interval = setInterval(() => {
      if ($countdownHelper.value.expiredTime === 0) {
        clearInterval(interval);
        $countdownHelper.value.showExpired = true;
      } else {
        $countdownHelper.value.expiredTime--;
      }
    }, 1000);
  }

  function _setShowResendEmailButton() {
    const interval = setInterval(() => {
      $showResentEmailBtn.value = true;
      clearInterval(interval);
    }, 5000);
  }

  return {
    // state
    $isLoggedIn,
    $logout,
    $user,
    $isAdmin,
    $isUser,
    // fetch
    $fetchAuthProfile,
    // login
    $credentialForm,
    $credentialForgotPassword,
    $login,
    $loginWithGoogle,
    // register
    $register,
    $registerRequestEmailForActiveAccount,
    $showResentEmailBtn,
    $verificationEmail,
    $verificationEmailChange,
    // forgot password
    $requestForgotPassword,
    $reRequestForgotPassword,
    $verificationOTPForgotPassword,
    $setNewPasswordForgotPassword,
    // forgot password && register
    $countdownTokenExpired,
    $countdownHelper,
    // general
    loading,
    message,
    alertType,
  };
}
