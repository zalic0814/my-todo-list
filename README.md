# MyTodoApp

## Development server

- `npm install`
- `npm run start`
- `http://localhost:4200/`

## codebase architecture

- `src/app/modules/domains`: Modules with routings.
- `src/app/modules/shared`: Shared pure modules.
- `src/app/shared`: Shared services, models, utils, etc., for across modules.
- `src/assets`: Static resources and custom shared scss.

## Test coverage

- `npm run test -- --no-watch --code-coverage`
- use browser to open `/coverage/my-todo-app/index.html`
- go to `app/shared/services` in the reporter and we can see the coverage of `task-agent.service.ts` is 100%.

## Roadmap

### Foundations

- [X] Eslint & Formatter
- [X] Tailwinds
- [X] Angular Material

### Basic UI/UX

- [X] Header
- [X] Navbar
- [X] RWD Navbar

### All tasks UI/UX

- [X] routing
- [X] Task component
- [X] Change task status
- [X] Modify task date
- [X] Modify task description
- [X] Create a new task and save
- [X] Update an existed task
- [X] Delete an existed task
- [X] Search tasks by descriptions
- [X] Sort tasks by date
- [X] RWD layout
- [ ] A11y (some shortcut and focus for better UX)

### Calendar view UI/UX

- [X] Routing
- [ ] Calendar component
- [ ] Highlight date with tasks
- [ ] Different Highlight color for tasks status
- [ ] Detail page while clicking a date on the calendar

### Unit test

- [ ] All tasks component
- [ ] Task component
- [X] Task agent service
