import Image from "next/image";
import GrowstackLogo from "../public/growstack-logo.png"; // Make sure the path is correct
import HamburgerMenu from "../components/HamburgerMenu";

export default function Home() {
  return (
    <main className="flex flex-col items-start p-4">
      {/* ✅ Logo and Hamburger */}
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-2">
          <Image
            src={GrowstackLogo}
            alt="Growstack Logo"
            width={40}
            height={40}
          />
          <span className="font-bold text-lg">Growstack</span>
        </div>

        <HamburgerMenu />
      </div>

      {/* ✅ Rest of your homepage */}
      <h1 className="text-2xl font-semibold mb-2">Welcome to Growstack Marketplace</h1>
      <p>Your one-stop shop for digital products in Africa.</p>
    </main>
  );
}
