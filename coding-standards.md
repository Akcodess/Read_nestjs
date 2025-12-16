## 📐 coding-standards.md

### 🧠 General Principles
- Limit files to 400 lines of code.
- Keep functions short: max 75 lines.
- Use 1 class/interface per file.
- Prefer const for immutable values.
- Separate import blocks: leave a line between 3rd-party and internal imports.

### 🧾 Naming Conventions

| Element           | Style         | Example                     |
|------------------|---------------|-----------------------------|
| Component         | kebab-case    | `user-profile.component.ts` |
| Selector name     | kebab-case    | `selector: 'app-user'`      |
| Class/Interface   | PascalCase    | `UserProfile`, `IUser`      |
| Variable/Property | camelCase     | `userList`, `isActive`      |
| Observable        | camelCase + $ | `userData$`                 |
| Enum              | PascalCase    | `enum StatusType`           |
| Constants         | camelCase     | `maxRetries`                |
| File names        | kebab-case    | `auth.service.ts`           |
| Function Names    | PascalCase    | `GetXserver()`              |

### 🧱 Folder Structure Best Practices

```
src/
├── app/
│   ├── core/
│   ├── shared/
│   ├── modules/
│   └── components/
├── assets/
├── environments/
├── styles/
```

Use index.ts files in shared modules to simplify imports.

### 💬 Comments & Documentation
- Use JSDoc comments for:
  - Methods
  - Interfaces
  - Classes
- Use Document This (VS Code extension) to auto-generate.
- Document all public APIs and logic-heavy code blocks.

### 🧪 TypeScript Style Rules
- Use PascalCase for class, enum, interface, and function names.
- Avoid any; use specific types/interfaces.
- Use undefined over null.
- Place @Input() and @Output() on the same line as the property.
- Avoid logic in templates — move it to the component.
- Prefer async pipe in templates over manual subscriptions.
- Use safe strings: "four-wheeler" | "two-wheeler".

### 🎨 Component Guidelines
- Use external HTML & SCSS if the template exceeds 3 lines.
- Name files as:
  - `example.component.ts`
  - `example.component.html`
  - `example.component.scss`
- Use relative paths (`./`) for templates and styles.
- Break large components into smaller reusable components.
- Use trackBy in *ngFor loops.

### 🧰 SCSS & CSS Guidelines
- Follow BEM naming conventions.
- Avoid inline styles in templates.
- Avoid nesting more than 2 levels deep.
- Extract common variables to _variables.scss.

### 🚫 Linting Rules (Recommended)
- No console.log or debugger.
- Enable rules like:
  - no-any
  - no-magic-numbers
  - no-duplicate-attributes
  - eqeqeq
  - no-positive-tabindex
- Use tools: ESLint, Stylelint, Prettier

### 🧠 Lifecycle & Services
- Always implement lifecycle interfaces (OnInit, OnDestroy, etc.).
- Provide services at the highest shared level, not root by default.
- Use @Injectable() for dependency injection, not @Inject.

### 📦 File Type Conventions

| Type         | Folder         | Suffix              | Example                   |
|--------------|----------------|---------------------|---------------------------|
| Service      | `/services/`   | `.service.ts`       | `user.service.ts`         |
| Enum         | `/enums/`      | `.enum.ts`          | `status-type.enum.ts`     |
| Interface    | `/interfaces/` | `.interface.ts`     | `user-payload.interface.ts` |
| Model        | `/models/`     | `.model.ts`         | `user.model.ts`           |
| Component    | `/components/` | `.component.ts`     | `login.component.ts`      |
| Pipe         | `/pipes/`      | `.pipe.ts`          | `capitalize.pipe.ts`      |
| Directive    | `/directives/` | `.directive.ts`     | `highlight.directive.ts`  |
| Guard        | `/guards/`     | `.guard.ts`         | `auth.guard.ts`           |
| Utility      | `/utils/`      | `.util.ts`/`.helper.ts` | `date-util.ts`        |
