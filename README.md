# Next.js Hotel Booking Application

A modern, responsive hotel booking system built with **Next.js 16 (App Router)**. This application allows users to select user citizenshipç booking details such as check-in and check-out dates, destionation, hotels and boards with their types (FB, HB, NB), view a dynamic summary, save the reservation to a local JSON "database" named data.json, and generate a downloadable PDF confirmation.


## 🚀 Features

* **Dynamic Booking System:** Step-by-step flow for selecting dates, hotels, and meals.
* **Real-time Summary:** `BookingSummaryCard` updates instantly as users make selections.
* **Data Persistence:** Saves booking data to a local `data.json` file via Next.js API Routes.
* **PDF Generation:** Client-side PDF generation using `jspdf`.
* **Unit Testing:** Integrated **Jest** as **React Testing Library** for component testing.
* **Responsive Design:** Styled with **Tailwind CSS** for a modern, glassmorphism look.


## 🛠️ Setup Instructions

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [`https://github.com/qalib01/hotel-booking-platform.git`](https://github.com/qalib01/hotel-booking-platform.git)
    cd hotel-booking-platform
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Initialize the database:**
    Create an empty `data.json` file in the root directory (if it doesn't exist):
    ```json
    [] # it must be square brackets, except for curly braces
    ```

### Running the Application

* **Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser.

* **Running Tests:**
    To run the Jest unit tests:
    ```bash
    npm test
    ```


---

## 💻 Technology Choices & Justifications

| Technology | Choice | Justification |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Provides robust server-side rendering, easy API route creation (`/app/api`), and optimized performance out of the box. |
| **Styling** | Tailwind CSS | Allows for rapid UI development with utility classes. Used specifically for the complex "glassmorphism" effects and responsive layouts. |
| **Database** | Local JSON file (`fs`) | Chosen for simplicity in this prototype phase to demonstrate CRUD operations without the overhead of setting up a full SQL/NoSQL database instance. |
| **PDF Generation** | jsPDF | Client-side library that allows generating PDFs directly in the browser without needing a dedicated server-side rendering engine for documents. |
| **Testing** | Jest & React Testing Library | The industry standard for React applications. Allows testing of component rendering (`BookingSummaryCard`) and user interactions. |
| **Icons** | Lucide React | Lightweight, consistent, and customizable SVG icons. |
| **File Management** | Fs/Fs-Extra | File management functionality, needing for updating and added new booking data to data.json file. |
| **Code Type Styling** | TypeScript | Features for defining and applying types, which significantly impacts code styling and maintainability. |

---

## 🏗️ Architecture Decisions

### 1. Client vs. Server Separation
The application utilizes Next.js **Client Components** (`'use client'`) for interactive UI elements (like the Booking System and Summary Card) and **Server Routes** (API Handlers) for data processing.
* **Frontend:** Handles state management (via React Redux toolkit) and PDF generation.
* **Backend:** The `/api/add-data` route handles safe file system operations (`fs/fs-extra` module) to read/write to `data.json`.

### 2. State Management
A custom `useBooking` hook (Context API) is used to manage the global state of the reservation. This avoids "prop drilling" and ensures that `BookingSummaryCard` always has access to the latest user selections (Dates, Meals, Destinations).

### 3. PDF Generation Strategy
PDF generation is offloaded to the client side using `jspdf`. This reduces server load and allows for immediate feedback to the user upon clicking "Complete". After completing the reservation Pdf download button appears automatically then user can download, see and share the booking summary as pdf.

---

## ⚠️ Known Limitations & Future Improvements

### Limitations
1.  **Deployment Constraints:** The current data persistence method (writing to `data.json` using `fs`) **will not be work** on serverless deployment platforms like Vercel or Netlify, as the file system is ephemeral (temporary).
2.  **Concurrency:** Writing to a local JSON file is not safe for high-traffic concurrent users (risk of race conditions). At least this method is only using for testing.
3.  **Validation:** There is currently minimal backend validation on the incoming request body and this check is not security-related. It is only considered to check the validity of the inputs.

### Future Improvements
1.  **Database Integration:** Migrate from `data.json` to a real database like **PostgreSQL (via Prisma)** or **MongoDB** to support production deployment.
2.  **Email Confirmation:** Integrate NodeMailer or SendGrid to send the PDF via email instead of just downloading it.
3.  **Authentication:** Add NextAuth.js to allow users to view their past booking history.
4.  **Error Handling:** Implement more robust error boundaries and toast notifications for network failures.
5.  **AI Integration:** With AI integration, we can create more detailed and accurate results based on the interests and desires of users, analyze active users and provide more differentiated suggestions, and ensure that they actively use the system.

---

## 🧪 Running Tests

The project includes unit tests for the `BookingSummaryCard` component.

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch