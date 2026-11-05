"use client";

import LoadingSpinner from "@/app/component/Loading";
import { authClient } from "@/lib/auth-client";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FiCornerUpLeft } from "react-icons/fi";

const UserProfile = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Send logged-out visitors to sign in
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const updatedName = (formData.get("name") as string).trim();

    if (!updatedName || updatedName === session?.user?.name) {
      setMessage({ type: "error", text: "নতুন একটি নাম লিখুন।" });
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({ name: updatedName });
    setSaving(false);

    if (error) {
      setMessage({
        type: "error",
        text: error.message || "আপডেট করা যায়নি। আবার চেষ্টা করুন।",
      });
      return;
    }

    setMessage({ type: "success", text: "তথ্য আপডেট হয়েছে।" });
    router.refresh();
  };

  if (isPending || !session?.user) {
    return (
      <main className="container mx-auto mt-10 max-w-3xl space-y-4 px-4">
        <div className="h-12 w-48 animate-pulse rounded-lg bg-base-200" />
        <div className="h-24 animate-pulse rounded-2xl bg-base-200" />
        <div className="h-48 animate-pulse rounded-2xl bg-base-200" />
      </main>
    );
  }

  const { name, email, image } = session.user;
  const initial = name?.trim().charAt(0).toUpperCase() || "?";

  return (
    <main className="container mx-auto mt-10 max-w-3xl px-4 pb-10">
      <Suspense fallback={<LoadingSpinner />}>
        {/* Heading */}
        <div className="mb-5 space-y-1">
          <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-base-content/60">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            {image ? (
              <Image
                src={image}
                alt={name ?? "avatar"}
                width={80}
                height={80}
                className="size-16 shrink-0 rounded-xl object-cover sm:size-20"
              />
            ) : (
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-content sm:size-20">
                {initial}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-base-content sm:text-lg">
                {name}
              </h2>
              <p className="truncate text-xs text-base-content/70 sm:text-sm">
                {email}
              </p>
            </div>
          </div>

          <Button
            type="button"
            onPress={handleSignOut}
            className="h-9 shrink-0 gap-1.5 rounded-lg border border-danger bg-transparent px-3 text-xs font-semibold text-danger transition-colors hover:bg-danger/10 sm:px-4 sm:text-sm"
          >
            <FiCornerUpLeft />
            সাইন আউট
          </Button>
        </div>

        {/* Update Profile Card */}
        <div className="mt-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5">
          <p className="text-base font-semibold text-base-content">
            তথ্য আপডেট করুন
          </p>

          <Form
            onSubmit={handleUpdateProfile}
            className="mt-4 flex w-full flex-col gap-4"
          >
            <TextField
              isRequired
              name="name"
              defaultValue={name}
              className="w-full"
            >
              <Label className="mb-1 text-sm font-medium text-base-content">
                নাম
              </Label>
              <Input
                placeholder="আপনার নাম"
                className="h-10 w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm text-base-content outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </TextField>

            {message && (
              <p
                role="alert"
                className={`w-full rounded-lg px-3 py-2 text-sm ${
                  message.type === "success"
                    ? "bg-success/10 text-success"
                    : "bg-danger/10 text-danger"
                }`}
              >
                {message.text}
              </p>
            )}

            <Button
              type="submit"
              isDisabled={saving}
              className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-content shadow-sm transition-colors hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "অপেক্ষা করুন..." : "আপডেট করুন"}
            </Button>
          </Form>
        </div>
      </Suspense>
    </main>
  );
};

export default UserProfile;
