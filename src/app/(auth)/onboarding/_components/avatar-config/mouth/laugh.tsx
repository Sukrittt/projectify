export default function mouthLaugh() {
  const id = `mouth-laugh-id`;
  return (
    <svg
      width="73"
      height="64"
      viewBox="0 0 73 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="scale-110"
    >
      <path
        d="M69.9204 13.3305C69.7501 11.263 67.6363 10.1117 65.8448 10.8176C61.6161 12.4839 47.6267 17.7834 37.7627 19.1403C26.9401 20.6291 10.5503 18.821 5.80622 18.2319C3.87694 17.9923 2.15721 19.6504 2.49021 21.6654C3.14178 25.6081 4.48399 29.4088 6.45857 32.8914C8.6608 36.7754 11.6065 40.1877 15.1274 42.9333C18.6484 45.679 22.6757 47.7042 26.9793 48.8935C31.283 50.0827 35.7787 50.4126 40.2099 49.8644C44.6411 49.3162 48.9208 47.9005 52.8049 45.6983C56.689 43.4961 60.1012 40.5504 62.8469 37.0294C65.5925 33.5085 67.6178 29.4812 68.807 25.1775C69.8726 21.3212 70.2483 17.3106 69.9204 13.3305Z"
        fill="#171921"
        stroke="#171921"
        strokeWidth="4"
      />
      <mask
        id={id}
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="4"
        y="12"
        width="65"
        height="37"
      >
        <path
          d="M67.7931 12.1925C68.3091 16.363 67.9985 20.5943 66.8793 24.6448C65.76 28.6953 63.8539 32.4857 61.2697 35.7996C58.6856 39.1134 55.474 41.8858 51.8185 43.9585C48.1629 46.0312 44.1348 47.3636 39.9643 47.8795C35.7938 48.3955 31.5625 48.085 27.512 46.9657C23.4615 45.8464 19.6712 43.9403 16.3573 41.3562C13.0435 38.772 10.2711 35.5605 8.19838 31.9049C6.12569 28.2493 4.79332 24.2213 4.27734 20.0508L67.7931 12.1925Z"
          fill="#171921"
        />
      </mask>
      <g mask={`url(#${id})`}>
        <circle
          cx="40.5221"
          cy="52.3146"
          r="21.5"
          transform="rotate(-7.05286 40.5221 52.3146)"
          fill="#FC909F"
        />
      </g>
    </svg>
  );
}
