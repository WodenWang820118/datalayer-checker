import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TopNav from '@/layout/top-nav/top-nav';
import { CheckCircle2, InfoIcon, PlayIcon, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import dayjs from 'dayjs';
import { projects } from '../constants';

function ProjectDetail() {
  const [showCreate, setShowCreate] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [isRunningMultipleTests, setIsRunningMultipleTests] = useState(false);

  const data = projects.find((project) => project.slug === id);

  if (!data) throw new Error('No project found with this id');

  return (
    <TopNav withSidebar>
      <div className="flex mb-4">
        <div>
          <div className="mb-3">
            <div className="font-medium">Tag Manager URL:</div>
            <div className="text-sm">{data.tagManagerUrl}</div>
          </div>
          <div className="mb-3">
            <div className="font-medium">GTM-ID: </div>
            <div className="text-sm">{data.gtmId}</div>
          </div>
          <div className="mb-3">
            <div className="font-medium">Container name: </div>
            <div className="text-sm">{data.containerName}</div>
          </div>
        </div>
        <div className="ml-auto">
          <Button
            variant="outline"
            disabled={isRunningMultipleTests}
            onClick={() => setShowCreate(true)}
          >
            Create new test
          </Button>
          {showCreate && (
            <CreateNewTestModal
              open={showCreate}
              onChangeOpen={setShowCreate}
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          )}
        </div>
      </div>
      <Tests
        data={data.tests}
        isRunningMultipleTests={isRunningMultipleTests}
        setIsRunningMultipleTests={setIsRunningMultipleTests}
      />
    </TopNav>
  );
}

export function CreateNewTestModal({
  onSubmit,
  open,
  onChangeOpen,
}: {
  onSubmit?: (props: { name: string; dlSpecs: string }) => void;
  open: boolean;
  onChangeOpen: (val: boolean) => void;
}) {
  const [name, setName] = useState('');
  const [dlSpecs, setDlSpecs] = useState('');
  const [chromeRecording, setChromeRecording] = useState('');

  const [errors, setErrors] = useState<{
    [key: string]: { type: 'required' | 'format' };
  }>({});

  return (
    <Dialog open={open} onOpenChange={onChangeOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new test</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
            facere labore, inventore illum voluptates, quod nisi atque id quia
            autem quos rem sint odio dicta reiciendis nulla quas tempora ipsam?
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            placeholder="Input test name"
          />
          <span className="text-red-500 text-sm">
            {errors.name?.type === 'required' && 'Test name is required'}
          </span>
        </div>
        <div>
          <Label htmlFor="dlSpecs ">dL Specs</Label>
          <Textarea
            id="dlSpecs "
            value={dlSpecs}
            onChange={({ target: { value } }) => {
              setDlSpecs(value);
            }}
            placeholder="Input dl specs"
          />
          <span className="text-red-500 text-sm">
            {errors.dlSpecs?.type === 'required' &&
              'data layer specs is required'}
            {errors.dlSpecs?.type === 'format' &&
              'data layer specs is not in correct json format'}
          </span>
        </div>
        <div>
          <Label htmlFor="chromeRecording">Chrome recording</Label>
          <Textarea
            id="chromeRecording"
            value={chromeRecording}
            onChange={({ target: { value } }) => {
              setChromeRecording(value);
            }}
            placeholder="Input chrome recording"
          />
          <span className="text-red-500 text-sm">
            {errors.chromeRecording?.type === 'required' &&
              'chrome recording is required'}
            {errors.chromeRecording?.type === 'format' &&
              'chrome recording is not in correct json format'}
          </span>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              const _errors: typeof errors = {};

              if (!name) {
                _errors['name'] = { type: 'required' };
              }
              if (!dlSpecs) {
                _errors['dlSpecs'] = { type: 'required' };
              } else {
                if (!isJsonString(dlSpecs)) {
                  _errors['dlSpecs'] = { type: 'format' };
                }
              }
              if (!chromeRecording) {
                _errors['chromeRecording'] = { type: 'required' };
              } else {
                if (!isJsonString(chromeRecording)) {
                  _errors['chromeRecording'] = { type: 'format' };
                }
              }

              if (Object.keys(_errors).length) {
                setErrors(_errors);
              } else {
                setErrors({});

                onSubmit?.({ name, dlSpecs });
                onChangeOpen(false);
              }
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function Tests({
  isRunningMultipleTests,
  setIsRunningMultipleTests,
  data,
}: {
  isRunningMultipleTests: boolean;
  setIsRunningMultipleTests: React.Dispatch<React.SetStateAction<boolean>>;
  data: (typeof projects)[number]['tests'];
}) {
  const params = useParams();
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {isRunningMultipleTests && <TableHead></TableHead>}
            <TableHead>Name</TableHead>
            <TableHead>dL Specs</TableHead>
            <TableHead>Chrome recording</TableHead>
            <TableHead>Last modification</TableHead>
            <TableHead>Run test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!data.length ? (
            <TableRow>
              <TableCell colSpan={4}>
                <div className="flex justify-center text-neutral-500">
                  No tests found for this project
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((test) => (
              <TableRow key={test.name}>
                {isRunningMultipleTests && (
                  <TableCell className="font-medium">
                    <Checkbox
                      checked={selectedTests.includes(test.name)}
                      onCheckedChange={(checked) => {
                        setSelectedTests((prev) =>
                          checked
                            ? [...prev, test.name]
                            : prev.filter((_prev) => _prev !== test.name)
                        );
                      }}
                      disabled={test.status !== 'idle'}
                    />
                  </TableCell>
                )}
                <TableCell className="font-medium">
                  <Link to={`/project/${params.id}/test/${test.name}`}>
                    <span className="underline">{test.name}</span>
                  </Link>
                </TableCell>
                <TableCell width={8}>
                  {test.dlSpecs && (
                    <span
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                      }}
                    >
                      {JSON.stringify(JSON.parse(test.dlSpecs), null, 4)}
                    </span>
                  )}
                </TableCell>
                <TableCell width={8}>
                  {test.dlSpecs && (
                    <span
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                      }}
                    >
                      {JSON.stringify(JSON.parse(test.dlSpecs), null, 4)}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {dayjs(test.updatedAt).format('DD/MM/YYYY H:mm a')}
                </TableCell>
                <TableCell className="cursor-pointer">
                  {test.status === 'pending' ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Information not completed</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : test.status === 'idle' ? (
                    <PlayIcon />
                  ) : test.status === 'success' ? (
                    <CheckCircle2 />
                  ) : (
                    <X />
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex  w-full mt-2">
        {isRunningMultipleTests && (
          <Button
            variant="ghost"
            onClick={() => {
              setIsRunningMultipleTests(false);
              setSelectedTests([]);
            }}
          >
            Cancel
          </Button>
        )}

        {!!data.length && (
          <div className="ml-auto">
            {!isRunningMultipleTests ? (
              <Button onClick={() => setIsRunningMultipleTests(true)}>
                Run multiple tests
              </Button>
            ) : (
              <Button onClick={() => setIsRunningMultipleTests(true)}>
                Run selected tests
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectDetail;
