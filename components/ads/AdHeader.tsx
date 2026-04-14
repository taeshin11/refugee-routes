export default function AdHeader() {
  return (
    <div className="w-full flex justify-center py-2">
      <div className="bg-gray-100 border border-gray-300 items-center justify-center text-gray-400 text-xs w-[728px] h-[90px] hidden md:flex">
        Advertisement 728x90
      </div>
      <div className="bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 text-xs w-[320px] h-[50px] md:hidden">
        Advertisement 320x50
      </div>
    </div>
  );
}
