# E-Commerce Web App 🛍️

A modern, responsive e-commerce web application built with **React**, **Vite**, and **Tailwind CSS**.

## ✨ Features

- **Product Catalog & Home Page**: Interactive category filters, promotional hero banners, badges, and curated product listings.
- **Product Details**: Comprehensive product view with image gallery, size selector, specifications, and instant add-to-cart.
- **Search & Filter**: Search products with real-time feedback and empty-state handling.
- **Wishlist / Favorites**: Save favorite items with quick toggle actions.
- **Cart & Checkout**: Full shopping cart management with item quantity controls, promotional voucher support, multi-step checkout (address, delivery options, payment methods), and order confirmation.
- **Modern UI & Responsive Design**: Clean aesthetics built using Tailwind CSS and Lucide React icons.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler / Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: React State / [React Router](https://reactrouter.com/)

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AmanBadola01/E-commerce-web-app.git
   cd E-commerce-web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```text
├── public/              # Static assets and product images
├── src/
│   ├── components/      # UI Components (Navbar, CartPage, HeroBanner, etc.)
│   ├── data/            # Mock product and catalog data
│   ├── App.jsx          # Main application orchestrator
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global Tailwind CSS styles
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
