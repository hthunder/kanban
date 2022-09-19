interface ButtonProps {
  text: string;
  fullWidth?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { text, fullWidth = false } = props;

  return (
    <button
      className={`rounded-md bg-violet-400 px-5 py-3 text-white ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {text}
    </button>
  );
};
