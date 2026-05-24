import { Attached } from '@renderer/shared/composer/attached';
import { tw } from '@renderer/utils/tw';
import { useEffect, useRef } from 'preact/hooks';

interface CommandFinderItem {
  description?: string;
  name: string;
  type: 'command';
}

interface FileFinderItem {
  description?: string;
  name: string;
  path: string;
  type: 'directory' | 'file';
}

export type FinderItem = CommandFinderItem | FileFinderItem;

interface FinderProps {
  items: FinderItem[];
  visible: boolean;
  activeKey: string | undefined;
  ariaLabel: string;
  emptyLabel: string;
  onSelect: (item: FinderItem) => void;
}

export const finderItemKey = (item: FinderItem) => (item.type === 'command' ? item.name : item.path);

export const finderItemId = (key: string) => `finder-${encodeURIComponent(key)}`;

export const Finder = ({ activeKey, ariaLabel, emptyLabel, items, onSelect, visible }: FinderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeOptionId = activeKey ? finderItemId(activeKey) : '';

  useEffect(() => {
    if (!activeKey) return;

    scrollRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [activeKey]);

  if (!visible) return null;

  return (
    <Attached>
      <div
        {...(activeOptionId ? { 'aria-activedescendant': activeOptionId } : {})}
        ref={scrollRef}
        aria-label={ariaLabel}
        id="composer-finder"
        role="listbox"
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
        class="flex max-h-52 flex-col gap-1 overflow-y-auto pb-2 [&::-webkit-scrollbar]:hidden"
      >
        {items.length > 0 ? (
          items.map((item) => {
            const key = finderItemKey(item);
            const selected = key === activeKey;
            const label = item.type === 'directory' ? `${item.name}/` : item.name;

            return (
              <button
                key={key}
                id={finderItemId(key)}
                role="option"
                tabIndex={-1}
                type="button"
                aria-selected={selected}
                onPointerDown={(event) => {
                  event.preventDefault();
                  onSelect(item);
                }}
                class={tw(
                  'flex w-full min-w-0 rounded-xl border-0 px-3 py-2 text-left text-sm leading-5 font-medium text-ink outline-0 transition-colors select-none hover:bg-control focus-visible:bg-control',
                  item.type === 'command' ? 'flex-col items-start gap-0.5' : 'items-center gap-3',
                  selected && 'bg-control',
                  !selected && 'bg-transparent'
                )}
              >
                <span class="min-w-0 flex-1 truncate">{label}</span>
                {item.description && (
                  <span
                    class={tw(
                      'min-w-0 truncate text-xs leading-5 font-medium text-soft',
                      item.type === 'command' ? 'max-w-full' : 'max-w-[68%] flex-none text-right'
                    )}
                  >
                    {item.type === 'command' ? item.description : `[${item.description}]`}
                  </span>
                )}
              </button>
            );
          })
        ) : (
          <div class="px-3 py-5 text-center text-sm text-soft">{emptyLabel}</div>
        )}
      </div>
    </Attached>
  );
};
