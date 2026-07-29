export type ProjectLink = {
    label: string;
    href: string;
};

export type Project = {
    title: string;
    description: string;
    link: string;
    links?: ProjectLink[];
    tags: string[];
    featured?: boolean;
    homeFeature?: boolean;
};

export const projects: Project[] = [
    {
        title: "Agentify",
        description:
            "An Ixigo open-source CLI that turns any Git repo into an AI-agent-ready workspace by indexing code, writing agent-facing context, validating repo state, and wrapping provider CLIs like Codex, Claude, Gemini, and OpenCode.",
        link: "https://github.com/ixigo/agentify",
        links: [
            {
                label: "GitHub",
                href: "https://github.com/ixigo/agentify",
            },
            {
                label: "Docs",
                href: "https://ixigo.github.io/agentify/",
            },
        ],
        tags: ["ixigo", "cli", "ai", "agents", "dx"],
        featured: true,
        homeFeature: true,
    },
    {
        title: "ai-agent-workflow",
        description:
            "An NPM tool that standardizes AI tool usage into a structured team of specialist agent personas and enforces a disciplined development workflow using engineered process prompts and rules.",
        link: "https://www.npmjs.com/package/ai-agent-workflow",
        tags: ["npm", "ai", "workflow", "agents", "dx"],
        featured: true,
    },
    {
        title: "react-analyzer",
        description:
            "An NPM tool to help onboard and understand the tech stack of any React ecosystem project by analyzing dependencies, tooling, and configurations.",
        link: "https://www.npmjs.com/package/@ranveersequeira/react-analyzer",
        tags: ["npm", "tooling", "react", "dx"],
    },
    {
        title: "vite-sane-cli",
        description:
            "A CLI tool to scaffold Vite projects with sane defaults, offering options like Tailwind CSS, Ant Design, MUI, and Redux Toolkit integration.",
        link: "https://www.npmjs.com/package/vite-sane-cli",
        tags: ["cli", "vite", "scaffold"],
    },
    {
        title: "MIRA",
        description: "Full-stack project management application built with Next.js, Prisma, PostgreSQL, and TypeScript.",
        link: "https://mira-my-jira.vercel.app/signin",
        tags: ["next.js", "prisma", "postgresql"],
    },
    {
        title: "CatWiki",
        description: "Transformed Open Source APIs to list data of cats all around the world. Offers all the required info about cats.",
        link: "https://github.com/ranveersequeira/catwiki",
        tags: ["api", "react", "cats"],
    },
    {
        title: "XFlix",
        description: "A video sharing platform which hosts videos for the world to watch also allows uploading new videos by using external video links.",
        link: "https://ranv-xflix.netlify.app/",
        tags: ["react", "video", "platform"],
    },
    {
        title: "QKart",
        description: "QKart is an E-commerce application offering a variety of products for customers to choose from.",
        link: "https://ranv-qkart.netlify.app/",
        tags: ["react", "e-commerce"],
    },
];

export const homeFeaturedProject = projects.find((project) => project.homeFeature);
