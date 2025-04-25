export type ICallType = 'входящий' | 'исходящий';
export type ICallPriority = 'обычный' | 'срочный';

export interface ICall {
  id: string;
  date: Date;
 // time: Date;
  responsible: string;
  type: ICallType;
  priority: ICallPriority;
}
