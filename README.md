This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This repo contains a simple **Task Management Dashboard** built with Next.js (App Router), TypeScript, Tailwind CSS and shadcn/ui. It demonstrates:

- mock authentication (login flag in `localStorage`)
- task CRUD (create/edit/delete/change status) with modal forms
- filter, sort and search
- **dark mode** toggle stored in `localStorage`
- a tiny server component (`Header`) alongside client components
- basic unit tests for task utilities using Jest

To run the app locally, install dependencies then start the dev server:

```bash
npm install
npm run dev
# or substitute yarn/pnpm if you prefer
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the login page. Any username works; once logged in you'll be taken to the dashboard.

The dashboard persists tasks in your browser and will survive reloads.

### Running tests

The repository includes a small Jest setup for unit testing the utility functions. Run:

```bash
npm run test
```

and you should see four simple assertions about status changes, filtering, search and sorting.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
