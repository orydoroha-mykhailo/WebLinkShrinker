# WebLinkShrinker

## Project Overview

This project is developed as part of the coursework for "Programming User Interfaces 2024" and "Web Application Development Technology" courses. It is a web application that shortens URLs and provides a user-friendly interface for managing them.

## Author

**Mykhailo Orydoroha**

- **Group:** KV-31mp
- **Faculty:** FAM

## Lab Works

### Programming User Interfaces 2024

1. [Lab Work 1](https://docs.google.com/document/d/1pZukbrWrHOIZTcQEFVo7w0Lq2CpdKnvexJEQffG6vTU/edit?usp=sharing)
2. [Lab Work 2](https://docs.google.com/document/d/1vDP3XTaS1AaKG_-8A5sl-z513MwPMbJZ82ArT5flJfA/edit?usp=sharing)
3. [Lab Work 3](https://example.com/lab3_ui)

### Web Application Development Technology

1. [Lab Work 1](https://docs.google.com/document/d/1eBmpXmZe8qkjatcnfJfWKnnoumhF4L6_BsW8mSHQ_kE/edit?usp=sharing)
2. [Lab Work 2](https://example.com/lab2_webdev)
3. [Lab Work 3](https://example.com/lab3_webdev)

## Getting Started

### Prerequisites

- Python 3.x
- Django
- Other dependencies listed in `requirements.txt`

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/WebLinkShrinker.git
    ```

2. Navigate to the project directory:
    ```bash
    cd WebLinkShrinker/backend
    ```

3. Create a virtual environment:
    ```bash
    python -m venv venv
    ```

4. Activate the virtual environment:
    - On Windows:
      ```bash
      venv\Scripts\activate
      ```
    - On Unix or MacOS:
      ```bash
      source venv/bin/activate
      ```

5. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Database Migration

Run the following command to apply database migrations:

```bash
python manage.py migrate
```

## Creating a Superuser
To create an admin user, run:

```bash
python manage.py createsuperuser
```

Follow the prompts to create the superuser account.

### Running the Server
Start the development server using:

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` to access the application.

## Usage

### API Endpoints

- `/api/urls/` - Manage URL records
- `/api/auth/` - Authentication endpoints

### Admin Panel

Access the Django admin panel at `http://127.0.0.1:8000/admin/` using the superuser credentials.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any features, bug fixes, or enhancements.