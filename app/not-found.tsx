import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center gap-y-6 py-40">
      <h1 className="h1">
        404<span className="text-accent">.</span>
      </h1>
      <p className="max-w-sm">
        This page doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="px-8 py-3 rounded-full bg-accent hover:opacity-90 transition-all duration-300 font-medium"
      >
        Back home
      </Link>
    </div>
  );
}
