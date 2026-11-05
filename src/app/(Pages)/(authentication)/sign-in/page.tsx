"use client";

import AuthSocialLogin from "@/app/component/header/AuthSocialLogin";
import LoadingSpinner from "@/app/component/Loading";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";

const inputClass =
  "h-11 w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm text-base-content outline-none transition-all placeholder:text-base-content/40 focus:border-primary focus:ring-2 focus:ring-primary/10";

const labelClass = "mb-1.5 text-sm font-semibold text-base-content";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handlerOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;

    setLoading(true);
    const toastId = toast.loading("সাইন ইন হচ্ছে...");

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });

    setLoading(false);

    if (error) {
      const message = "ইমেইল বা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।";

      setFormError(message);
      toast.error(message, { id: toastId });
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে", { id: toastId });
    router.push("/");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200/40 px-3 py-8 sm:px-5 sm:py-12">
      <Suspense fallback={<LoadingSpinner />}>
        <section className="mx-auto w-full max-w-md">
          {/* Heading */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
              <FaLock className="text-xl text-primary" />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
              সাইন ইন
            </h1>

            <p className="mx-auto mt-2 max-w-xs text-xs leading-6 text-base-content/60 sm:text-sm">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে আপনার অ্যাকাউন্টে
              প্রবেশ করুন।
            </p>
          </div>

          {/* Sign In Form */}
          <Form
            onSubmit={handlerOnSubmit}
            className="flex w-full flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6"
          >
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) =>
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? null
                  : "সঠিক ইমেইল ঠিকানা লিখুন"
              }
            >
              <Label className={labelClass}>ইমেইল ঠিকানা</Label>

              <Input placeholder="you@example.com" className={inputClass} />

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type="password"
              className="w-full"
            >
              <Label className={labelClass}>পাসওয়ার্ড</Label>

              <Input
                placeholder="আপনার পাসওয়ার্ড দিন"
                className={inputClass}
              />

              <FieldError />
            </TextField>

            {/* Form Error */}
            {formError && (
              <p
                role="alert"
                className="w-full rounded-lg border border-error/20 bg-error/5 px-3 py-2.5 text-xs font-medium text-error"
              >
                {formError}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              isDisabled={loading}
              className="mt-1 h-11 w-full rounded-lg bg-primary text-sm font-bold text-primary-content shadow-sm transition-all hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
            </Button>

            {/* Social Login */}
            <AuthSocialLogin />

            {/* Sign Up Link */}
            <div className="w-full border-t border-base-300 pt-4">
              <p className="text-center text-xs text-base-content/60 sm:text-sm">
                অ্যাকাউন্ট নেই?{" "}
                <Link
                  href="/sign-up"
                  className="font-bold text-primary transition-colors hover:underline"
                >
                  সাইন আপ করুন
                </Link>
              </p>
            </div>
          </Form>

          {/* Footer */}
          <p className="mt-5 text-center text-[11px] text-base-content/40">
            আপনার অ্যাকাউন্টের তথ্য নিরাপদে সংরক্ষিত থাকবে।
          </p>
        </section>
      </Suspense>
    </main>
  );
};

export default SignInPage;
