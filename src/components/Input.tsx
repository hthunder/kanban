interface InputProps {
  type: "email" | "text" | "password";
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
}

export const Input = (props: InputProps) => {
  const { type, placeholder, value, setValue, required = false } = props;

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      className="border-gray-30 m-0 block w-full rounded border border-solid bg-white bg-clip-padding px-3 py-1.5 
          text-sm font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
      placeholder={placeholder}
      required={required}
    />
  );
};
