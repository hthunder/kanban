interface LabelProps {
  text: string;
  children: JSX.Element;
}

export const Label = (props: LabelProps) => {
  const { text, children } = props;
  return (
    <label className="form-label mb-2 block text-xs text-gray-700">
      {text}
      {children}
    </label>
  );
};
