import classNames from "classnames"
import React from "react"

type Option = {
  label: string
  value: any
}
type SelectButtonGroupProps = {
  options: Option[]
  onChange: (value: any) => void
  onFocus: () => void
  onBlur: () => void
  disabled: boolean
}
function SelectButtonGroup({
  options,
  className,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled,
}: SelectButtonGroupProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const handleChange = (value: any) => (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const checked = e.currentTarget.checked
    if (checked) {
      onFocus()
      onChange(value)
      onBlur()
    }
  }

  return (
    <div className={classNames("space-x-2", className)}>
      {options.map(option => {
        const isChecked = option.value === value

        return (
          <label
            key={option.value}
            className={classNames(
              "text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
              {
                "hover:bg-blue-700": !disabled,
                "bg-blue-500": !isChecked && !disabled,
                "bg-blue-600": isChecked && !disabled,
                "bg-gray-500": !isChecked && disabled,
                "bg-gray-600": isChecked && disabled,
              }
            )}
          >
            <input
              className="opacity-0 fixed w-0 h-0"
              type="radio"
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={handleChange(option.value)}
              disabled={disabled}
            />
            {option.label}
          </label>
        )
      })}
    </div>
  )
}

export default SelectButtonGroup
