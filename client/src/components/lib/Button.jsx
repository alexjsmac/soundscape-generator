import classNames from "classnames";

export const Button = ({ className, children, ...rest }) => {
  return (
    <button
      className={classNames(
        "flex items-center justify-center",
        "px-4 py-1",
        "bg-blue-600 hover:bg-blue-700",
        "text-blue-50",
        "font-semibold text-sm",
        "border border-gray-300 hover:border-gray-400",
        "rounded-md",
        "transition duration-150 ease-in-out",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
