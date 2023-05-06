import React from "react";
import styles from "../../styles/MainInput.module.scss";

const MainInput = React.forwardRef(
  (
    {
      label,
      type = "text",
      name,
      value,
      onChange,
      onFocus,
      onBlur,
      required = false,
      minLength,
      maxLength,
      pattern,
      placeholder,
      disabled = false,
      autoComplete,
      className,
      ...otherProps
    },
    ref
  ) => {
    return (
      <div className={`${styles.inputWrapper} ${className ? className : ""}`}>
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={[styles.input, className ? className : ""].join(" ")}
          {...otherProps}
        />
      </div>
    );
  }
);

export default MainInput;
