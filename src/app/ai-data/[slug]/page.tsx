import React from 'react';
import DynamicNodeTemplate from '@/components/DynamicNodeTemplate';
import { notFound } from 'next/navigation';

const contentMap: Record<string, any> = {
  'machine-learning-development': {
    title: 'ML Development',
    category: 'AI & Data // Intelligence',
    desc: 'Engineering deterministic predictive models and proprietary algorithms designed for real-world operational scale.',
    techStack: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'GPU clusters', 'Jupyter'],
    visual: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Precision', value: '98.4% Avg.' },
      { label: 'Topology', value: 'Custom Neural' },
      { label: 'Sovereignty', value: 'Proprietary' }
    ],
    features: [
      { title: 'Algorithm Synthesis', desc: 'Custom neural architectures for niche industrial logic.', icon: 'Cpu' },
      { title: 'Model Training', desc: 'Distributed compute at scale with optimized loss paths.', icon: 'Zap' },
      { title: 'Dataset Curation', desc: 'Hardened data sanitization and labeling pipelines.', icon: 'Database' },
      { title: 'Inference Nodes', desc: 'High-speed model deployment for real-time decisions.', icon: 'Sparkles' }
    ]
  },
  'mlops-consulting': {
    title: 'MLOps Consulting',
    category: 'AI & Data // Infrastructure',
    desc: 'Hardening the bridge between research models and production-grade AI infrastructure through automated CI/CD for ML.',
    techStack: ['Kubeflow', 'MLflow', 'DVC', 'Docker', 'Jenkins'],
    visual: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'CI/CD', value: 'ML Native' },
      { label: 'Drift', value: 'Auto-Detect' },
      { label: 'Deployment', value: 'Zero-Downtime' }
    ],
    features: [
      { title: 'Automated Retraining', desc: 'Continuous learning loops based on live telemetry.', icon: 'Zap' },
      { title: 'Model Versioning', desc: 'Immutable tracking of weights, data, and metadata.', icon: 'Layers' },
      { title: 'Scalable Inference', desc: 'Auto-scaling model endpoints for variable loads.', icon: 'Cpu' },
      { title: 'Drift Detection', desc: 'Real-time monitoring for model performance decay.', icon: 'Search' }
    ]
  },
  'computer-vision': {
    title: 'Computer Vision',
    category: 'AI & Data // Perception',
    desc: 'Building sovereign visual intelligence nodes for real-time object detection, segmentation, and industrial visual QA.',
    techStack: ['OpenCV', 'YOLOv8', 'MediaPipe', 'Cuda', 'Jetson Nano'],
    visual: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Latency', value: '< 15ms' },
      { label: 'Tracking', value: 'Multi-Object' },
      { label: 'Inference', value: 'Edge Native' }
    ],
    features: [
      { title: 'Real-time Detection', desc: 'Sub-10ms object identification in live video streams.', icon: 'Eye' },
      { title: 'Segmentation Layer', desc: 'Hyper-precise visual masks for medical or R&D data.', icon: 'Layers' },
      { title: 'Spectral Analysis', desc: 'Moving beyond RGB for industrial hyperspectral QA.', icon: 'Sparkles' },
      { title: 'Edge Deployment', desc: 'Localized visual intelligence on low-power hardware.', icon: 'Cpu' }
    ]
  },
  'natural-language-processing': {
    title: 'NLP',
    category: 'AI & Data // Language',
    desc: 'Architecting LLM orchestration layers and custom transformer nodes for enterprise-grade text analysis and semantic search.',
    techStack: ['HuggingFace', 'LangChain', 'OpenAI', 'Pinecone', 'LlamaIndex'],
    visual: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'LLM', value: 'Proprietary RAG' },
      { label: 'Context', value: 'Million+ Tokens' },
      { label: 'Search', value: 'Vector-Native' }
    ],
    features: [
      { title: 'Semantic Search', desc: 'Vector-based retrieval for sub-second knowledge access.', icon: 'Search' },
      { title: 'LLM Orchestration', desc: 'Multi-agent chains for complex reasoning tasks.', icon: 'MessageSquare' },
      { title: 'Fine-Tuning', desc: 'Adapting baseline models to proprietary domain data.', icon: 'Zap' },
      { title: 'Sentiment Graphing', desc: 'Quantifying emotional telemetry in longitudinal data.', icon: 'BarChart' }
    ]
  },
  'business-intelligence': {
    title: 'Business Intelligence',
    category: 'AI & Data // Analytics',
    desc: 'Translating fragmented data signals into coherent decision frameworks through high-fidelity visualization and real-time dash.',
    techStack: ['Tableau', 'PowerBI', 'GraphQL', 'ClickHouse', 'Superset'],
    visual: 'https://images.unsplash.com/photo-1551288049-bbbda5366991?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1551288049-bbda6462f741?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Data Hub', value: 'Live ETL' },
      { label: 'Predictive', value: 'BI-Integrated' },
      { label: 'Insight', value: 'Real-time Delta' }
    ],
    features: [
      { title: 'Real-time Dash', desc: 'Low-latency visualization of global operational data.', icon: 'BarChart' },
      { title: 'Anomaly Discovery', desc: 'Algorithmic highlighting of architectural red flags.', icon: 'Search' },
      { title: 'Stakeholder View', desc: 'Custom role-based views for C-suite or Devs.', icon: 'Users' },
      { title: 'Export Engine', desc: 'Deterministic automated reporting and CSV pipelines.', icon: 'Terminal' }
    ]
  },
  'predictive-analytics': {
    title: 'Predictive Analytics',
    category: 'AI & Data // Forecasting',
    desc: 'Engineering time-series forecasting nodes that anticipate market movements, hardware failures, and user churn before they occur.',
    techStack: ['Prophet', 'XGBoost', 'StatModels', 'BigQuery', 'Apache Flink'],
    visual: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Forecasting', value: 'Multi-Scenario' },
      { label: 'Risk', value: 'Algorithmic' },
      { label: 'Signals', value: 'Proprietary' }
    ],
    features: [
      { title: 'Churn Prediction', desc: 'Identifying user signal patterns that lead to drop-off.', icon: 'Activity' },
      { title: 'Failure Forensics', desc: 'Anticipating hardware or system failures in R&D.', icon: 'Cpu' },
      { title: 'Market Modelling', desc: 'Simulating future economic scenarios for GTM.', icon: 'Globe' },
      { title: 'Risk Scoring', desc: 'Quantifying operational danger in real-time streams.', icon: 'ShieldCheck' }
    ]
  },
  'rpa-development': {
    title: 'RPA Development',
    category: 'AI & Data // Automation',
    desc: 'Deterministic bot orchestration layers that automate repetitive legacy processes at industrial scale.',
    techStack: ['UiPath', 'BluePrism', 'Python', 'Selenium', 'AutoGUI'],
    visual: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Efficiency', value: '+75% Delta' },
      { label: 'Reliability', value: 'Zero-Error Bot' },
      { label: 'Integrity', value: 'Full Audit' }
    ],
    features: [
      { title: 'Legacy Scraping', desc: 'Extracting data from systems without modern APIs.', icon: 'Search' },
      { title: 'Task Orchestration', desc: 'Scheduling and managing fleets of software bots.', icon: 'Layers' },
      { title: 'Logic Automation', desc: 'Converting human rule-sets into code-level bots.', icon: 'Terminal' },
      { title: 'Audit Logging', desc: '100% record of every bot-driven system action.', icon: 'Database' }
    ]
  },
  'intelligent-process-automation': {
    title: 'IPA',
    category: 'AI & Data // Autonomous',
    desc: 'Moving beyond simple RPA to self-correcting, AI-driven automation that handles unstructured data and complex edge cases.',
    techStack: ['AI Agents', 'GPT-4o', 'Python', 'API Mesh', 'AutoGPT'],
    visual: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Intelligence', value: 'Self-Correcting' },
      { label: 'Autonomy', value: 'Level 4 IPA' },
      { label: 'Maturity', value: 'Agentic Core' }
    ],
    features: [
      { title: 'Self-Correction', desc: 'Autonomous bots that learn from and fix their own errors.', icon: 'Sparkles' },
      { title: 'Unstructured Data', desc: 'Processing images, voice, and hand-written PDF inputs.', icon: 'Layers' },
      { title: 'Agent Swarms', desc: 'Coordinated groups of AI bots solving large tasks.', icon: 'Bot' },
      { title: 'Dynamic Routing', desc: 'Intelligently passing tasks between AI and Human.', icon: 'Globe' }
    ]
  }
};

export default async function AIDataPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = contentMap[slug];
  
  if (!content) {
    notFound();
  }

  return <DynamicNodeTemplate content={content} />;
}

export async function generateStaticParams() {
  return Object.keys(contentMap).map((slug) => ({ slug }));
}
