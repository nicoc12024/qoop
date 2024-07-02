const SecondaryNav = () => {
  return (
    <div className="flex flex-col xl:flex-row xl:gap-6 gap-4 text-black">
      <div className="text-left text-[16px] font-block font-bold">
        <svg
          focusable="false"
          width="200"
          height="28"
          viewBox="0 0 200 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="blockLogo"
          role="img"
        >
          <title id="blockLogo">Block logo</title>
          <path
            d="M138.735 27.6325C149.321 27.6325 154.146 25.242 155.154 18.2536H147.636C146.703 20.9589 144.532 22.0346 137.464 22.0346H136.005C127.145 22.0346 125.496 20.2179 125.496 14.7196V13.867C125.496 8.34486 127.141 6.52806 136.002 6.52806H137.448C144.516 6.52806 146.687 7.6038 147.619 10.3091H155.137C154.13 3.34068 149.305 0.930237 138.719 0.930237H134.698C122.578 0.930237 118.017 4.15745 118.017 13.349V15.2017C118.017 24.3933 122.578 27.6206 134.698 27.6206L138.735 27.6325Z"
            fill="black"
          ></path>
          <path
            d="M112.638 15.2135C112.638 24.4051 107.924 27.6323 95.4741 27.6323H91.3583C78.9395 27.6323 74.2261 24.4051 74.2261 15.2135V13.3609C74.2261 4.16928 78.9434 0.942046 91.3583 0.942046H95.4741C107.924 0.942046 112.638 4.16928 112.638 13.3609V15.2135ZM92.5535 22.0544H94.3141V22.0345C103.514 21.9946 105.195 20.2177 105.195 14.7195V13.8987C105.195 8.37661 103.514 6.59566 94.3141 6.55981H92.5535C83.3022 6.59566 81.7085 8.37661 81.7085 13.8987V14.7514C81.7085 20.2376 83.3181 22.0145 92.5535 22.0544Z"
            fill="black"
          ></path>
          <path
            d="M34.8303 19.6244V20.1821C34.8303 25.4055 31.866 27.2621 23.527 27.27H0.0400391V1.32086H22.7501C30.866 1.32086 34.0812 2.76713 34.0812 7.54819V7.91075C34.0812 11.8113 32.2485 13.405 29.2205 13.8034V13.9907C32.5473 14.2497 34.7545 15.6959 34.8303 19.6244ZM21.9652 6.79916H7.37898V11.3969H22.1485C25.6625 11.3969 26.7463 10.879 26.7463 9.20961V9.06219C26.7463 7.3171 25.6665 6.79916 21.9652 6.79916ZM27.5033 19.1064C27.5033 16.9828 26.2283 16.5844 21.9253 16.5844L7.37898 16.5924V21.7719H21.9253C26.2681 21.7719 27.5033 21.2938 27.5033 19.2539V19.1064Z"
            fill="black"
          ></path>
          <path
            d="M69.8557 27.262V21.2538H48.5362V1.33267H41.2092V27.2819L69.8557 27.262Z"
            fill="black"
          ></path>
          <path
            d="M168.683 27.2618V19.1021L174.629 15.6557H174.852L189.139 27.2578H200L181.114 11.9863L199.478 1.3086H188.278L168.871 12.6875H168.683V1.31256H161.353V27.2618H168.683Z"
            fill="black"
          ></path>
        </svg>
      </div>
      <nav className="flex items-center justify-between md:gap-4 xl:gap-6 gap-2">
        <a className="cursor-pointer ease-in transition-all hover:text-white hover:border-white md:leading-6 leading-4 font-nav md:text-[20px] text-[14px] border-b-[1.2px] border-black text-black md:font-normal font-normal">
          Square
        </a>
        <a className="cursor-pointer ease-in transition-all hover:text-white hover:border-white md:leading-6 leading-4 font-nav md:text-[20px] text-[14px] border-b-[1.2px] border-black text-black md:font-normal font-normal">
          Cash App
        </a>
        <a className="cursor-pointer ease-in transition-all hover:text-white hover:border-white md:leading-6 leading-4 font-nav md:text-[20px] text-[14px] border-b-[1.2px] border-black text-black md:font-normal font-normal">
          Spiral
        </a>
        <a className="cursor-pointer ease-in transition-all hover:text-white hover:border-white md:leading-6 leading-4 font-nav md:text-[20px] text-[14px] border-b-[1.2px] border-black text-black md:font-normal font-normal">
          Tidal
        </a>
        <a className="cursor-pointer ease-in transition-all hover:text-white hover:border-white md:leading-6 leading-4 font-nav md:text-[20px] text-[14px] border-b-[1.2px] border-black text-black md:font-normal font-normal">
          TBD
        </a>
      </nav>
    </div>
  );
};

export default SecondaryNav;
