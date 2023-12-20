import { initProject } from '@/api/project';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import TopNav from '@/layout/top-nav/top-nav';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { projects } from '../constants';

function NewProject() {
  const mutation = useMutation(initProject, {
    onError: () => {
      toast.error('Something went wrong when initiating project');
    },
  });

  const navigate = useNavigate();
  const [form, setForm] = useState<
    Omit<NonNullable<(typeof projects)[number]>, 'tests'> & {
      file: string | File | null;
    }
  >({
    type: '',
    title: '',
    description: '',
    slug: '',
    tagManagerUrl: '',
    containerName: '',
    gtmId: '',
    file: null,
  });

  return (
    <TopNav>
      <div className="mb-4">
        <Label htmlFor="projectName">Project name</Label>
        <Input
          type="text"
          id="projectName"
          placeholder="Project name"
          value={form.title}
          onChange={({ target: { value } }) =>
            setForm((prev) => ({ ...prev, title: value }))
          }
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="projectDescription">Project description</Label>
        <Textarea
          id="projectDescription"
          placeholder="Project description"
          value={form.description}
          onChange={({ target: { value } }) =>
            setForm((prev) => ({ ...prev, description: value }))
          }
          rows={5}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="projectSlug">Project slug</Label>
        <Input
          type="text"
          id="projectSlug"
          placeholder="Project slug"
          value={form.slug}
          onChange={({ target: { value } }) =>
            setForm((prev) => ({ ...prev, slug: value }))
          }
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="projectName">Test type</Label>
        <Select
          value={form.type}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, type: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a test type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="dl-checker">Data layer checker</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {form.type === 'dl-checker' && (
        <div className="my-4">
          <div className="flex gap-3 mb-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="spreadsheetFile">Upload your file here</Label>
              <Input
                id="spreadsheetFile"
                type="file"
                onChange={({ target: { files } }) => {
                  if (files?.length) {
                    setForm((prev) => ({ ...prev, file: files[0] }));
                  }
                }}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="spreadsheetUrl">
                or google spreadsheet link below:
              </Label>
              <Input
                type="spreadsheetUrl"
                id="spreadsheetUrl"
                placeholder="Spreadsheet url"
                value={typeof form.file === 'string' ? form.file : ''}
                onChange={({ target: { value } }) =>
                  setForm((prev) => ({ ...prev, file: value }))
                }
              />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="tagManagerUrl">Tag manager URL</Label>
            <Input
              type="tagManagerUrl"
              id="tagManagerUrl"
              placeholder="Tag manager url"
              value={form.tagManagerUrl}
              onChange={({ target: { value } }) =>
                setForm((prev) => ({ ...prev, tagManagerUrl: value }))
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="gtmId">GTM ID</Label>
            <Input
              type="gtmId"
              id="gtmId"
              placeholder="GTM ID"
              value={form.gtmId}
              onChange={({ target: { value } }) =>
                setForm((prev) => ({ ...prev, gtmId: value }))
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="containerName">Container name</Label>
            <Input
              type="containerName"
              id="containerName"
              placeholder="Container name"
              value={form.containerName}
              onChange={({ target: { value } }) =>
                setForm((prev) => ({ ...prev, containerName: value }))
              }
            />
          </div>
        </div>
      )}
      <div className="flex">
        <Link to={'/'}>
          <Button variant={'ghost'}>Cancel</Button>
        </Link>
        <div className="ml-auto">
          <Button
            className="mr-3"
            onClick={() => {
              mutation.mutate(
                { projectName: form.title },
                {
                  onSuccess: () => {
                    navigate(`/`);
                  },
                }
              );
            }}
          >
            Create
          </Button>
          <Button
            onClick={() => {
              mutation.mutate(
                { projectName: form.title },
                {
                  onSuccess: () => {
                    navigate(`/project/${form.slug}`);
                  },
                }
              );
            }}
          >
            Create and test
          </Button>
        </div>
      </div>
    </TopNav>
  );
}

export default NewProject;
