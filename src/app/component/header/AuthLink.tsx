"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCornerUpLeft, FiUser } from "react-icons/fi";

const AuthLink = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleSignOut = async () => {
    setOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  // Placeholder avoids the sign-in/sign-up flash for logged-in users
  if (isPending) {
    return <div className="h-8 w-24 animate-pulse rounded-full bg-base-200" />;
  }

  if (!session?.user) {
    return (
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <Link
          href="/sign-in"
          className="bg-transparent px-2 text-xs font-semibold text-base-content sm:px-4 sm:text-sm"
        >
          সাইন ইন
        </Link>
        <Link
          href="/sign-up"
          className="rounded-xl bg-primary px-3 py-1 text-xs font-semibold text-primary-content sm:px-4 sm:text-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { name, email, image } = session.user;
  const firstName = name?.trim().split(" ")[0] || "User";
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full px-1.5 py-1 transition-colors hover:bg-base-200"
      >
        {image ? (
          <Image
            src={image}
            alt={name ?? "avatar"}
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
            {initial}
          </span>
        )}

        <span className="max-w-24 truncate text-xs font-semibold text-base-content sm:text-sm">
          {firstName}
        </span>

        <FiChevronDown
          className={`text-base-content/60 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg"
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm font-bold text-base-content">
              {name}
            </p>
            <p className="truncate text-xs text-base-content/60">{email}</p>
          </div>

          <div className="my-1 h-px bg-base-300" />

          <Link
            href="/dashboard"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-base-content transition-colors hover:bg-base-200"
          >
            <FiUser />
            আমার প্রোফাইল
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <FiCornerUpLeft />
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthLink;
