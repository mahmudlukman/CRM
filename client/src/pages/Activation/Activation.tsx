import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useActivationMutation } from "../../redux/features/auth/authApi";
import type { ServerError } from "../../@types";
import { Spinner } from "../../components/ui/Spinner";

const Activation = () => {
  const { activation_token } = useParams<{ activation_token: string }>();
  const navigate = useNavigate();
  const [activation, { isSuccess, isError }] = useActivationMutation();
  const hasRun = useRef(false);

  const onSubmit = useCallback(async () => {
    if (!activation_token) {
      toast.error("Missing token");
      return;
    }

    try {
      const result = await activation({ activation_token }).unwrap();
      toast.success(result.message || "Account activated successfully");
    } catch (err: unknown) {
      const serverError = err as ServerError;
      const errorMessage =
        serverError.data?.message || serverError.message || "Activation failed";
      toast.error(errorMessage);
    }
  }, [activation_token, activation]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    onSubmit();
  }, [onSubmit]);

  const goHome = () => navigate("/");
  const goToLogin = () => navigate("/login");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-[#0B1D19]">
      <div className="max-w-md w-full bg-[#FBF8F0] rounded-2xl border border-[#CBA135]/20 shadow-2xl shadow-black/40 p-10 text-center space-y-6">
        {isError ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full border border-[#B23A2E]/40 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#B23A2E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold text-[#12271F]">
              Activation failed
            </p>
            <p className="font-['Inter'] text-[#5F6B63]">
              Please try again or contact support for assistance.
            </p>
            <button
              onClick={goHome}
              className="mt-2 px-6 py-3 bg-[#CBA135] hover:bg-[#E8C97A] text-[#0B1D19] font-['Inter'] font-semibold rounded-lg transition-colors duration-200"
            >
              Go back home
            </button>
          </div>
        ) : isSuccess ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full border border-[#4F7D5F]/40 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#4F7D5F]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold text-[#12271F]">
              Activation successful
            </p>
            <p className="font-['Inter'] text-[#5F6B63]">
              Your account has been activated. You can now log in and start
              using the platform.
            </p>
            <button
              onClick={goToLogin}
              className="mt-2 px-6 py-3 bg-[#CBA135] hover:bg-[#E8C97A] text-[#0B1D19] font-['Inter'] font-semibold rounded-lg transition-colors duration-200"
            >
              Go to login
            </button>
          </div>
        ) : (
          <>
            <Spinner />
            <p className="text-xl font-semibold text-[#12271F]">
              Activating your account…
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Activation;
