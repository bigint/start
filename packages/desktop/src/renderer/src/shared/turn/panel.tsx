import { ActivityItems } from '@renderer/shared/turn/items';
import type { TurnDetail } from '@renderer/utils/types';

type ActivityPanelProps = {
  details: TurnDetail[];
  thinking: string;
};

export const ActivityPanel = ({ details, thinking }: ActivityPanelProps) => {
  return (
    <div class="min-h-full outline-0">
      <div class="p-4">
        <ActivityItems details={details} thinking={thinking} />
      </div>
    </div>
  );
};
