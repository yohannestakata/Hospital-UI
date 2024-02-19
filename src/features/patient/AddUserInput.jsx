function AddUserInput({
  label,
  id,
  type,
  placeholder,
  register,
  error,
  defaultValue,
}) {
  return (
    <label htmlFor={id} className="flex flex-1 flex-col gap-1">
      <div className="flex items-center gap-3">
        <span className="ml-1 text-sm font-bold ">{label}</span>
        <p className="text-sm font-bold text-red-800">
          {error && error.message}
        </p>
      </div>
      <input
        {...register}
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={` rounded-md border border-gray-400 px-3 py-2 ${
          error ? "focus:outline-red-800" : "focus:outline-green-800"
        }`}
      />
    </label>
  );
}

export default AddUserInput;
