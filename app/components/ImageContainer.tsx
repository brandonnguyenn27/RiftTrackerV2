import Image from "next/image";

const ItemImageContainer = ({ imageID }: { imageID: number }) => {
  return (
    <div className="m-0.5">
      {imageID == 0 ? (
        <div className="border-1 rounded-md border-gray-400 border-opacity-70 h-7 w-7 bg-slate-500 opacity-50"></div>
      ) : (
        <Image
          src={`/profileIconplaceholder.png`}
          alt="item image"
          height={28}
          width={28}
          className="rounded-lg"
        />
      )}
    </div>
  );
};

export default ItemImageContainer;
