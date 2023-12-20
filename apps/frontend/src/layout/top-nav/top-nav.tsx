import { ModeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { Sidebar } from '../sidebar/sidebar';
import { MainNav } from './components/main-nav';

type Props = {
  children?: React.ReactNode;
  containerClassName?: string;
  withSidebar?: boolean;
};

function TopNav({ children, containerClassName, withSidebar }: Props) {
  return (
    <div className="h-screen flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4 mr-4">
            {/* <Search /> */}
          </div>
          <ModeToggle />
        </div>
      </div>
      <div
        className={cn(
          'grow ',
          !withSidebar && 'container my-8',
          containerClassName
        )}
      >
        {withSidebar ? (
          <div className="h-full grid lg:grid-cols-5">
            <Sidebar
              projectTypes={[
                {
                  label: 'Data layer checker',
                  value: 'dl-checker',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                  ),
                },
              ]}
            />
            <div className="col-span-3 lg:col-span-4 lg:border-l flex flex-col container py-4">
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default TopNav;
