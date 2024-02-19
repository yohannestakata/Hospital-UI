import { ColorRing } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex justify-center">
      <ColorRing
        visible={true}
        height="48"
        width="48"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#166534"]}
      />
    </div>
  );
}

export default Loading;
