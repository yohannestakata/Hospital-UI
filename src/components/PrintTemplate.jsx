import { FaEnvelope, FaPhone } from "react-icons/fa";

function PrintTemplate({ children, patient, hideFoot, key, isPrescription }) {
  return (
    <div
      className="left-0 top-0 print:visible print:absolute print:block print:h-full print:w-full print:text-black"
      key={key}
    >
      <div className=" mb-8 hidden flex-col items-center justify-between print:flex print:text-xs">
        <div className="flex items-center justify-center gap-2 ">
          <div className="flex flex-col items-center justify-center gap-2">
            <img src="ahc_logo.png" alt="" className="aspect-square w-14" />
            <h1 className="flex flex-col  text-lg font-bold">
              <span className=" text-center font-amharic">አመዴ ከፍተኛ ክሊኒክ</span>
              <span>Amedie Higher Clinic</span>
            </h1>
          </div>
        </div>
        <div className=" flex flex-col justify-end text-center text-sm">
          <div className="flex flex-col  items-center text-center text-sm">
            <div className=" mt-2 flex gap-4 ">
              <span className="flex items-center  gap-2">
                <FaPhone /> 011-277 94 79/ 011-276 83 06
              </span>
              <span className="flex items-center  gap-2">
                <FaEnvelope /> 5324
              </span>
            </div>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="font-amharic">አመዴ ገበያ ፊት ለፊት</span>
            <span>Infront of Amedie Gebeya</span>
          </div>
          {isPrescription && (
            <h2 className="mt-4 text-lg font-bold">PRESCRIPTION PAPER</h2>
          )}
        </div>

        {patient && (
          <div className="mt-2 flex justify-center gap-4">
            <span>
              Name:
              <span className="font-amharic font-bold">{patient.name}</span>
            </span>
            <span>
              Age: <span className="font-bold">{patient.age}</span>
            </span>
            <span>
              Sex: <span className="font-bold">{patient.gender}</span>
            </span>
            <span>
              Card Number:{" "}
              <span className="font-bold">{patient.cardNumber}</span>
            </span>
          </div>
        )}
        {isPrescription && (
          <div className="w-full">
            <div className="mt-6 flex w-full  gap-6">
              <span className="flex">Code: ___________</span>
              <span className="flex flex-1">
                In patient: ___________________________
              </span>
              <span className="flex flex-1">
                Out patient: ___________________________
              </span>
            </div>
            <div className="mt-4 w-full">
              Diagnosis:
              _____________________________________________________________________________________________________
            </div>
            <div className="mt-4 w-full py-3">RX.</div>
          </div>
        )}
      </div>
      {children}
      {!hideFoot && (
        <div className="mt-8 hidden w-full gap-8 print:flex">
          <div className="flex items-end gap-2">
            <span className="">Reported by:</span>
            <span className="">_________________________</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="">Signiture:</span>
            <span className="">____________</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="">Date:</span>
            <span className="">_________________</span>
          </div>
        </div>
      )}
      {isPrescription && (
        <div className="absolute bottom-0 left-0 hidden w-full justify-between text-sm print:flex">
          <div className="flex flex-col gap-2">
            <span className="font-bold">Prescriber</span>
            <span>Full Name: _____________________</span>
            <span>Qualification: _____________________</span>
            <span>Signiture: _____________________</span>
            <span>Date: _____________________</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Dispensers</span>
            <span>Full Name: _____________________</span>
            <span>Reg No: _____________________</span>
            <span>Sign: _____________________</span>
            <span>Date: _____________________</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrintTemplate;
