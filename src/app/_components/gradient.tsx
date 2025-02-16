export const Gradient = () => {
  return (
    <>
      <div className="absolute left-[10%] top-[30%] -z-[99999] h-72 w-72 rounded-full bg-gradient-to-br from-[#CDB4F2] to-transparent blur-2xl" />
      <div className="absolute right-[10%] top-[30%] -z-[99999] h-72 w-72 rounded-full bg-gradient-to-br from-pink-300 to-transparent blur-2xl" />
      <div className="absolute bottom-[0%] left-[40%] -z-[99999] h-64 w-64 rounded-full bg-gradient-to-br from-yellow-200 to-transparent blur-3xl" />
    </>
  );
};
