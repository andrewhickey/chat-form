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
}
function SelectButtonGroup({
  options,
  className,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
}: SelectButtonGroupProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const handleFocus = () => {
    onFocus()
  }

  const handleBlur = () => {
    onBlur()
  }

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
    <div className={className}>
      {options.map(option => {
        const isChecked = option.value === value

        return (
          <label
            onFocus={onFocus}
            key={option.value}
            className={classNames(
              "hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
              {
                "bg-blue-500": !isChecked,
                "bg-blue-600": isChecked,
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
            />
            {option.label}
          </label>
        )
      })}
    </div>
  )
}

export default SelectButtonGroup
