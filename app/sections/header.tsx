import Logo from "@/components/logo";

export default function Header() {
  return (
    <header className="bg-white w-full py-2">
      <div className="container flex items-center justify-between">
        <Logo />
        <p>CountryTrekker</p>
      </div>
    </header>
  );
}
