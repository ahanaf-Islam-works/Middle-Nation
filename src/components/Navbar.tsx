import Link from "next/link";
import { Icons } from "./Icons";
import { Search } from "lucide-react";
import { buttonVariants } from "./ui/Button";
import { authOptions } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { getServerSession } from "next-auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <nav className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Middle Nation
          </p>
        </Link>

        {/* searchbar */}
        <div className="w-full max-w-md flex items-center gap-2">
          <Search className="h-5 w-5 text-zinc-600" />
          <input
            type="text"
            placeholder="Search groups"
            className="w-full bg-transparent border p-2 border-zinc-300 rounded focus:ring-0 focus:outline "
          />
        </div>

        {/* login */}
        {!session?.user ? (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In {session?.user?.name}
          </Link>
        ) : (
          <UserAccountNav
            user={{
              name: user?.name,
              image: user?.image,
              email: user?.email,
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
