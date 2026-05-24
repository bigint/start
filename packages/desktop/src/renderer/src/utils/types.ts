import type { HistoryTurnDetail } from '@preload/index';

export type TurnDetail = HistoryTurnDetail;

export type TurnActivityItem =
  | { id: string; type: 'thinking'; text: string; createdAt: number; updatedAt: number }
  | { id: string; type: 'detail'; detail: TurnDetail };

export type Turn = {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'event' | 'terminal';
  text: string;
  activity?: string;
  activityItems?: TurnActivityItem[];
  details?: TurnDetail[];
  thinking?: string;
  streaming?: boolean;
  createdAt: number;
};
