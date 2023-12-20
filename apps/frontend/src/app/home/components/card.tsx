import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

type Props =
  | {
      slug: string;
      description: string;
      title: string;
    }
  | {
      isCreate: true;
    };

export function CardWithForm(props: Props) {
  return (
    <Link to={`/project/${'isCreate' in props ? 'new' : props.slug}`}>
      <Card className="cursor-pointer hover:border-black transition-colors h-full">
        <CardHeader>
          <CardTitle>
            {'isCreate' in props ? 'Create project' : props.title}
          </CardTitle>
          <CardDescription>
            {'isCreate' in props
              ? 'Deploy your new project in one-click.'
              : props.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
