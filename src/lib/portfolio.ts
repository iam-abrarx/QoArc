export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  client?: string;
  problem?: string;
  solution?: string;
  flowDiagramUrl?: string;
  fullStory?: string;
  videoUrl?: string;
  extraImages?: string[];
  techStack?: string[];
}

export const initialProjects: PortfolioItem[] = [
  {
    id: '1',
    name: 'BANCAT.ORG.BD',
    description: 'A comprehensive digital platform for BANCAT, focusing on healthcare accessibility and community support.',
    url: 'https://BANCAT.ORG.BD',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=2670',
    client: 'BANCAT Foundation',
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL'],
    problem: 'The organization lacked a centralized digital hub for managing patient data and connecting with donors effectively.',
    solution: 'We built a high-performance web application with a secure donation portal and an intuitive patient management system.',
    fullStory: `BANCAT's mission required a design that was both compassionate and technically robust.

We focused on accessibility first, ensuring that warriors could find resources easily. The backend was architected to handle sensitive data with modern encryption standards, while the frontend provides a seamless experience for global donors.`
  },
  {
    id: '2',
    name: 'EcoEnergy Smart Systems',
    description: 'Next-generation energy monitoring dashboard for urban infrastructure.',
    url: 'https://ecoenergy.qoarc.com',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
    client: 'EcoCity Solutions',
    techStack: ['React', 'Python', 'TensorFlow', 'D3.js'],
    problem: 'Urban areas were experiencing unoptimized energy distribution leading to 30% wastage.',
    solution: 'Implementing a graph-based AI model that predicts peaks and reroutes power in real-time.',
    fullStory: `Our graph neural network (GNN) approach allowed us to model city power grids as dynamic systems.

By integrating weather sensors and historical usage data, the system now provides 98% accuracy in peak prediction, enabling substantial cost savings and carbon footprint reduction.`
  }
];
