# Expense Tracker

Expense Tracker is a project developed for the CS266 course, aimed at team collaboration using agile methodologies along with extreme programming concept. This application is designed to manage and calculate personal finances, focusing on income and expenses. The project is a continuation and enhancement of a previous repository, here us the provided link for original repository.

**Original Repository:** [Expense Tracker App](https://github.com/TusharKesarwani/Front-End-Projects/tree/main/Projects/Expense%20Tracker)

## Overview

Expense Tracker assists users in tracking their financial transactions efficiently. Users can input their income and expenses, categorize transactions, and generate reports to gain insights into their spending patterns. This project aligns with the principles of agile development, emphasizing collaboration, adaptability, and iterative improvement.

## Key Features

-   **Transaction Management:** Easily add, edit, and delete income and expense transactions.
-   **Categorization:** Group transactions into categories for better organization.
-   **Reporting:** Generate reports to visualize financial trends and analyze spending habits.
-   **User-Friendly Interface:** Intuitive design for a seamless user experience.

## Getting Started

To use Expense Tracker, follow these steps:

1.  Clone the repository:
    ```bash
    git clone [repository-url]` 
    
2.  Install dependencies:
    ```bash
    npm install
    
3.  Run the application:
    ```bash
    npm run dev

# Features added in  our development cycles

In the development cycles, we plan to incorporate additional features and improvements based . Our focus includes expanding reporting capabilities, adding more features,  and enhancing overall user experience.

# Sprint 1: User Story Details and Functionality

## Story 1: Add Date and Time to Transactions

**Functionality:** User can now add specific dates and times to each transaction. This enhancement ensures accurate recording of expense details, aligning them with the respective transaction dates.

**Implementation:**

-   Modified the transaction input to include date details with date validation.
-   Transitioned from local storage to MongoDB for improved data management.

<img src="https://github.com/yakormud/CS266/assets/32937471/342830c8-697c-4424-9ee5-3850096ea198" width="853" height="481">
<img src="https://github.com/yakormud/CS266/assets/32937471/03a2bd52-9f8f-44f5-9ed5-459b41b4316f" width="853" height="481">


## Story 2: View Expense Details by Date

**Functionality:** Users can now view detailed expense information based on transaction dates. This feature enables users to explore their spending history on a day-to-day basis.

**Implementation:**

-   Introduced a feature to retrospectively view transaction history.
-   Stored historical data for up to one year from the current date.

![us2_1](https://github.com/yakormud/CS266/assets/32937471/76deaa81-1c8f-4c7b-a2be-6721c563a02a)

## Story 3: Add Tags to Transactions

**Functionality:** Users have the ability to add tags to each transaction for better categorization and organization of expenses.

**Implementation:**

-   Implemented a tagging system to classify transactions.

![us3_1](https://github.com/yakormud/CS266/assets/32937471/2597d04e-1ae8-46ba-b848-22a2dccbd69b)
-   Introduced a dedicated page for managing tags.
<img src="https://github.com/yakormud/CS266/assets/32937471/f0c99045-81a2-44c3-8cbe-80514900af0e" width="853" height="481">
<img src="https://github.com/yakormud/CS266/assets/32937471/3371b2ec-2eff-4261-a515-47994ae94302" width="853" height="481">

## Story 4: Search Expenses by Tag

**Functionality:** Users can search and filter expenses based on tags, providing a convenient way to track spending for specific categories.

**Implementation:**

-   Added a search function to filter expenses by tags.
-   Enhanced visibility into expenses associated with specific tags.

<img src="https://github.com/yakormud/CS266/assets/32937471/099169a0-181d-48df-903b-0e9f10bb5084" width="853" height="481">

# Sprint 2: Additional Features and UI Improvements

## Story 5: Monthly Summary Charts by Tag

**Functionality:** Users can now access summary charts depicting monthly income and expenses categorized by tags. This feature facilitates a comprehensive overview of monthly financial activities.

**Implementation:**

-   Introduced charts summarizing income and expenses by tags.
-   Enhanced the ability to analyze monthly financial data.

## Story 6: Identify Highest Spending Tags

**Functionality:** Users can identify which tags are associated with the highest spending, aiding in effective budget management.

**Implementation:**

-   Implemented a feature to highlight tags with the highest expenses.
-   Provided insights to help users manage their expenditures more efficiently.

<img src="https://github.com/yakormud/CS266/assets/99605831/94ab93f6-f9d0-4354-878a-f0c670ccae78" width="853" height="420">

## Story 7: Toggle Between Light and Dark Mode

**Functionality:** Users can switch between light and dark mode to customize the display according to their preferences.

**Implementation:**

-   Introduced a toggle feature for users to switch between light and dark modes in all pages.
-   Enhanced user experience with customizable display options.

<img src="https://github.com/yakormud/CS266/assets/32937471/96787260-728f-46b3-a380-beb143db78e2" width="853" height="481">
<img src="https://github.com/yakormud/CS266/assets/32937471/638ecef9-d800-49ee-855d-e62931d3477d" width="853" height="481">
<img src="https://github.com/yakormud/CS266/assets/151375894/97a18b6e-2a7c-4af7-98a0-691ab18abdee" width="853" height="481">
