import { FC, forwardRef } from 'react';
import styles from './Calls.module.css';
import { ICall, ICallPriority, ICallType } from '@types';
import { ChevronDown } from 'lucide-react';
import { Select } from '@components/Select';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ICallProps {
  call: ICall;
  onResponsibleChange: (name: string) => void;
  onTypeChange: (type: ICallType) => void;
  onPriorityChange: (priority: ICallPriority) => void;
  onDateChange: (date: Date) => void;
}

export const Call: FC<ICallProps> = ({
  call,
  onResponsibleChange,
  onTypeChange,
  onPriorityChange,
  onDateChange,
}) => {
  const { date, responsible, type, priority } = call;

  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <div className={styles.timeBlock} onClick={onClick} ref={ref} >
      <div className={styles.time}>{format(date, "p", { locale: ru })}</div>
      <div className={styles.date}>{format(date, "dd MMM yyyy", { locale: ru })}</div>
    </div>
  ));

  return (
    <div className={styles.container}>
      <DatePicker
        selected={date}
        onChange={(v) => onDateChange(v ?? new Date())}
        showTimeSelect
        customInput={<DateInput />}
      />
      <input
        className={styles.input}
        value={responsible}
        onChange={(e) => onResponsibleChange(e.target.value)}
      />
      <div className={styles.selectWrapper}>
        <select
          // className={`${styles.select} ${row.direction === 'Входящий' ? styles.incoming : ''}`}
          className={styles.select}
          value={type}
          onChange={(e) => onTypeChange(e.target.value as ICallType)}
        >
          <option value="входящий">Исходящий</option>
          <option value="исходящий">Входящий</option>
        </select>
        <span className={styles.chevron}>
          <ChevronDown />
        </span>
      </div>
      <div className={styles.selectWrapper}>
        <select
          // className={`${styles.select} ${row.direction === 'Входящий' ? styles.incoming : ''}`}
          className={styles.select}
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value as ICallPriority)}
        >
          <option value="обычный">Обычный</option>
          <option value="срочный">Срочный</option>
        </select>
        <span className={styles.chevron}>
          <ChevronDown />
        </span>
      </div>
      <Select value={priority} options={['обычный', 'срочный']} onChange={onPriorityChange} />
    </div>
  );
};
