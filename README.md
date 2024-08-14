This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

:::mylearnings

### When to Use It: @t3-oss/env-nextjs

- **When you have complex or critical environment variable needs**: If your project relies heavily on environment variables and you want to ensure they are handled correctly, this package can be very helpful.

- **When you're working in a TypeScript project**: Since this package leverages TypeScript, it’s most beneficial in projects that are already using TypeScript.

- **When security and consistency are priorities**: For production-level applications where misconfiguration or security issues can have serious consequences, using a tool like this can provide an extra layer of safety.

### What is the use of Adapters in NextAuth?

- In NextAuth.js, an Adapter is a crucial component that allows you to connect your authentication system to different databases or data storage solutions. By default, NextAuth.js stores user data (e.g., users, sessions, accounts, verification tokens) in memory, which is not persistent. To store this data in a database like PostgreSQL, MongoDB, or any other supported database, you need an Adapter.

- **Handling Multiple Accounts**: If your application supports multiple authentication providers (e.g., Google, Facebook, GitHub), Adapters manage linking these external accounts to a single user profile in your database.
