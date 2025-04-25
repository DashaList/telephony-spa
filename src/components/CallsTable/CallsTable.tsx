import { FC, useState } from 'react';
import styles from './CallsTable.module.css';
import { Call } from '@components/Call';
import fetchedCalls from 'calls.json';
import { ICall, ICallPriority, ICallType } from '@types';
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'date-fns';

const mapCall = (call: {
  date: string;
  time: string;
  responsible: string;
  type: string;
  priority: string;
}): ICall => ({
  responsible: call.responsible,
  id: uuidv4(),
  date: parse(call.date + ' ' + call.time + ':00', 'yyyy-MM-dd HH:mm:ss', new Date()),
  type: call.type as ICallType,
  priority: call.priority as ICallPriority,
});

export const CallsTable: FC = () => {
  const [calls, setCalls] = useState<ICall[]>(() => fetchedCalls.map(mapCall));

  const addCall = () => {
    const newCall = {
      id: uuidv4(),
      date: new Date(),
      responsible: '',
      type: 'входящий' as ICallType,
      priority: 'обычный' as ICallPriority,
    };
    setCalls((prev) => [newCall].concat(prev));
  };

  const handleChangeResponsible = (id: string) => (responsible: string) => {
    setCalls((prev) => prev.map((call) => (call.id === id ? { ...call, responsible } : call)));
  };

  const handleChangeType = (id: string) => (type: ICallType) => {
    setCalls((prev) => prev.map((call) => (call.id === id ? { ...call, type } : call)));
  };

  const handleChangePriority = (id: string) => (priority: ICallPriority) => {
    setCalls((prev) => prev.map((call) => (call.id === id ? { ...call, priority } : call)));
  };

  const handleChangeDate = (id: string) => (date: Date) => {
    setCalls((prev) => prev.map((call) => (call.id === id ? { ...call, date } : call)));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>Дата и время</span>
        <span>Ответственные</span>
        <span>Тип звонка</span>
        <span>Важность</span>
      </div>

      <div className={styles.table}>
        <button className={styles.addButton} onClick={addCall}>
          <span className={styles.plus}>+</span> Добавить событие
        </button>

        {calls.map((call) => (
          <Call
            key={call.id}
            call={call}
            onResponsibleChange={handleChangeResponsible(call.id)}
            onTypeChange={handleChangeType(call.id)}
            onPriorityChange={handleChangePriority(call.id)}
            onDateChange={handleChangeDate(call.id)}
          />
        ))}
      </div>
    </div>
  );
};
