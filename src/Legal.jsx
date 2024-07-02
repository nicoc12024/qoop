const Legal = () => {
  return (
    <div className="font-pilat xl:max-w-full md:max-w-[260px] text-black md:pr-0 pr-[30px] text-[10px]">
      <span>
        © 2024 Block, Inc. BLOCK and the Block Logo are trademarks of Block, Inc.
      </span>{" "}
      <a
        href="/legal"
        rel="noreferrer noopener"
        className="font-semibold border-b-[1.2px] border-black cursor-pointer ease-in transition-all hover:border-white hover:text-white"
      >
        Legal
      </a>
    </div>
  );
};

export default Legal;
