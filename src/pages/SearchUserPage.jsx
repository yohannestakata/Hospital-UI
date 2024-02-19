import { useEffect, useState } from "react";
import useGetPatientByCardNum from "../hooks/useGetPatientByCardNum";
import Search from "../features/reception/Search";
function SearchUserPage() {
  const [value, setValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [patient, setPatient] = useState({});
  const [docId, setDocId] = useState(patient?.opd || "");
  const { data } = useGetPatientByCardNum(debouncedSearch);

  function onSubmit(e) {
    e.preventDefault();
    setPatient(data.data.data);
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  useEffect(() => {
    setDocId(patient?.opd);
  }, [patient]);

  return (
    <Search
      value={value}
      setValue={setValue}
      data={data}
      onSubmit={onSubmit}
      patient={patient}
      docId={docId}
      setDocId={setDocId}
    />
  );
}

export default SearchUserPage;
