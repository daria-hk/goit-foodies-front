# Foodies Project

This project is a modern web application for managing and sharing recipes, built with React. Users can browse, add, and manage recipes, view categories, and interact with various features such as user authentication, favorites, and testimonials. The application features a responsive design, making it suitable for both desktop and mobile devices.

# Key Features:

- User Authentication: Sign up, sign in, and user profile management.
- Recipe Management: Add new recipes with images, ingredients, and instructions.
- Categories & Filters: Browse recipes by category and filter them according to user preferences.
- Favorites: Mark recipes as favorites for quick access.
- Pagination: Efficient navigation through large lists of recipes.
- Responsive UI: Optimized for different screen sizes with a clean, modern interface.
- Redux State Management: Uses Redux for managing global state, including recipes, categories, ingredients, and user data.
- Form Validation: Robust form validation using react-hook-form and Yup.
- Notifications: User feedback via toast notifications for actions like adding recipes or errors.

# Tech Stack:

- React (with hooks)
- Redux Toolkit
- React Router
- react-hook-form & Yup (form handling and validation)
- CSS Modules for component-scoped styling
- Vite (for fast development and build)
- Toast notifications (react-toastify)

# Folder Structure Highlights:

- src/components/: Reusable UI components (Header, Footer, Forms, etc.)
- src/pages/: Main application pages (Home, Add Recipe, User Page, etc.)
- src/redux/: Redux slices and async • operations for state management
- src/services/: API service layer for backend communication
- src/assets/: Images and SVGs for UI

### Clone the repository to your local machine:

    git clone https://github.com/daria-hk/goit-foodies-front.git

### Navigate into the project directory:

    cd goit-foodies-front

### Install the dependencies using npm or yarn:

With npm:

    npm install

With yarn:

    yarn install

## Development Server

### After installing the dependencies, you can start the development server with:

    npm run dev

This will start a local development server, usually available at http://localhost:5173.
##Building the Project

### To create an optimized production build, use the following command:

      npm run build

The built files will be located in the dist directory.

## Preview the Build

### Once the build is complete, you can preview it locally by running:

    npm run preview

## Linting the Code

### To check the code for issues and style inconsistencies, use:

      npm run lint

This will run ESLint and show any errors or warnings in your code based on the ESLint configuration.
