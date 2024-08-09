const Buffer = () => {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div
          style={{ width: `${35}px`, height: `${35}px` }}
          className="animate-spin"
        >
          <div
            className="h-full w-full border-4 border-t-slate-700
       border-b-slate-700 rounded-[50%]"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Buffer;
