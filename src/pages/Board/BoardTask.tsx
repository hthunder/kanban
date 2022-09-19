import { Dropdown } from "./Dropdown";

export const BoardTask = (props: {
  task: {
    text: string;
    id: string;
    completed: boolean;
  };
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isOptionsButtonShown?: boolean;
  dropdownItems?: {
    onClickHandler: React.MouseEventHandler<HTMLElement>;
    img: string;
    text: string;
  }[];
}) => {
  const {
    task,
    onMouseEnter,
    onMouseLeave,
    onChange,
    isOptionsButtonShown,
    dropdownItems,
  } = props;

  return (
    <li
      key={task.id}
      className="relative my-2 min-h-[72px] rounded-lg border px-2 py-2 hover:cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        type="checkbox"
        className="mr-2"
        checked={task.completed}
        onChange={onChange}
      />
      <span>{task.text}</span>
      {isOptionsButtonShown && dropdownItems && (
        <Dropdown>
          {dropdownItems.map(({ onClickHandler, img, text }) => {
            return (
              <Dropdown.Item onClick={onClickHandler}>
                <>
                  <img
                    width={18}
                    height={18}
                    src={img}
                    alt={"Иконка"}
                    className="mr-2 inline-block"
                  />
                  <span>{text}</span>
                </>
              </Dropdown.Item>
            );
          })}
        </Dropdown>
      )}
    </li>
  );
};
