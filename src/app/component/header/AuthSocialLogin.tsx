"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

type Provider = "google" | "github";

const AuthSocialLogin = () => {
  const [pending, setPending] = useState<Provider | null>(null);
  const [error, setError] = useState("");

  const handleSocialSignIn = async (provider: Provider) => {
    setError("");
    setPending(provider);

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      setError("লগইন করা যায়নি। আবার চেষ্টা করুন।");
      setPending(null);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-default-200" />
        <p className="shrink-0 text-sm text-base-content/70">অথবা</p>
        <div className="h-px flex-1 bg-default-200" />
      </div>

      {/* Social Login Button */}
      <div className="flex justify-center">
        <Button
          type="button"
          isDisabled={pending !== null}
          onPress={() => handleSocialSignIn("google")}
          className="flex max-w-xs items-center justify-center border border-base-300 bg-transparent font-medium text-base-content transition-all disabled:opacity-60"
        >
          <FcGoogle className="text-xl" />
          {pending === "google"
            ? "অপেক্ষা করুন..."
            : "Google দিয়ে চালিয়ে যান"}
        </Button>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthSocialLogin;
