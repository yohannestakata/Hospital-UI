import { useState, useEffect } from "react";
import useGetPatientByCardNum from "../../hooks/useGetPatientByCardNum";
import { useNavigate } from "react-router-dom";
import { usePatient } from "../../context/PatientContext";

function convertDate(date) {
  return new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function ViewPatients() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  const { data } = useGetPatientByCardNum(debouncedSearch);
  const patients = data?.data.data;

  const navigate = useNavigate();
  const { setPatient } = usePatient();

  function handleClick(patient) {
    setPatient(patient);
    navigate("/admin/history?isAdmin=true");
  }

  return (
    <div>
      <div>
        <form action="">
          <input
            type="search"
            className="w-full rounded-md border border-black/50 px-4 py-2"
            placeholder="Search patient"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="sticky left-0 top-0 grid cursor-pointer grid-cols-6 items-center justify-items-center rounded-md bg-green-800 p-3 text-sm font-bold text-green-50 hover:bg-green-50">
          <span>Card Number</span>
          <span>Name</span>
          <span>Age</span>
          <span>Sex</span>
          <span>Phone</span>
          <span>Registration Date</span>
        </div>
        {patients?.map((patient) => {
          return (
            <div
              onClick={(e) => {
                e.preventDefault();
                handleClick(patient);
              }}
              className="grid cursor-pointer grid-cols-6 items-center justify-items-center rounded-md bg-white p-3 text-sm hover:bg-green-50"
            >
              <span>{patient.cardNumber}</span>
              <span className="font-bold">{patient.name}</span>
              <span>{patient.age}</span>
              <span>{patient.gender}</span>
              <span>{patient.phone}</span>
              <span>{convertDate(patient.registrationDate)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewPatients;
