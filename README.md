# JDocs

JDocs is a web application built with Next.js, React, and TypeScript. It leverages various libraries and tools such as Tailwind CSS, Tiptap, and Zustand to provide a rich user experience.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/JDocs.git
   cd JDocs
   ```

2. Install the dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the project for production, run:

```sh
npm run build
# or
yarn build
```

### Linting

To lint the project, run:

```sh
npm run lint
# or
yarn lint
```

### .Env Example

```sh
# Deployment used by `npx convex dev`

#convex
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=

# clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY=
```

### Project library 👍

This project leverages a variety of modern libraries and frameworks to deliver a robust and feature-rich application. Below is a brief overview of the key dependencies used:

- **@clerk/nextjs**: 🔐 Provides authentication and user management solutions tailored for Next.js applications.

- **@liveblocks**: 🧑‍🤝‍🧑 Enables real-time collaboration features, allowing multiple users to interact with the application simultaneously.

- **zustand**: 🐻 A small, fast, and scalable state management solution for React applications.

- **@tiptap**: ✍️ A highly customizable rich-text editor framework for building complex text editing experiences.

- **convex**: ☁️ A backend-as-a-service (BaaS) that simplifies the development of serverless applications.

- **date-fns**: 📅 A modern JavaScript date utility library that provides comprehensive date manipulation and formatting functions.

- **embla-carousel-react**: 🎠 A lightweight and customizable carousel library for React applications.

- **lucide-react**: 🖼️ A collection of simple and consistent icons for React applications.

- **zod**: 🛡️ A TypeScript-first schema declaration and validation library.

- **react-color**: 🎨 A collection of color pickers for React applications.

- **tailwind css**: 💨 A utility-first CSS framework for rapidly building custom user interfaces.

These dependencies collectively enhance the functionality, performance, and user experience of the application.

## License

This project is licensed under the MIT License.
