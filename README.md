# Frontend Test Assignment
Name: **Nibros Ari Wibowo**

## Tech Stack

- Nuxt 3.11
- Vue 3
- Vuetify 3
- Pinia (State Management)
- Tailwind CSS

## Functional Requirements

- As a user, I want to see a list of rockets in the rocket list screen (Show each rocket image, rocket name, and rocket description)

Answer:
By using vuetify, loading, error, and success states are handled by v-data-table

![img](https://github.com/user-attachments/assets/8ca56c42-72ac-4048-9b5c-29a69b11b029)
- As a user, I want to be able to filter the rockets in the rocket list screen

Answer:
The endpoint filter doesnt work, but you can filter the rockets by name & desc in the global search bar. If you want to fail the test, you can set fail state to true on of filters.

- As a user, I want to be able to add the new rocket in the rocket list screen

Answer:
If its refreshed, the new custom rocket still exists thanks to pinia persisted.
![Image](https://github.com/user-attachments/assets/f49a115a-3e7b-4f2d-acce-c6a50db5b511)

- As a user, I want to be able to see the rocket detail by clicking a rocket in the rocket list screen (Show rocket image, rocket name, rocket description, cost per launch, country, first flight)

Answer:
Double click the row to see the rocket detail

![Image](https://github.com/user-attachments/assets/8ed2f00c-eff3-4b59-bcb2-01f14e0bcad7)

## Non-Functional Requirements

- Use Space-X API (https://github.com/r-spacex/SpaceX-API) for getting the rocket data
- Implement routers
- Implement state management
- Implement lifecycles
- Create components based will be + points
- UI states (Loading, Fail/Retry, and Success)
- Show loading when waiting response from API
- If an error occurred, user can retry by pressing retry button
- Show result when get response from API
