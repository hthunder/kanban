import React from "react";
import { Button } from "../../components/Button";

interface FormProps {
  heading: string;
  submitText: string;
  children: Array<JSX.Element> | JSX.Element;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = (props: FormProps) => {
  const { heading, submitText, children, onSubmit } = props;

  return (
    <div className="flex justify-center pt-20">
      <form
        className=" w-96 flex-initial rounded-lg bg-white p-6 py-7 px-14 shadow-lg"
        onSubmit={onSubmit}
      >
        <h1 className="mb-4 text-center text-3xl">{heading}</h1>
        {children}
        <Button text={submitText} fullWidth={true} />
      </form>
    </div>
  );
};
