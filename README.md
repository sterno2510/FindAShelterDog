# FindAShelterDog

## Getting Started

Follow these steps to get the Find A Shelter Dog app up and running on your local machine.

### Options to run app

If you prefer to run the application in a docker container, follow these steps:

1. **Clone the Repository:**
- Open your terminal (command prompt on Windows).
- Navigate to the directory where you want to store the app.
- Run the following command to clone the repository:
  ```
  git clone https://github.com/sterno2510/FindAShelterDog.git
  ```

2. **Navigate to the Project Directory:**
- After cloning, navigate into the project directory using:
  ```
  cd shelter-dog-search
  ```

3. **Build the Docker Image:**
 ```
docker build -t shelter-dog-search .
```

4. **Run the Docker Container:**
```
docker run -d -p 3000:3000 shelter-dog-search
```

This command builds and runs the Docker container named `shelter-dog-search`, mapping port 3000 on your local machine to port 3000 in the container.

3. **View the App:**

Once the container is running, you can view the app by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

## In lieu of using Docker, follow the steps below
### Prerequisites

Before you begin, ensure you have the following installed on your computer:

- **Node.js:** Download and install Node.js from [nodejs.org](https://nodejs.org). The Receipt Processor app requires Node.js version 22.2.0.

### Installing Node.js (version 22.2.0)

1. **Download Node.js:**
- Visit [nodejs.org](https://nodejs.org).
- Download the Node.js version 22.2.0 installer suitable for your operating system.

2. **Install Node.js:**
- Run the downloaded installer and follow the installation prompts.
- Verify the installation by opening a terminal and running:
  ```
  node --version
  ```
  This should display `v22.2.0`.

### Installation Steps for Receipt Processor App

1. **Clone the Repository:**
- Open your terminal (command prompt on Windows).
- Navigate to the directory where you want to store the app.
- Run the following command to clone the repository:
  ```
  git clone https://github.com/sterno2510/FindAShelterDog.git
  ```

2. **Navigate to the Project Directory:**
- After cloning, navigate into the project directory using:
  ```
  cd shelter-dog-search
  ```

3. **Install Dependencies:**
- Once inside the project directory, install dependencies by running:
  ```
  npm install
  ```
This command will download and install all necessary packages defined in `package.json`.

4. **Start the React App:**
- Navigate to the project directory if not already there.
- Start the React app by running:
  ```
  npm start
  ```
This command compiles the React app and opens it in your default web browser. If it doesn't open automatically, you can visit `http://localhost:3000` in your browser.

6. **Explore the App:**
- You should now see the Find a Shelter Dog app running locally!


