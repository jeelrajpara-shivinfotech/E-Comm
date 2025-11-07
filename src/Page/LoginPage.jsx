import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import iconText from "../assets/logo-text.svg";
import { loginUser } from "../Api/authApi";
import { toast } from "react-toastify";
import BaseLoader from "../Component/BASE/BaseLoader";
import { ROUTES } from "../Routes/RouteConstants";
import { ArrowLeft, Underline } from "../assets/svg";
import { loginConstants } from "../common/constants/loginConstants";
import BaseLogin from "../Component/BASE/BaseLogin";
import { errorMessages, regex } from "../common/Validations";
import * as Yup from "yup";
import { fieldNames } from "../common/constants/formFields";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginSchema = Yup.object({
    email: Yup.string()
      .email(errorMessages.InvalidEmail)
      .required(errorMessages.Required(fieldNames.Email)),

    password: Yup.string()
      .required(errorMessages.Required(fieldNames.Password))
      .test(
        "password-strength",
        errorMessages.PasswordComplexity,
        (value) => {
          if (!value) return false;
          return (
            value.length >= 8 &&
            regex.UpperCase.test(value) &&
            /[a-z]/.test(value) &&
            regex.Num.test(value) &&
            regex.SpecialChar.test(value)
          );
        }
      ),
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
    useEffect(() => {
        document.title = "My Dynamic Page Title";
      }, []); 
  };

  return (
    <>
      {loading && <BaseLoader />}

      {/* MOBILE BACK BUTTON */}
      <Link
        to="/"
        className="sticky start-0 top-0 z-20 flex items-center justify-center bg-blue-600 p-3.5 text-sm font-medium text-white md:p-4 lg:hidden lexand"
      >
        <ArrowLeft />
        <p className="ms-1 lexend !important">{loginConstants.backToHome}</p>
      </Link>

      {/* MAIN CONTAINER */}
      <div className="justify-between gap-x-8 lg:flex px-10 lg:py-6 xl:gap-x-10 items-stretch overflow-hidden">
        {/* LEFT SECTION */}
        <div className="relative flex w-full justify-center lg:max-w-xl 2xl:justify-end 2xl:pe-24">
          <div className="w-full max-w-md lg:ps-3 2xl:max-w-none 2xl:ps-20 ">
            <Link
              to="/"
              className="absolute -top-5 start-0 hidden py-8 text-gray-500 hover:text-gray-700 lg:flex lg:items-center 2xl:-top-7 2xl:ps-20 3xl:left-6"
            >
              <ArrowLeft color="gray" />
              <p className="ms-1 font-medium lexend text-sm">{loginConstants.backToHome}</p>
            </Link>

            {/* LOGO + HEADER */}
            <div className="mb-2 lg:text-left mt-20 text-center max-w-md">
              <Link to="/" className="mb-3 inline-flex items-center">
                <img src={logo} alt="logo" width={61} height={38} className="" />
                <img src={iconText} alt="text" height={5} width={99} className="ml-1 h-4" />
              </Link>

              <h2 className="font-bold mb-5 text-[26px] leading-snug md:text-3xl md:leading-normal lg:mb-7 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl lexend ">
                {loginConstants.welcomeHeadingPart1}{" "}
                <span className="relative inline-block ">
                  {loginConstants.welcomeHeadingPart2}
                  <Underline />
                </span>{" "}
                {loginConstants.welcomeHeadingPart3}
              </h2>

              <p className="text-[15px] pt-5 font-normal leading-[1.85] text-gray-700 md:leading-loose lg:pe-8 2xl:pe-14">
                {loginConstants.welcomeParagraph}
              </p>
            </div>

            {/* FORM */}
            <BaseLogin handleSubmit={handleSubmit} validationSchema={loginSchema} />
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden rounded-[20px] dark:bg-gray-100/40 lg:flex lg:items-center lg:justify-center px-14 ">
          <div className="pb-8 text-center xl:pt-10 lg:pt-10 ">
            <div className=" mb-10 pt-2">
              <h2 className="text-3xl mb-3 font-semibold lg:text-[26px] 2xl:text-[32px] lexend leading-normal!">
                {loginConstants.rightHeading}
              </h2>
              <p className="text-gray-700 leading-[1.85] md:leading-loose 2xl:px-6">
                {loginConstants.rightParagraph}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
