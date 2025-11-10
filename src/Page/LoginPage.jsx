import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import iconText from "../assets/logo-text.svg";
import { loginUser } from "../Api/authApi";
import { toast } from "react-toastify";
import { ROUTES } from "../Routes/RouteConstants";
import { Underline } from "../assets/svg";
import { errorMessages, regex } from "../common/validation";
import * as Yup from "yup";
import { fieldNames } from "../common/constants/formField";
import BaseLoader from "../Component/BaseComponents/BaseLoader";
import BaseLogin from "../Component/BaseComponents/BaseLogin";
import { loginConstant } from "../common/constants/loginConstant";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginSchema = Yup.object({
    email: Yup.string()
      .email(errorMessages.invalidEmail)
      .required(errorMessages.Required(fieldNames.Email)),

    password: Yup.string()
      .required(errorMessages.Required(fieldNames.Password))
      .min(8, errorMessages.minLength)
      .test(
        "uppercase",
        errorMessages.uppercase,
        (value) => !value || regex.uppercase.test(value)
      )
      .test(
        "lowercase",
        errorMessages.lowercase,
        (value) => !value || regex.lowercase.test(value)
      )
      .test(
        "number",
        errorMessages.number,
        (value) => !value || regex.num.test(value)
      )
      .test(
        "specialChar",
        errorMessages.specialChar,
        (value) => !value || regex.specialChar.test(value)
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

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative flex w-full justify-center lg:max-w-xl">
          <div className="w-full max-w-lg lg:px-3 2xl:max-w-none 2xl:px-20">
            <div className="mb-2 text-center max-w-md mx-auto">
              <div className="mb-3 inline-flex items-center justify-center">
                <img src={logo} alt="logo" width={100} />
              </div>

              <h2 className="font-bold mb-5 text-[26px] leading-snug md:text-3xl md:leading-normal lg:mb-7 lg:text-[28px] xl:text-3xl 2xl:text-4xl lexend">
                {loginConstant.welcomeHeadingPart1}{" "}
                <span className="relative inline-block">
                  {loginConstant.welcomeHeadingPart2}
                  <Underline />
                </span>{" "}
                {loginConstant.welcomeHeadingPart3}
              </h2>

              <p className="text-[14px] pt-2 font-normal leading-[1.85] text-gray-700 md:leading-loose inter">
                {loginConstant.welcomeParagraph}
              </p>
            </div>

            {/* FORM */}
            <BaseLogin handleSubmit={handleSubmit} validationSchema={loginSchema} />
          </div>
        </div>
      </div>

    </>
  );
}
