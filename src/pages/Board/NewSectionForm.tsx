import { useState } from "react";

export const NewSectionForm = (props: {
  onSubmit: (sectionHeading: any) => Promise<unknown> | undefined;
}) => {
  const { onSubmit } = props;
  const [sectionInput, setSectionInput] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(sectionInput);
        setSectionInput("");
      }}
      className="mx-2 my-2"
    >
      +
      <input
        className="ml-2 bg-transparent"
        placeholder="Add section"
        value={sectionInput}
        onChange={(e) => {
          setSectionInput(e.target.value);
        }}
      />
    </form>
  );
};
