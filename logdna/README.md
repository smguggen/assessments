# LogDNA Senior FrontEnd Engineer Challenge – Vue Edition

## Task

**Build a Pokedex!**
Using the Pokémon API (https://pokeapi.co/), create a web app where you can find Pokemon by type, and create a list of your favourite Pokemon.

Your app will need:
* **A sidebar** with a list of Pokemon types. You should be able to filter the list by typing your query in the search bar. You can get the list of types from the API.
* **Main content section.** When you click a Pokemon type in the sidebar, the app loads all Pokemon of that type from the API and shows them in the main content section. Every Pokemon item should be rendered as a square and include Pokemon name, number (its `id` in the API) and a button for adding it to or removing it from the "My Favourites" section.
* **"My Favourites"** section. When you click the "Star" button on a Pokemon, it should show a modal where you can enter a memo (Mockup #2). After you confirm, the Pokemon appears in the My Favourites section. You can click the "X" button to remove it from favourites. Keep in mind that you can't add a Pokemon to favourites twice.

Notes:
* Every section of the app (sidebar, content and favourites panel) should be scrollable indepentently.

**We evaluate your ability to:**
* Understand task scope, and prioritize to achieve the most functional result within a limited timeframe
* Choose the right tools (packages, libraries, components, etc.)
* Organize the state management and data flow in a complex app
* Organize folder/component structure that is easy to navigate
* Decompose the task into a set of subtasks
* Navigate in API and UI framework with provided documentation
* Write maintainable and understandable code

**We do not evaluate:**
* Pixel perfectness
* Features outside of scope
* Knowledge of quirks, hacks, non-standard behavior (no need for crossbrowser support, etc.)
* Memorized knowledge (feel free to use google, docs, stackoverflow, call a friend...)
* Knowledge of a particular package or library


## Resources
* Vue.js Docs – https://vuejs.org/v2/guide/
* Vuex Docs – https://vuex.vuejs.org/guide/
* Element UI Kit – https://element.eleme.io/
* PokéAPI, The RESTful Pokémon API – https://pokeapi.co/


## Installed packages

* `element-ui` UI Kit (https://element.eleme.io/)
* `vuex`
* `vue-router`
* `sass`
* `axios`


## Commands

```
# Install dependencies
npm install

# Serve
npm run serve
```
