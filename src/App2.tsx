import Canvas3D from "./components/Canvas3D";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  return (
    <div className="w-full h-full">
      <Canvas3D />
      <div className=" absolute top-2 right-2  bg-white">
        <div className="p-3">
          <QRCodeCanvas value={`${location.href}`}></QRCodeCanvas>
        </div>
      </div>
    </div>
  );
}

export default App;
