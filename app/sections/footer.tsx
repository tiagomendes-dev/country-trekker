import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © {year} -{" "}
          <Link href="/" className="hover:underline">
            Tiago Mendes
          </Link>
        </p>
      </aside>
    </footer>
  );
}
