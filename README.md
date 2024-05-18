# KatApp - Cat Health and Information Management App

![kattappbanner](https://github.com/neezacoto/KatApp/assets/74576449/4aafd326-c420-4693-940c-3a712ab5e435)

## DEMO
https://github.com/neezacoto/KatApp/assets/74576449/d2acd532-19fb-4449-9424-5faaecde9e9d



## Introduction

KatApp helps cat owners manage their cat's health and information efficiently. By leveraging the power of AI, users can scan cat food barcodes, receive a breakdown of product information, get insights on best sellers from Amazon, and maintain records of past QR codes scanned. Additionally, the AI assistant, A.V.A (AI, Veterinarian, Assistant), facilitates conversations about the cat's health, ensuring the focus remains on the topic.

### The Problem with Managing Cat Health
- Manual tracking of cat health and diet can be cumbersome and error-prone.
- Lack of consolidated information about cat food products.
- Difficulty in keeping track of past interactions and health records.

### KatApp's Solution
KatApp addresses these challenges by:
- Providing detailed breakdowns of cat food products using AI.
- Offering information on best-selling products from Amazon.
- Keeping a record of all scanned QR codes and related data.
- Facilitating conversations about cat health through an AI assistant.

## Team

| Name            | Role                          | Contact Info          |
|-----------------|-------------------------------|-----------------------|
| Christian Rudder| Product Owner, Designer, Software Engineer | crubber@bu.edu       |
| Sangyun Kim     | Software Engineer             | sykim25@bu.edu        |
| Tai Koeda       | Software Engineer             |        |
| Jonathan Ham    | Software Engineer             |       |
| Benjamin Herold | Software Engineer             |       |

*Class CS392, Boston University*

## Tech Stack

KatApp is built using React Native for the front-end, with a back-end powered by Firebase, and the API is developed using C# ASP.NET. The application is hosted on Microsoft Azure.

<p align="center">
  <img src="https://github.com/Project-Hada/Hada-App-Client/assets/74576449/808debec-2154-487d-b556-68f1eda00612" alt="React Native Logo" height="250" style="margin-right: 100px;">
  <img src="https://github.com/Project-Hada/Hada-App-Client/assets/74576449/a4a1e327-0606-4e47-a368-01cc29e9c97d" alt="Firebase Logo" height="250" style="margin-right: 100px;">
  <img src="https://github.com/neezacoto/KatApp/assets/74576449/428ea1d0-8a0f-4b0d-a53d-9e8e3727fea5" alt="Firebase Logo" height="250" style="margin-right: 100px;">
</p>

## Learnings

- **Product/Scrum Management**: Keeping the team centered, listing stories/tasks to complete.
- **Design Lead**: Enjoying the design process, working with tools like Figma.
- **Team Building**: Ensuring team cohesion and support, fostering good connections.

## Getting Started

This section provides a step-by-step guide to get your development environment set up and run the KatApp on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js: Required to run the JavaScript code. Download and install it from [Node.js website](https://nodejs.org/en).
- Git: Ensure [Git](https://git-scm.com/downloads) is installed on your machine.
- Yarn: Used for managing the app's packages. After installing Node.js, install Yarn by running `npm install -g yarn` in your terminal.
- Expo CLI: Necessary for running the app. Install it globally using Yarn with `yarn global add expo-cli`.

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your/katapp-client.git
   ```

2. Navigate to the project directory:
   ```bash
   cd katapp-client
   ```

3. Install dependencies with Yarn:
   ```bash
   yarn install
   ```

### Running the App
**To start you may simply run**: `yarn start` <--

Then you may scan the QR code above with Expo Go (Android) or the Camera app (iOS)

- **Running on Android or iOS Emulator**:
  - For Android, ensure you have an Android emulator running, or a device connected, and run:
    ```bash
    yarn android
    ```
  - For iOS, ensure you have Xcode installed and an iOS simulator set up, then run:
    ```bash
    yarn ios
    ```

- **Running on the Web**:
  ```bash
  yarn web
  ```
  This command will open up a web version of the app in your default browser.

### Back-end

In Visual Studio, run `SQL-DATABASE.sln` (f5). Despite the naming "SQL database," due to time constraints in the last weeks of development, we decided not to use it but weren't bothered enough to change names. Therefore, code might be messy or names might not be intuitive because of the time crunch of 2 weeks of development.

If your machine runs on different ports, these files contain port information:
- **Front-end:** `App.tsx`
- **Back-end:** `program.cs`

## License Agreement

**KatApp Software License Agreement**

This License Agreement ("Agreement") is made between KatApp ("Company") and you, the user ("Licensee").

### Grant of License

The Company grants the Licensee a non-exclusive, non-transferable, limited right to access and use the KatApp software ("Software") in accordance with the terms of this Agreement.

### Restrictions

The Licensee shall not modify, distribute, sublicense, or use the Software except as expressly permitted by this Agreement. The Licensee agrees not to use the Software in any manner that could damage, disable, overburden, or impair the Software or interfere with any other party's use.

### Intellectual Property

The Software
