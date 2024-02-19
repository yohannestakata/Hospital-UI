import AddUserForm from "../features/patient/AddUserForm";

function AddUserPage() {
  return (
    <div className="flex justify-center">
      <div className="bg-white p-3 flex flex-col rounded-md w-full mx-2">
        <h2 className="text-2xl">ታካሚ መመዝገብያ</h2>
        <AddUserForm />
      </div>
    </div>
  );
}

export default AddUserPage;
