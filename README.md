# Todo API

This is a simple Todo API built with Django and Django Rest Framework.

## Prerequisites

Before you begin, ensure you have the following installed:

*   Python 3.x
*   pip (Python package installer)

## Installation

1.  **Clone the repository (or download the code):**

    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd todo_project
    ```

3.  **Install the required packages:**

    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

1.  **Apply the database migrations:**

    ```bash
    python manage.py migrate
    ```

2.  **Run the development server:**

    ```bash
    python manage.py runserver
    ```

    The application will be running at `http://127.0.0.1:8000/`.

## API Endpoints

The following API endpoints are available:

*   `api/todos/`
    *   `GET`: Get a list of all todos.
    *   `POST`: Create a new todo.
*   `api/todos/<int:pk>/`
    *   `GET`: Get a specific todo by its ID.
    *   `PUT`/`PATCH`: Update a specific todo.
    *   `DELETE`: Delete a specific todo.

### Example Usage

*   **Get all todos:**

    ```bash
    curl http://127.0.0.1:8000/api/todos/
    ```

*   **Create a new todo:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"title": "My new todo", "completed": false}' http://127.0.0.1:8000/api/todos/
    ```

*   **Get a specific todo (e.g., with ID 1):**

    ```bash
    curl http://127.0.0.1:8000/api/todos/1/
    ```

*   **Update a todo (e.g., with ID 1):**

    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"title": "My updated todo", "completed": true}' http://127.0.0.1:8000/api/todos/1/
    ```

*   **Delete a todo (e.g., with ID 1):**

    ```bash
    curl -X DELETE http://127.0.0.1:8000/api/todos/1/
    ```
