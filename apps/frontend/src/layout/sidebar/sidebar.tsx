import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/combobox';
import { ReactNode } from 'react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  projectTypes: { label: string; value: string; icon: ReactNode }[];
}

export function Sidebar({ className, projectTypes }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-2">
            <Combobox />
          </div>
          <div className="space-y-1">
            {projectTypes.map((project) => (
              <Button
                variant="secondary"
                className="w-full justify-start"
                key={project.value}
              >
                {project.icon}
                {project.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
