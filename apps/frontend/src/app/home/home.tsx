import TopNav from '@/layout/top-nav/top-nav';
import { CardWithForm } from './components/card';
import { projects } from '../../constants';
import { useQuery } from 'react-query';
import { getProjects } from '@/api/project';

export default function DashboardPage() {
  const query = useQuery('projects', () => getProjects());

  console.log(`projects:`, query.data);

  return (
    <TopNav containerClassName="grid grid-cols-4 gap-4">
      <CardWithForm isCreate />
      {projects.map((project) => (
        <CardWithForm
          key={project.slug}
          title={project.title}
          description={project.description}
          slug={project.slug}
        />
      ))}
    </TopNav>
  );
}
