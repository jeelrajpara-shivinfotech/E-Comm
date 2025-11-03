import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import iconText from "../assets/logo-text.svg";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { loginUser } from "../Api/authApi";
import BaseButton from "../Component/BASE/BaseButton";
import { toast } from "react-toastify";
import { loginSchema } from "../common/Validations/LoginSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import BaseLoader from "../Component/BASE/BaseLoader";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const data = await loginUser(values.email, values.password);
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      console.log("Logged in user data:", data);
      navigate("/dashboard");
    } catch (error) {
      const messages = Array.isArray(error.message)
        ? error.message
        : [error.message];
      messages.forEach((msg) => toast.error(msg));
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <BaseLoader />}

      {/* MOBILE BACK BUTTON */}
      <Link
        to="/"
        className="sticky start-0 top-0 z-20 flex items-center justify-center bg-blue-600 p-3.5 text-sm font-medium text-white md:p-4 lg:hidden"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 256 256"
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z" />
        </svg>
        <p className="ms-1 font-lexend">Back to home</p>
      </Link>

      {/* MAIN CONTAINER */}
      <div className="min-h-screen justify-between gap-x-8 lg:flex px-6 py-6 xl:gap-x-10 items-stretch overflow-hidden">
        {/* LEFT SECTION */}
        <div className="relative flex w-full justify-center lg:w-5/12 2xl:justify-end 2xl:pe-24">
          <div className="w-full max-w-xl lg:ps-3 2xl:w-[600px] 2xl:max-w-none 2xl:ps-20">
            <Link
              to="/"
              className="absolute -top-4 start-0 hidden p-3 text-gray-500 hover:text-gray-700 lg:flex lg:items-center 2xl:-top-7 2xl:ps-20"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 256 256"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z" />
              </svg>
              <b className="ms-1 font-medium">Back to home</b>
            </Link>

            {/* LOGO + HEADER */}
            <div className="mb-2 text-left mt-10">
              <a href="/" className="mb-3 inline-flex items-center">
                <img src={logo} alt="logo" className="h-8" />
                <img src={iconText} alt="text" className="ml-2 h-5" />
              </a>

              <h2 className="font-bold text-[26px] leading-snug md:text-3xl">
                Welcome back! Please{" "}
                <span className="relative inline-block">
                  Sign in to
                  <svg
                    viewBox="0 0 147 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M62.4325 0.957703C55.5264 1.2859 48.7014 1.68945 42.0459 2.13063C32.6242 2.75474 23.2063 3.40038 13.8451 4.42263C10.8984 4.74545 7.90595 4.94989 4.97767 5.35341C3.13948 5.60628 0.702089 5.96671 0.382211 6.04203C0.214902 6.08507 0.141911 6.1497 0.118325 6.17122C-0.0475096 6.32187 -0.0172508 6.46707 0.0763539 6.58006C0.113943 6.62848 0.208995 6.74689 0.472857 6.76303C18.1192 7.86599 36.1635 5.71388 53.8312 5.48791C84.4702 5.10053 116.038 6.63929 146.433 9.99658C146.699 10.0235 146.957 9.88894 146.994 9.68987C147.038 9.49618 146.846 9.30786 146.581 9.28096C116.134 5.91829 84.5144 4.37415 53.8165 4.76691C37.3509 4.97674 20.5603 6.86525 4.07184 6.21962Z"
                      fill="rgba(0 , 112 , 243 , 1)"
                    />
                  </svg>
                </span>{" "}
                continue.
              </h2>

              <p className="text-gray-700 text-[15px] leading-relaxed pt-5">
                By signing up, you will gain access to exclusive content, special
                offers, and be the first to hear about exciting news and updates.
              </p>
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2  xl:gap-5 ">
              <button
                type="button"
                className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:border-black hover:text-black h-11"
              >
                <FaApple className="me-2 h-4 w-4" /> Sign in with Apple
              </button>
              <button
                type="button"
                className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:border-black hover:text-black h-11"
              >
                <FcGoogle className="me-2 h-4 w-4" /> Sign in with Google
              </button>
            </div>

            {/* OR DIVIDER */}
            <div className="relative flex items-center mt-4 justify-center mb-3 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-gray-200">
              <span className="relative z-10 bg-white px-3 text-gray-500">OR</span>
            </div>

            {/* FORM */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5 mt-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-black"
                        placeholder="••••••••••"
                      />

                      {/* 👁️ Eye Icon inside the field */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        tabIndex={-1}
                      >
                        {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
                      </button>
                    </div>

                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>


                  <BaseButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </BaseButton>

                  <p className="mt-4 text-gray-500">
                    Don’t have an account?{" "}
                    <Link
                      to="/auth/sign-up-1"
                      className="font-semibold text-gray-700 hover:text-blue-600"
                    >
                      Sign Up
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden rounded-[20px] dark:bg-gray-100/40 lg:flex lg:items-center lg:justify-center">
          <div className="pb-8 text-center xl:pt-10 lg:pt-10 ">
            <div className=" mb-10 pt-2">
              <h2 className="text-3xl mb-3 font-bold lg:text-[26px] 2xl:px-10 2xl:text-[32px]">
                The simplest way to manage your workspace.
              </h2>
              <p className="text-gray-700 leading-[1.85] md:leading-loose 2xl:px-6">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint velit officia consequat duis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
