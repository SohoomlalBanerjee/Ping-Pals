# Ping Pals

Ping Pals is a full-stack chatting website that enables real-time communication between users. Built with React, Redux, Socket.IO, Express, Node.js, MongoDB, JWT, bcrypt.js, and Cloudinary, Ping Pals offers a secure and seamless chatting experience with image storage capabilities.

## Overview

Ping Pals allows users to chat in real time with their friends and contacts. Users can send messages, share images, receive notifications, and manage their conversations effortlessly.

## Features

- **Real-Time Communication:** Utilizes Socket.IO for real-time bidirectional communication between clients and the server, enabling instant messaging.
- **State Management:** Implements Redux for efficient state management, ensuring a consistent user experience across the application.
- **Authentication:** Secures user authentication using JWT (JSON Web Tokens) and bcrypt.js for password hashing, ensuring user privacy and data security.
- **Database Integration:** Utilizes MongoDB for data storage, enabling efficient retrieval and management of user conversations and profiles.
- **Image Storage:** Integrates Cloudinary for storing and serving images, providing scalable and reliable image hosting capabilities.
- **Responsive Design:** Built with React for the front end, ensuring a modern and responsive user interface across devices.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/ping-pals.git
    ```

2. Navigate to the project directory:

    ```bash
    cd ping-pals
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/ping-pals
    JWT_SECRET=your_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

    Replace `your_secret_key`, `your_cloud_name`, `your_api_key`, and `your_api_secret` with your actual values.

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. Sign up for a new account or log in with your existing credentials.
2. Explore the list of contacts and start chatting with friends.
3. Share images by uploading them directly from your device.
4. Receive real-time notifications for new messages and updates.
5. Manage your profile and conversation settings.

## Technologies Used

- React
- Redux
- Socket.IO
- Express
- Node.js
- MongoDB
- JWT (JSON Web Tokens)
- bcrypt.js
- Cloudinary

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).
