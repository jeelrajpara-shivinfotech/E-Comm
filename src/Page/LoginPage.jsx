import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/logo.svg";
import iconText from "../assets/logo-text.svg";
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../Api/authApi";
import signUp from "../assets/sign-up.webp";
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData.email, formData.password);
      console.log("Login success:", data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <>
      {/* MOBILE BACK BUTTON */}
      <a
        href="/"
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
      </a>

      {/* MAIN CONTAINER */}
      <div className="min-h-screen justify-between gap-x-8 px-4 py-8 pt-10 md:pt-12 lg:flex lg:p-6 xl:gap-x-10 xl:p-7 2xl:p-10 2xl:pt-10 items-stretch overflow-hidden">
        {/* LEFT SECTION */}
        <div className="relative flex w-full pt-10 justify-center lg:w-5/12 2xl:justify-end 2xl:pe-24">
          <div className="w-full max-w-sm lg:py-7 lg:ps-3 lg:pt-16 2xl:w-[500px] 2xl:max-w-none 2xl:ps-20 2xl:pt-7">
            {/* Desktop back link */}
            <a
              href="/"
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
            </a>

            {/* LOGO + HEADER */}
            <div className="mb-7 text-left">
              <a href="/" className="mb-6 inline-flex items-center">
                <img src={icon} alt="logo" className="h-8" />
                <img src={iconText} alt="text" className="ml-2 h-5" />
              </a>

              <h2 className="font-bold mb-5 mt-3 text-[26px] leading-snug md:text-3xl lg:mb-7 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl">
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
                      d="M62.4325 0.957703C55.5264 1.2859 48.7014 1.68945 42.0459 2.13063C32.6242 2.75474 23.2063 3.40038 13.8451 4.42263C10.8984 4.74545 7.90595 4.94989 4.97767 5.35341C3.13948 5.60628 0.702089 5.96671 0.382211 6.04203C0.214902 6.08507 0.141911 6.1497 0.118325 6.17122C-0.0475096 6.32187 -0.0172508 6.46707 0.0763539 6.58006C0.113943 6.62848 0.208995 6.74689 0.472857 6.76303C18.1192 7.86599 36.1635 5.71388 53.8312 5.48791C84.4702 5.10053 116.038 6.63929 146.433 9.99658C146.699 10.0235 146.957 9.88894 146.994 9.68987C147.038 9.49618 146.846 9.30786 146.581 9.28096C116.134 5.91829 84.5144 4.37415 53.8165 4.76691C37.3509 4.97674 20.5603 6.86525 4.07184 6.21962C4.45068 6.16582 4.82217 6.112 5.16122 6.06357C8.0777 5.66005 11.0576 5.461 13.9925 5.13818C23.3338 4.11593 32.7326 3.4703 42.1417 2.85157C53.8165 2.07681 65.9998 1.40965 78.279 1.0976C82.6718 1.14602 87.0498 1.19446 91.4278 1.25364C100.899 1.38277 110.414 1.75939 119.863 2.26514C122.708 2.42117 125.553 2.58256 128.398 2.72245C129.341 2.77087 131.774 2.91073 132.113 2.89997C132.533 2.88921 132.614 2.63098 132.621 2.58794C132.643 2.4911 132.629 2.35658 132.422 2.2436C132.4 2.22745 132.267 2.17362 131.973 2.14134C114.792 0.236721 96.4471 -0.0806646 78.2937 0.376658C59.1453 0.177588 39.9232 0.0914646 20.8234 0Z"
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
            <div className="grid grid-cols-1 gap-4 pb-5 pt-5 md:grid-cols-2 md:pb-6 xl:gap-5 xl:pb-7">
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
            <div className="relative flex items-center mt-4 justify-center mb-5 2xl:mb-7 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-gray-200">
              <span className="relative z-10 bg-white px-3 text-gray-500">
                OR
              </span>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-200 rounded-md px-4 py-3 h-12 focus:outline-none focus:border-black"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••"
                      className="w-full border border-gray-200 rounded-md px-4 py-3 h-12 focus:outline-none focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showPassword ? (
                        <FaRegEye size={18} />
                      ) : (
                        <FaRegEyeSlash size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* REMEMBER ME + FORGOT */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      name="remember"
                      checked
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 accent-black"
                    />
                    Remember me
                  </label>
                  <a
                    href="/auth/forgot-password-1"
                    className="text-blue-600 hover:underline text-sm font-semibold"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md flex items-center justify-center"
                >
                  Sign in
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 256 256"
                    className="ms-2 mt-0.5 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* SIGNUP LINK */}
            <p className="mt-6 text-gray-500">
              Don’t have an account?{" "}
              <a
                href="/auth/sign-up-1"
                className="font-semibold text-gray-700 hover:text-blue-600"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden rounded-[20px] dark:bg-gray-100/40 lg:flex ">
          <div className="pb-8 pt-10 text-center xl:pt-16 2xl:block 2xl:w-[1000px]">
            <div className="mx-auto mb-10 max-w-sm pt-2 2xl:max-w-lg">
              <h2 className="text-3xl mb-3 font-bold lg:text-[26px] 2xl:px-10 2xl:text-[32px]">
                The simplest way to manage your workspace.
              </h2>
              <p className="text-gray-700 leading-[1.85] md:leading-loose 2xl:px-6">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint velit officia consequat duis.
              </p>
            </div>

            <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
              <img
                src={signUp}
                alt="Sign Up Thumbnail"
                className="object-cover absolute inset-0 w-full h-full rounded-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
