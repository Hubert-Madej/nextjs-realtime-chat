# Realtime Chat App with Next.js 13

This repository contains the code for a full stack realtime chat application built using Next.js 13. The chat app utilizes Upstash Redis as the database, Nextjs and React for the user interface, Pusher for real time communication, and TypeScript for types checking.

## Features

- Realtime messaging: Users can send and receive messages in real-time.
- User authentication: Users can create accounts and log in to access the chat app.
- Responsive design: The user interface is designed to work seamlessly on different devices and screen sizes.

## Prerequisites

Before getting started with the installation, ensure that you have the following dependencies installed on your system:

- Node.js (v14 or higher)
- npm or yarn package manager
- Upstash Redis account (signup at [https://upstash.com](https://upstash.com))

## Getting Started

Follow the steps below to get the chat app up and running on your local machine:

1. Clone this repository to your local machine or download the source code as a ZIP file.

   ```bash
   git clone https://github.com/Hubert-Madej/realtime-chat.git
   ```

2. Navigate to the project directory.

   ```bash
   cd realtime-chat-app
   ```

3. Install the dependencies using npm or yarn.

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. Create a `.env` file in the root directory of the project and provide the required environment variables.

   ```makefile
   NEXTAUTH_SECRET=

   # Upstash Redis Instance Credentials
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=

   # Google Auth Credentials
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=

   # Pusher
   PUSHER_APP_ID=
   NEXT_PUBLIC_PUSHER_KEY=
   PUSHER_SECRET=
   ```

5. Start the development server.

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

6. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the chat app.

## Deployment

To deploy the chat app to a production environment, you can follow these steps:

1. Build the optimized production-ready version of the app.

   ```bash
   npm run build
   ```

   or

   ```bash
   yarn build
   ```

2. Start the production server.

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

3. Your chat app will be accessible on the provided server URL.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.
