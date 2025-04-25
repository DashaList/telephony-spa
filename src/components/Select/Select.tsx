import { JSX } from 'react';
import styles from './Select.module.css';

interface ISelectProps<V extends string> {
  value: V;
  options: V[];
  onChange: (value: V) => void;
}

export function Select<V extends string>({
  value,
  options,
  onChange,
}: ISelectProps<V>): JSX.Element {
  return (
    <div className={styles.select}>
      <select
        // className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value as V)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {/* {option.charAt(0).toUpperCase() + option.slice(1)} */}
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
