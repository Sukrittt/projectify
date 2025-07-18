export default function hairThick(props: {
  color: string;
  colorRandom: boolean;
}) {
  const { color, colorRandom } = props;
  return (
    <svg
      width="240"
      height="200"
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M210.177 51.3965C201.855 91.2936 103.499 96.8962 83.6772 96.8962C31.6548 102.823 56.6248 165.262 66.1772 196.396C58.6772 197.396 59.6772 206.396 30.6772 134.896C7.47724 77.6964 73.1831 42.8337 121.999 30.9995C170.815 19.1653 189.499 2.50195 189.499 2.50195C210.177 11 215.116 27.7185 210.177 51.3965Z"
        fill={(colorRandom && color) || "black"}
        stroke={(colorRandom && color) || "black"}
      />
      <path
        d="M205.134 124.947L189.316 71.5069L199.354 62.3644C210.109 99.4523 210.601 120.988 205.134 124.947Z"
        fill={(colorRandom && color) || "black"}
        stroke={(colorRandom && color) || "black"}
      />
      <path
        d="M80 170C74.4 142.8 60.3333 147.667 51 149L41 105L81.5844 96.5056C82.3363 96.2656 83.1408 96.0955 84 96L81.5844 96.5056C63.4332 102.299 75.9565 148.796 91 168L80 170Z"
        fill={(colorRandom && color) || "black"}
        stroke={(colorRandom && color) || "black"}
        strokeWidth="3"
      />
      <path
        d="M24.9887 67.3632C33.8341 62.9091 44.2805 65.4873 48.3981 67.3331L36.6273 82.2134C39.6625 77.3568 30.1329 70.2897 24.9887 67.3632Z"
        fill={(colorRandom && color) || "black"}
      />
      <path
        d="M10 84.4996C21.6 77.6996 32.8333 79.9996 37 81.9996L32.5 97.5C31.3 89.1 17 85.3331 10 84.4996Z"
        fill={(colorRandom && color) || "black"}
      />
    </svg>
  );
}
