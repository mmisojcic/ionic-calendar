export interface IWorkout<D, T, C> {
  startTime?: number;
  endTime?: number;
  reserved?: boolean;
  trainer?: T;
  client?: C;
  additionalData?: D;
}
