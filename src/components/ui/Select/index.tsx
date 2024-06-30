import styles from "./Select.module.scss";

type Option = {
  label: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
};

type Proptypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[] | any;
  className?: string;
  value?: string | null;
  onChange?: (e: any) => void;
};
const Select = (props: Proptypes) => {
  const {
    label,
    name,
    defaultValue,
    disabled,
    options,
    className,
    value,
    onChange,
  } = props;
  return (
    <div className={`${styles.select} ${className}`}>
      <label htmlFor={name} className={styles.select__label}>
        {label}
      </label>
      <div className={styles.select__container}>
        <select
          name={name}
          id={name}
          // value={value || ""}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`${styles.select__container__input} ${className}`}
          onChange={onChange}
        >
          {options?.map((option: Option) => (
            <option
              value={option.value}
              key={option.label}
              selected={option.selected}
              disabled={option.disabled}
              className={styles.select__container__input__option}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
