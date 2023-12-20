import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TopNav from '@/layout/top-nav/top-nav';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Info, Terminal } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import dayjs from 'dayjs';
import { projects } from '../constants';

function TestDetail() {
  const { id, testName } = useParams<{ id: string; testName: string }>();

  const data = projects
    .find((project) => project.slug === id)
    ?.tests?.find((test) => test.name === testName);

  if (!data) throw new Error('No project found with this id');

  return (
    <TopNav withSidebar>
      {!data.dlSpecs && (
        <Alert variant="destructive" className="mb-3">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Some of information in this test detail is missing. Please complete
            before you run the test
          </AlertDescription>
        </Alert>
      )}
      <div className="flex items-center gap-2">
        <div className="text-3xl font-semibold">{data.name}</div>
        <Badge>{data.status}</Badge>
        <div className="ml-auto">
          <div className="font-medium">Last test: </div>
          {dayjs(data.updatedAt).format('DD/MM/YYYY H:mm a')}
        </div>
      </div>
      <div className=" mt-8 grow relative ">
        <div className="absolute inset-0 grid grid-cols-2 gap-4">
          <img
            src="/karsten-winegeart-GtEkuOZ9qdQ-unsplash.jpg"
            className="rounded-lg object-cover h-96 w-96"
            alt="test-detail"
          />
          <Detail data={data} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <Link to={`/project/${id}`}>
          <Button>Back</Button>
        </Link>
        <Button>Rerun test</Button>
      </div>
    </TopNav>
  );
}

export function Detail({
  data,
}: {
  data: (typeof projects)[number]['tests'][number];
}) {
  const [editDlObject, setEditDlObject] = useState(false);
  const [editTestRequest, setEditTestRequest] = useState(false);
  const [editChromeRecording, setEditChromeRecording] = useState(false);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="test-dl-object">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            Test data layer object <Info />
          </span>
        </AccordionTrigger>
        <AccordionContent>
          {data.dlSpecs && !editDlObject ? (
            <pre>{JSON.stringify(JSON.parse(data.dlSpecs), null, 4)}</pre>
          ) : (
            <div className="px-1 py-1">
              <Textarea
                rows={10}
                value={
                  data.dlSpecs
                    ? JSON.stringify(JSON.parse(data.dlSpecs), null, 4)
                    : ''
                }
                placeholder="Input dl specs"
              />
            </div>
          )}

          {data.dlSpecs && !editDlObject ? (
            <div
              className="mt-3 underline cursor-pointer"
              onClick={() => setEditDlObject(true)}
            >
              Edit
            </div>
          ) : (
            <Button
              variant="ghost"
              className="mt-1"
              onClick={() => setEditDlObject(false)}
            >
              Save
            </Button>
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="chrome-recording">
        <AccordionTrigger>Chrome recording</AccordionTrigger>
        <AccordionContent>
          {!editChromeRecording ? (
            <pre>
              {JSON.stringify(
                {
                  id: 10,
                  title: 'HP Pavilion 15-DK1056WM',
                  description: 'HP Pavilion 15-DK1056WM Gaming...',
                  price: 1099,
                  discountPercentage: 6.18,
                  rating: 4.43,
                  stock: 89,
                  brand: 'HP Pavilion',
                  category: 'laptops',
                  thumbnail:
                    'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
                  images: [
                    'https://i.dummyjson.com/data/products/10/1.jpg',
                    'https://i.dummyjson.com/data/products/10/2.jpg',
                    'https://i.dummyjson.com/data/products/10/3.jpg',
                    'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
                  ],
                },
                null,
                4
              )}
            </pre>
          ) : (
            <div className="p-1">
              <Textarea
                value={JSON.stringify(
                  {
                    id: 10,
                    title: 'HP Pavilion 15-DK1056WM',
                    description: 'HP Pavilion 15-DK1056WM Gaming...',
                    price: 1099,
                    discountPercentage: 6.18,
                    rating: 4.43,
                    stock: 89,
                    brand: 'HP Pavilion',
                    category: 'laptops',
                    thumbnail:
                      'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
                    images: [
                      'https://i.dummyjson.com/data/products/10/1.jpg',
                      'https://i.dummyjson.com/data/products/10/2.jpg',
                      'https://i.dummyjson.com/data/products/10/3.jpg',
                      'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
                    ],
                  },
                  null,
                  4
                )}
                rows={10}
              />
            </div>
          )}
          {!editChromeRecording ? (
            <div
              className="mt-3 underline cursor-pointer"
              onClick={() => setEditChromeRecording(true)}
            >
              Edit
            </div>
          ) : (
            <Button
              variant="ghost"
              className="mt-1"
              onClick={() => setEditChromeRecording(false)}
            >
              Save
            </Button>
          )}
        </AccordionContent>
      </AccordionItem>
      {data.result && (
        <AccordionItem value="test-result">
          <AccordionTrigger>Test result</AccordionTrigger>
          <AccordionContent>
            Download <span className="underline cursor-pointer">here</span>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}

export default TestDetail;
