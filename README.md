## Ecommerce Admin Panel
[live demo](https://ecommerce-admin-phi-drab.vercel.app/)

## Description
A comprehensive admin dashboard built with Next.js and TypeScript for managing a clothing store. Sellers can add products and collections, specify product features, and upload images using Cloudinary. The project integrates Stripe for payment processing and Clerk for user authentication.


## Table of Contents
- [Description](#description)
- [Features](#features)
- [Demostration](#demostration)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)

## Features

- **User Authentication**: Secure authentication using Clerk.
- **Payment Processing**: Integrated with Stripe for handling payments.
- **Data Management**: Efficient data handling with MongoDB.
- **Modern UI**: Sleek and responsive user interface with Next.js and TypeScript.
- **Real-time Updates**: Real-time data updates and notifications.
- **Product Management**: Sellers can add and manage products and collections.
- **Image Handling**: Image uploads and management using Cloudinary.

## Demostration

![DashBoard Page](image.png)
![Collections Page](image-1.png)
![Creating New Collections](image-2.png)
![Editing Collection Details](image-3.png)
![Products Page](image-4.png)
![Creating New Product](image-5.png)
![Uploading Photo](image-6.png)
![Editing Product Details](image-7.png)
![Orders Page](image-8.png)
![Order Details](image-9.png)
![Customers Page](image-10.png)

## Installation
Instructions for setting up the project locally.

```bash
# Clone the repository
git clone https://github.com/ozgevurmaz/ecommerce-admin.git

# Navigate to the project directory
cd ecommerce-admin

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file and add your environment variables as shown in the .env.example file

# Run the development server
npm run dev
```

## Usage
# Access the development server at
http://localhost:3000

# For production build
npm run build
npm start

## Technologies
- **Frontend**: Next.js, TypeScript
- **Backend**: Node.js, MongoDB
- **Authentication**: Clerk
- **Payments**: Stripe
- **Image Handling**: Cloudinary