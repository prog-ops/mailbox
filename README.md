# 📧 Mailbox App

A modern, fast, and elegant personal communication dashboard built with **React 19** and **Vite**. This application combines a seamless email-style inbox with a robust task management system, all wrapped in a premium, responsive interface inspired by modern design principles.

---

## ✨ Key Features

### 📩 Smart Inbox

- **Real-time Feel**: Smooth transitions between inbox lists and conversation threads.
- **Dynamic Conversations**: Simulation of incoming messages and deep threading for a "live" chat experience.
- **Rich Media**: Integrated avatars and clear typography for better readability.
- **Searchable**: Easily filter through your messages.

### ✅ Integrated Task Management

- **Task Organization**: Create, edit, and delete tasks with ease.
- **Tagging System**: Categorize tasks using a beautiful, color-coded tag system (e.g., Important, Meetings, Client Related).
- **Filtering**: Quickly toggle between "Personal Errands", "Urgent To Do", and "My Tasks".
- **Visual Feedback**: Clear indicators for completed tasks and expanded task details.

### 🚀 Premium User Experience

- **Inter-view Navigation**: Seamlessly switch between Inbox and Tasks using a hover-triggered Floating Action Button (FAB).
- **PWA Ready**: Installable on mobile and desktop devices with offline support.
- **Responsive Layout**: Designed to feel native on all screen sizes, from mobile phones to high-res monitors.

---

## 🛠️ Technology Stack

| Layer                | Technology                                                          |
| :------------------- | :------------------------------------------------------------------ |
| **Core Framework**   | [React 19](https://react.dev/)                                      |
| **Build Tool**       | [Vite 6](https://vitejs.dev/)                                       |
| **Styling**          | [Tailwind CSS 4](https://tailwindcss.com/)                          |
| **UI Components**    | [Material UI (MUI) 6](https://mui.com/)                             |
| **State Management** | [TanStack Query (React Query) 5](https://tanstack.com/query/latest) |
| **Routing**          | [React Router 7](https://reactrouter.com/)                          |
| **Icons**            | [MUI Icons](https://mui.com/material-ui/material-icons/)            |
| **Date Management**  | [date-fns](https://date-fns.org/) & [dayjs](https://day.js.org/)    |
| **API Backend**      | [JSONPlaceholder](https://jsonplaceholder.typicode.com/)            |

---

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd mailbox
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

- `src/api`: Centralized API client for clean data fetching.
- `src/components`: Shared UI components (Sidebar, Header, Floating Actions).
- `src/features`: Modular feature-based structure for Inbox and Task management.
- `src/hooks`: Custom React hooks (React Query) for data synchronization.
- `src/layouts`: Main application shell.
- `src/pages`: Top-level routing components.
- `src/context`: Global view state management.

---

## 📄 License

MIT License. Feel free to use and modify for your own projects!
