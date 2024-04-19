import Link from "next/link";

export default function Header() {
  return (
    <div className="navbar bg-base-100 drop-shadow">
      <Link href="/" className="btn btn-ghost text-xl">
        CountryTrekker
      </Link>
    </div>
  );
}
