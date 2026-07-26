```markdown
# soft-ui-kit Development Patterns

> Auto-generated skill from repository analysis

## Overview
The `soft-ui-kit` repository is a JavaScript codebase focused on providing a set of UI components or utilities with a "soft" design aesthetic. This skill teaches you the conventions, structure, and workflows used in the repository, including file naming, import/export patterns, and testing approaches. No specific JavaScript framework is used, making the patterns broadly applicable to vanilla JS projects.

## Coding Conventions

### File Naming
- **PascalCase** is used for file names, especially for components and modules.
  - Example: `ButtonGroup.js`, `SoftCard.js`

### Import Style
- **Relative imports** are preferred for internal modules.
  ```js
  import { SoftButton } from './SoftButton';
  ```

### Export Style
- **Named exports** are used instead of default exports.
  ```js
  // SoftButton.js
  export function SoftButton(props) { /* ... */ }
  ```

### Commit Patterns
- Commit messages are freeform, with no enforced prefixes.
- Average commit message length is around 48 characters.

## Workflows

### Add a New UI Component
**Trigger:** When you want to introduce a new UI component to the kit  
**Command:** `/add-component`

1. Create a new file using PascalCase (e.g., `NewComponent.js`).
2. Implement the component using JavaScript.
3. Export the component using a named export.
   ```js
   export function NewComponent(props) { /* ... */ }
   ```
4. Import and use the component in other files via a relative path.
   ```js
   import { NewComponent } from './NewComponent';
   ```
5. (Optional) Add a corresponding test file (see Testing Patterns).

### Update an Existing Component
**Trigger:** When modifying or enhancing an existing component  
**Command:** `/update-component`

1. Locate the component file (e.g., `SoftCard.js`).
2. Make your changes, following the coding conventions.
3. Update or add tests if necessary.
4. Commit your changes with a clear, concise message.

### Write or Update Tests
**Trigger:** When adding new features or fixing bugs  
**Command:** `/add-test`

1. Create or update a test file matching the pattern `*.test.*` (e.g., `SoftButton.test.js`).
2. Write tests for the relevant component or module.
3. Use the project's preferred (but unspecified) testing framework.

## Testing Patterns

- Test files follow the `*.test.*` naming convention.
  - Example: `SoftButton.test.js`
- The specific testing framework is not detected, so follow general JavaScript testing best practices.
- Place test files alongside the components they test or in a dedicated `tests` directory if one exists.

## Commands
| Command           | Purpose                                         |
|-------------------|-------------------------------------------------|
| /add-component    | Scaffold and add a new UI component             |
| /update-component | Update or enhance an existing UI component       |
| /add-test         | Add or update tests for a component or module   |
```
