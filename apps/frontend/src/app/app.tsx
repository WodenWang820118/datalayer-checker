import { setRootProjectFolder } from '@/api/project';
import { ThemeProvider } from '@/components/theme-provider';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import Home from './home/home';
import Project from './project';
import TestDetail from './test-detail';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <_App />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function _App() {
  const mutation = useMutation(setRootProjectFolder, {
    onSuccess: (data) => {
      console.log(`success setting root project folder`, data);
    },
    onError: console.error,
  });

  useEffect(() => {
    mutation.mutate({
      rootProjectPath: '/Users/brandonpardede/dl-checker-directory',
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id/test/:testName" element={<TestDetail />} />
      <Route path="/project/:id" element={<Project />} />
    </Routes>
  );
}

export default App;
