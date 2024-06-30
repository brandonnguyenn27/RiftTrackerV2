import Search from "./Search";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-blue-500 p-3 flex items-center">
      <Link className="text-3xl text-white ml-4 mr-16" href="/">
        RiftTracker
      </Link>
      <Search />
    </div>
  );
};

export default Header;
