

# **Edge Vision Kit**

**Edge Vision Kit** is a modern, flexible framework for building machine learning-based object detection and computer vision applications that run directly in the browser. It uses the power of **Vite**, **React**, and **TensorFlow.js** to provide real-time processing with minimal overhead. This project includes a monorepo structure with dedicated packages for image processing, webcam management, and model integration, designed to provide a robust foundation for edge computing in vision tasks.

## **Project Structure**

```
edge-vision-kit/
├── apps/
│   └── object-detection/
│       ├── public/                  # Static files (images, icons, etc.)
│       ├── src/                     # Application source files
│       │   ├── components/          # React components
│       │   ├── hooks/               # Custom hooks
│       │   ├── models/              # Model loading and processing files
│       │   └── utils/               # Utility functions (camera access, etc.)
│       └── vite.config.ts           # Vite configuration
│
├── packages/
│   ├── vision-core/                # Image processing and model management
│   │   ├── src/                    # Core functions and model loaders
│   │   │   └── __tests__/          # Unit tests
│   │   │       └── ModelLoader.test.ts
│   │   └── package.json
│   │
│   └── webcam-utils/               # Camera and video stream management
│       ├── src/                    # Webcam access and video processing
│       └── package.json
│
├── .eslintrc.js                    # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── jest.config.ts                  # Jest test configuration
├── jest.setup.ts                   # Jest test setup
├── tsconfig.jest.json              # TypeScript configuration for Jest
├── tsconfig.json                   # Main TypeScript configuration
├── turbo.json                      # TurboRepo configuration
└── package.json                    # Main project dependencies
```

## **Technologies Used**

- **Vite**: For fast, modern web development.
- **React**: For building the user interface.
- **TensorFlow.js**: For in-browser machine learning, powering the object detection models.
- **TypeScript**: For type safety and better development experience.
- **Jest**: For unit testing.
- **ESLint & Prettier**: For code linting and formatting.

## **Setup and Installation**

To get started, follow these steps to set up the project:

### 1. **Clone the repository**:

```bash
git clone https://github.com/finewiki/edge-vision-kit.git
cd edge-vision-kit
```

### 2. **Install Dependencies**:

Make sure you have **npm** installed, then run the following command to install the dependencies:

```bash
npm install
```

### 3. **Start the Development Server**:

Once the dependencies are installed, you can start the development server for the object detection app:

```bash
npm run dev
```

This will launch the application at `http://localhost:3000`.

## **Running Tests**

You can run tests using Jest to ensure the integrity of the code:

```bash
npm test
```

This will run all the tests and display the results in the console.

## **Packages**

### **1. `vision-core`**

This package contains the core image processing logic and model integration. It handles the loading and running of models such as **MobileNet** for object detection.

### **2. `webcam-utils`**

This package contains utilities for webcam access and video stream management. It provides a simple API to interface with the webcam and stream video frames to the application for processing.

## **How to Contribute**

1. **Fork the repository** and clone it locally.
2. **Create a new branch** for your feature or bugfix.
3. **Write tests** for any new functionality.
4. **Run tests** before submitting a pull request.
5. **Submit a pull request** with a description of your changes.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
