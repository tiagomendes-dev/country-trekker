import logoImage from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={logoImage}
        alt="Country Trekker"
        width={36}
        height={36}
        className="rounded-xl"
      />
    </Link>
  );
}
