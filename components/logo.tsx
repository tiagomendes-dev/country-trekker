import logoImage from "@/public/logo.svg";
import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src={logoImage}
      alt="Country Trekker"
      width={36}
      height={36}
      className="rounded-xl"
    />
  );
}
