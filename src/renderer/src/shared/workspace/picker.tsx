import { useWorkspace } from '@renderer/shared/workspace/info';
import { WorkspaceMenu } from '@renderer/shared/workspace/menu';
import { useWorkspaceFolders } from '@renderer/shared/workspace/folders';
import { ChevronDownIcon } from '@renderer/ui/icons';
import { AppMenu } from '@renderer/ui/menu';
import { cn } from '@renderer/utils/cn';
import { useCallback, useRef, useState } from 'preact/hooks';

export const Workspace = ({
  workspacePath,
  onChooseDirectory,
  onSelectWorkspace
}: {
  onChooseDirectory: () => void;
  onSelectWorkspace: (path: string) => void;
  workspacePath: string | undefined;
}) => {
  const workspace = useWorkspace(workspacePath);
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { folders, refreshFolders } = useWorkspaceFolders({ workspacePath });

  const updateOpen = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (nextOpen) refreshFolders();
    },
    [refreshFolders]
  );

  if (!workspace) return null;

  return (
    <div ref={rootRef} class="flex h-11.5 min-w-48 max-w-64 items-center gap-px text-soft select-none">
      <span class="flex h-full min-w-0 flex-1 items-center gap-2 rounded-[23px_3px_3px_23px] bg-composer py-1.5 pr-3 pl-1.5 shadow-shell">
        <span class="grid size-8 flex-none place-items-center overflow-hidden rounded-full bg-white">
          <img src={workspace.iconDataUrl} alt="" class="size-full rounded-full object-cover" draggable={false} />
        </span>
        <span class="flex min-w-0 max-w-40 flex-col justify-center gap-0.5">
          <span class="truncate text-sm leading-4 font-medium text-ink">{workspace.folderName}</span>
          <span class="truncate text-[11px] leading-3 font-medium text-soft">
            {workspace.branchName ?? workspace.path}
          </span>
        </span>
      </span>
      <AppMenu.Root open={open} onOpenChange={updateOpen}>
        <AppMenu.Trigger
          aria-label="Workspace folders"
          className="grid size-11.5 flex-none place-items-center rounded-[3px_23px_23px_3px] border-0 bg-composer text-ink shadow-shell outline-0 transition-colors hover:bg-control focus-visible:bg-control"
        >
          <ChevronDownIcon
            class={cn('-ml-px size-4 transition-transform duration-150 ease-out', open && 'rotate-180')}
          />
        </AppMenu.Trigger>
        <AppMenu.Portal>
          <AppMenu.Positioner
            anchor={rootRef}
            side="top"
            align="start"
            sideOffset={8}
            className="z-50"
            collisionPadding={12}
          >
            <WorkspaceMenu
              folders={folders}
              panelWidth="workspace"
              workspacePath={workspacePath}
              onChooseDirectory={onChooseDirectory}
              onSelectWorkspace={onSelectWorkspace}
            />
          </AppMenu.Positioner>
        </AppMenu.Portal>
      </AppMenu.Root>
    </div>
  );
};
