const dlSpecs = JSON.stringify({
  id: 10,
  title: 'HP Pavilion 15-DK1056WM',
  description: 'HP Pavilion 15-DK1056WM Gaming...',
  price: 1099,
  discountPercentage: 6.18,
  rating: 4.43,
  stock: 89,
  brand: 'HP Pavilion',
  category: 'laptops',
  thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
  images: [
    'https://i.dummyjson.com/data/products/10/1.jpg',
    'https://i.dummyjson.com/data/products/10/2.jpg',
    'https://i.dummyjson.com/data/products/10/3.jpg',
    'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
  ],
});

export const projects = [
  {
    title: 'Project A',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, repellat?',
    slug: 'project-a',
    tagManagerUrl:
      'https://tagmanager.google.com/#/container/accounts/1309987100/containers/10578705/',
    gtmId: 'GTM-XXXXX1',
    containerName: 'Container A',
    type: 'dl-checker',
    tests: [
      {
        name: 'page_view',
        dlSpecs,
        updatedAt: new Date(),
        status: 'success',
        result: 'https://google.com',
      },
      {
        name: 'view_item',
        dlSpecs,
        updatedAt: new Date(),
        status: 'idle',
        result: null,
      },
      {
        name: 'view_promotion',
        updatedAt: new Date(),
        status: 'pending',
        result: null,
      },
      {
        name: 'view_item_list',
        updatedAt: new Date(),
        status: 'pending',
        result: null,
      },
    ],
  },
  {
    title: 'Project B',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, repellat?',
    slug: 'project-b',
    tagManagerUrl:
      'https://tagmanager.google.com/#/container/accounts/1309987100/containers/10578705/',
    gtmId: 'GTM-XXXXX2',
    containerName: 'Container B',
    type: 'dl-checker',
    tests: [],
  },
  {
    title: 'Project C',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, repellat?',
    slug: 'project-c',
    tagManagerUrl:
      'https://tagmanager.google.com/#/container/accounts/1309987100/containers/10578705/',
    gtmId: 'GTM-XXXXX3',
    containerName: 'Container C',
    type: 'dl-checker',
    tests: [],
  },
  {
    title: 'Project D',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, repellat?',
    slug: 'project-d',
    tagManagerUrl:
      'https://tagmanager.google.com/#/container/accounts/1309987100/containers/10578705/',
    gtmId: 'GTM-XXXXX4',
    containerName: 'Container D',
    type: 'dl-checker',
    tests: [],
  },
  {
    title: 'Project E',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, repellat?',
    slug: 'project-e',
    tagManagerUrl:
      'https://tagmanager.google.com/#/container/accounts/1309987100/containers/10578705/',
    gtmId: 'GTM-XXXXX5',
    containerName: 'Container E',
    type: 'dl-checker',
    tests: [],
  },
];
