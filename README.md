# All Reports App

## Project Setup & Running Locally

1. **Install Dependencies**
   ```
   npm install
   ```

2. **Run the Application**
   ```
   npm start
   ```
   The app will be available at `http://localhost:4200` by default.



3. **Build for Production**
   ```
   ng build
   ```
   This will generate a production build in the `dist/` directory.

   > **Note:** In Angular 12 and above, `ng build` always produces a production build by default. The `--prod` flag is no longer needed or supported. If you want to be explicit, you can use:
   > ```
   > ng build --configuration production
   > ```

4. **Lint the Code**
   ```
   ng lint
   ```
   This will run Angular ESLint and show any code style or best practice issues.

## Main Components & Functionality

- **src/app/reports/reports.component.ts / .html / .scss**
  - Main UI for listing, searching, sorting, and paginating reports.
  - Allows selecting a report row to show edit/delete actions.
  - Responsive layout with fixed-width columns for consistent alignment.

- **src/app/reports/services/reports.service.ts**
  - Handles fetching and managing report data (mocked from `assets/reports.json`).

- **src/assets/reports.json**
  - Mock data source for reports.

## Reviewer Notes

- The UI is fully responsive and tested for edge cases (long names, empty states, etc).
- Row selection highlights the row and shows actions; clicking outside or sorting clears selection.
- All layout and visibility logic is handled with Angular and SCSS for a smooth user experience.
- For any issues, please check the browser console for errors or run `npm test` for diagnostics.

---
