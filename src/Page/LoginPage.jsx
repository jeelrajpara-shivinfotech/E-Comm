import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import iconText from "../assets/logo-text.svg";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { loginUser } from "../Api/authApi";
import { toast } from "react-toastify";
import BaseLoader from "../Component/BASE/BaseLoader";
import { ROUTES } from "../Routes/RouteConstants";
import { ArrowLeft, Underline } from "../assets/svg";
import { LoginConstants } from "../common/constants/LoginConstants";
import BaseLogin from "../Component/BASE/BaseLogin";
import { ErrorMessages, Regex } from "../common/Validations";
import * as Yup from "yup";
import { FieldNames } from "../common/constants/FormFields";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const loginSchema = Yup.object({
    email: Yup.string()
      .email(ErrorMessages.InvalidEmail)
      .required(ErrorMessages.Required(FieldNames.Email)),

    password: Yup.string()
      .min(8, ErrorMessages.MinLength(8))
      .matches(Regex.UpperCase, ErrorMessages.UpperCaseError)
      .matches(Regex.Num, ErrorMessages.NumError)
      .matches(Regex.SpecialChar, ErrorMessages.SpecialCharError)
      .required(ErrorMessages.Required(FieldNames.Password)),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const data = await loginUser(values); 
      toast.success(data.message);
      
      localStorage.setItem("token", data.data.token);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      // const messages = Array.isArray(error.message)
      //   ? error.message
      //   : [error.message];
      // messages.forEach((msg) => toast.error(msg));
      toast.error(error.response.data.message);
      // console.log(error.response.data.message);
      
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
        <ArrowLeft />
        <p className="ms-1 font-lexend">{LoginConstants.backToHome}</p>
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
              <ArrowLeft color="gray" />
              <b className="ms-1 font-medium">{LoginConstants.backToHome}</b>
            </Link>

            {/* LOGO + HEADER */}
            <div className="mb-2 text-left mt-10">
              <Link to="/" className="mb-3 inline-flex items-center">
                <img src={logo} alt="logo" className="h-8" />
                <img src={iconText} alt="text" className="ml-2 h-5" />
              </Link>

              <h2 className="font-bold text-[26px] leading-snug md:text-3xl">
                {LoginConstants.welcomeHeadingPart1}{" "}
                <span className="relative inline-block">
                  {LoginConstants.welcomeHeadingPart2}
                  <Underline />
                </span>{" "}
                {LoginConstants.welcomeHeadingPart3}
              </h2>

              <p className="text-gray-700 text-[15px] leading-relaxed pt-5">
                {LoginConstants.welcomeParagraph}
              </p>
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2  xl:gap-5 ">
              <button
                type="button"
                className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:border-black hover:text-black h-11"
              >
                <FaApple className="me-2 h-4 w-4" /> {LoginConstants.signInApple}
              </button>
              <button
                type="button"
                className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:border-black hover:text-black h-11"
              >
                <FcGoogle className="me-2 h-4 w-4" /> {LoginConstants.signInGoogle}
              </button>
            </div>

            {/* OR DIVIDER */}
            <div className="relative flex items-center mt-4 justify-center mb-3 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-gray-200">
              <span className="relative z-10 bg-white px-3 text-gray-500">{LoginConstants.orDivider}</span>
            </div>

            {/* FORM */}
            <BaseLogin handleSubmit={handleSubmit} validationSchema={loginSchema}/>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden rounded-[20px] dark:bg-gray-100/40 lg:flex lg:items-center lg:justify-center">
          <div className="pb-8 text-center xl:pt-10 lg:pt-10 ">
            <div className=" mb-10 pt-2">
              <h2 className="text-3xl mb-3 font-bold lg:text-[26px] 2xl:px-10 2xl:text-[32px]">
                {LoginConstants.rightHeading}
              </h2>
              <p className="text-gray-700 leading-[1.85] md:leading-loose 2xl:px-6">
                {LoginConstants.rightParagraph}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
