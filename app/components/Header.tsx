import Search from "./Search";

const Header = () => {
  return (
    <div className="bg-blue-500 p-3 flex items-center">
      <p className="text-3xl text-white ml-4 mr-16">RiftTracker</p>
      <Search />
    </div>
  );
};

export default Header;
