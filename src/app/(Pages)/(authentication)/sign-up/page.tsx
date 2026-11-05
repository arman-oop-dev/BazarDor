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
import { FaUserPlus } from "react-icons/fa";

const inputClass =
  "h-10 w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm text-base-content outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelClass = "mb-1 text-sm font-medium text-base-content";

const SignUpPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handlerOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("fullname") as string).trim();
    const email = (formData.get("email") as string).trim();
    const pass = formData.get("password") as string;

    setLoading(true);
    const toastId = toast.loading("অ্যাকাউন্ট তৈরি হচ্ছে...");

    const { error } = await authClient.signUp.email({
      name,
      email,
      password: pass,
    });

    setLoading(false);

    if (error) {
      const message = error.message || "সাইন আপ করা যায়নি। আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message, { id: toastId });
      return;
    }

    toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে", { id: toastId });
    router.push("/");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200/40 px-4 py-8 sm:py-10">
      <Suspense fallback={<LoadingSpinner />}>
        <section className="mx-auto w-full max-w-md">
          {/* Heading */}
          <div className="mb-5 space-y-2 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaUserPlus className="text-xl" />
            </div>

            <h2 className="text-2xl font-bold text-base-content">
              অ্যাকাউন্ট তৈরি করুন
            </h2>

            <p className="text-xs text-base-content/60">
              বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>
          </div>

          {/* Signup Form */}
          <Form
            onSubmit={handlerOnSubmit}
            className="flex w-full flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6"
          >
            {/* Name */}
            <TextField isRequired name="fullname" className="w-full">
              <Label className={labelClass}>নাম</Label>
              <Input placeholder="যেমন: আরিফুল ইসলাম" className={inputClass} />
              <FieldError />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) =>
                /^[A-Z0-9.\_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? null
                  : "সঠিক ইমেইল ঠিকানা লিখুন"
              }
            >
              <Label className={labelClass}>ইমেইল</Label>
              <Input placeholder="you@example.com" className={inputClass} />
              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type="password"
              className="w-full"
              value={password}
              onChange={setPassword}
              validate={(value) => {
                if (value.length < 8) return "কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন";
                if (!/[A-Z]/.test(value))
                  return "অন্তত একটি বড় হাতের অক্ষর ব্যবহার করুন";
                if (!/[0-9]/.test(value))
                  return "অন্তত একটি সংখ্যা ব্যবহার করুন";
                return null;
              }}
            >
              <Label className={labelClass}>পাসওয়ার্ড</Label>
              <Input placeholder="পাসওয়ার্ড দিন" className={inputClass} />
              <FieldError />
            </TextField>

            {/* Confirm Password */}
            <TextField
              isRequired
              name="confirmPassword"
              type="password"
              className="w-full"
              validate={(value) =>
                value !== password ? "পাসওয়ার্ড দুটি মিলছে না" : null
              }
            >
              <Label className={labelClass}>পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input placeholder="আবার লিখুন" className={inputClass} />
              <FieldError />
            </TextField>

            {/* Server Error */}
            {formError && (
              <p
                role="alert"
                className="w-full rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger"
              >
                {formError}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              isDisabled={loading}
              className="mt-1 h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-content shadow-sm transition-colors hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </Button>

            <AuthSocialLogin />

            {/* Sign In Link */}
            <p className="w-full text-center text-sm text-base-content/70">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-primary hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </Form>
        </section>
      </Suspense>
    </main>
  );
};

export default SignUpPage;
