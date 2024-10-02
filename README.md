# Usage

### Part 1

1. **Install Backend Dependencies**  
   
   - Navigate to the `backend-no-auth` directory and install the necessary dependencies:
   - Rename the `.env.example` file to `.env` in the backend directory.   
   ```sh
   cd backend-no-auth 
   npm install
   npm run dev
   ```

2. **Install Frontend Dependencies & Start the App**  
   Navigate to the frontend directory, install dependencies, and start the application:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the App**  
   Open your browser and visit: [http://localhost:3000](http://localhost:3000)
   

### Part 2


   - Stop the server, if it is running.
   - Navigate to the `backend-auth` directory and install the necessary dependencies:
   - Rename the `.env.example` file to `.env` in the backend directory.
   ```sh
   cd backend-auth 
   npm install
   npm run dev
   ```

### Part 3

  

   - Stop the server, if it is running.
   - Navigate to the `backend-protected` directory and install the necessary dependencies:
   - Rename the `.env.example` file to `.env` in the backend directory.
   ```sh
   cd backend-protected 
   npm install
   npm run dev
   ```

### Backend Assessment (Joonas)

Your backend code is well-structured and follows good practices. Here are some observations and suggestions for improvement:

#### Strengths:
- **Modular Structure:** Your code is organized into separate files for routes, controllers, models, and middleware, which enhances readability and maintainability.
- **Error Handling:** You have implemented error handling in your controllers, which is crucial for debugging and user experience.
- **Authentication:** JWT-based authentication is implemented, which is a secure way to handle user sessions.
- **Validation:** Basic validation is present in the user signup and login processes.
- **Testing:** You have included unit tests for user and job routes, which is excellent for ensuring code reliability.

#### Areas for Improvement:

**Validation:**
- **User Input Validation:** Consider using a library like Joi or express-validator to validate user inputs more robustly.
- **Job Input Validation:** Similarly, validate job inputs to ensure data integrity.

**Error Handling:**
- **Consistent Error Responses:** Ensure that all error responses follow a consistent format. This makes it easier for the frontend to handle errors.
- **Custom Error Classes:** Create custom error classes to handle different types of errors more gracefully.

**Security:**
- **Password Strength:** Ensure that passwords meet certain complexity requirements.
- **Rate Limiting:** Implement rate limiting to prevent brute-force attacks.
- **Helmet:** Use the helmet middleware to set various HTTP headers for security.

**Code Duplication:**
- **DRY Principle:** Avoid code duplication, especially in error handling and response formatting. Create utility functions where necessary.

**Environment Variables:**
- **Sensitive Information:** Ensure that sensitive information like JWT secrets and database URIs are stored securely and not hard-coded.

**Database Connection:**
- **Connection Handling:** Ensure that the database connection is properly handled, especially in test environments. Consider using `mongoose.disconnect()` in your `afterAll` hooks.

#### Specific Suggestions:

**User Controller:**
- In `signupUser`, the `profile_picture` field is optional, but your validation requires it. Adjust the validation accordingly.
- Use `async/await` consistently and handle all possible exceptions.

**Job Controller:**
- In `createJob`, validate the job data before creating a new job.
- In `updateJob`, ensure that only allowed fields are updated to prevent accidental overwrites.

**Testing:**
- Add more tests to cover edge cases and error scenarios.
- Use `jest` or another testing framework to mock database operations for more isolated tests.

**Middleware:**
- Enhance the `requireAuth` middleware to handle token expiration and other JWT-related errors more gracefully.


### Frontend assessment (Sergei)

### Project Structure and Organization
- The project is well-organized with separate files for components, hooks, and pages.
- The use of `BrowserRouter`, `Routes`, and `Route` from `react-router-dom` indicates a well-structured routing system.
- The `MainLayout` component is used to wrap the main content and the `Navbar`, which is a good practice for maintaining a consistent layout.

### Component Design
- Components are designed to be reusable and modular. For example, `JobListings` and `JobListing` components handle job data display.
- The `Navbar` component dynamically changes based on the authentication state, showing different links for authenticated and unauthenticated users.

### State Management
- State management is handled using React's `useState` and `useEffect` hooks.
- Authentication state is managed in the `App` component and passed down to child components as props.
- Custom hooks like `useSignup`, `useLogin`, and `useField` are used to encapsulate logic, making the code more readable and maintainable.

### Form Handling
- Forms in `Signup` and `Login` components use custom hooks (`useField`) to manage form state.
- Form submission is handled asynchronously with proper error handling.

### API Interaction
- API interactions are handled using the `fetch` API with proper error handling.
- The `useSignup` and `useLogin` hooks manage the loading state and errors during API calls.
- The `JobPage` component fetches job details and handles job deletion with proper authorization headers.

### Styling
- The project uses a global CSS file (`index.css`) for styling.
- CSS classes are used consistently across components to apply styles.
- The use of Google Fonts (Quicksand) adds a modern look to the application.

### Routing and Navigation
- The routing system is well-implemented with routes for home, job details, add job, edit job, signup, login, and a not found page.
- The `Navigate` component from `react-router-dom` is used to handle redirects based on authentication state.

### Error Handling
- Error handling is implemented in API calls and form submissions.
- The `Home` component displays error messages if the job data fetch fails.
- The `JobPage` component handles errors during job deletion.

### Authentication
- Authentication state is managed using `localStorage` to persist user data.
- The `App` component initializes the authentication state based on the presence of a user token in `localStorage`.

### Code Quality
- The code is clean and follows good practices like modularization, reusability, and separation of concerns.
- Proper use of ES6 features like arrow functions, destructuring, and template literals.

### Recommendations
- **Error Handling:** Improve error handling by displaying user-friendly error messages in the UI.
- **Loading States:** Add loading indicators to improve user experience during API calls.
- **Form Validation:** Implement form validation to ensure data integrity before making API calls.
- **Code Comments:** Add comments to explain complex logic and improve code readability.
- **Testing:** Implement unit tests for components and hooks to ensure code reliability.
   -Overall, the frontend code is well-structured, follows good practices, and is easy to understand and maintain.