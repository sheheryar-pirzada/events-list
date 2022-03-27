export type Event {
  name: string,
  description?: string,
  date: Date,
  startTime: Date,
  endTime: Date,
  type: 'Event' | 'Out of office' | 'Task',
  key: string,
}

export type DatePickerContext {
  open: boolean;
  type: 'date' | 'datetime' | 'time';
  form: string;
}

export type RootStackParamList = {
  'Main': undefined;
  'Create Event': { eventToEdit?: Event};
};

export type BottomTabsParamsList = {
  'Events': undefined;
  'Calendar': undefined;
};
