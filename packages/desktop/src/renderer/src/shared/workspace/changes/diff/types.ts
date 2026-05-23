import type { PatchFile } from '@renderer/shared/workspace/changes/diff/parser';

export type DiffFileStatus = PatchFile['status'] | 'untracked';

export type DiffEntry = {
  file: PatchFile;
  key: string;
  language: string;
  status: DiffFileStatus;
};

export type DiffEntriesState = { kind: 'parsing' } | { entries: DiffEntry[]; kind: 'ready' };
