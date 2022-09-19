import { useState } from "react";

export const Dropdown = (props: { children: JSX.Element | JSX.Element[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded border text-center">
      <span
        className="inline-block w-full select-none align-middle"
        onClick={() => {
          setIsOpen((prevIsOpen) => !prevIsOpen);
        }}
      >
        &#183;&#183;&#183;
      </span>
      {isOpen && (
        <ul className="absolute top-6 left-1 z-10 rounded border bg-white">
          {props.children}
        </ul>
      )}
    </div>
  );
};

Dropdown.Item = (props: {
  children: JSX.Element | string;
  onClick: React.MouseEventHandler<HTMLElement>;
}) => {
  return (
    <li
      className="flex min-w-[188px] items-center py-1 px-4 text-left hover:bg-slate-200"
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
};
