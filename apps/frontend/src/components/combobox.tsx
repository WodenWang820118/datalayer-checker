'use client';

import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link, useParams } from 'react-router-dom';
import { projects } from '@/constants/index';

export function Combobox() {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {id
            ? projects.find((framework) => framework.slug === id)?.title
            : 'Select project...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search projects..." className="h-9" />
          <CommandEmpty>No projects found.</CommandEmpty>
          <CommandGroup>
            {projects.map((project) => (
              <Link to={`/project/${project.slug}`} key={project.slug}>
                <CommandItem
                  key={project.slug}
                  onSelect={() => {
                    setOpen(false);
                  }}
                >
                  {project.title}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      id === project.slug ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
