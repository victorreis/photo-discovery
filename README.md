# Welcome to Photo Discovery

Access: [https://photo-discovery.vercel.app/](https://photo-discovery.vercel.app/)

## Summary

- [Introduction](#introduction)
- [Features purposed](#features-purposed)
- [Bonus features and implementations](#bonus-features-and-implementations)
- [Endpoints consumed](#endpoints-consumed)
- [Trade-offs and assumptions](#trade-offs-and-assumptions)
- [Installation](#installation)
- [Running](#running)
- [Another scripts](#another-scripts)

## Introduction

See the latest version online: [https://photo-discovery.vercel.app/](https://photo-discovery.vercel.app/)

A simple and intuitive interface to search and view photos provided by [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/).

The main objective of this project is to practice some development skills throught some technologies and concepts:

- ReactJS
- TypeScript
- CSS-in-JS (styled-components)
- Unity tests (Jest + React Testing Library)
- Linters (eslint, style-lint)
- Formatters (editorconfig, prettier)
- git hooks (husky: pre-commit, prepare-commit-message)
- conventional-commits (commitizen)
- Scaffolding (scaffdog)
- Environment config (.vscode/\*, .npmrc)
- Usability
- Responsivity
- Clean Code
- SOLID
- KISS: “Keep It Simple, Stupid!”
- YAGNI: “You Ain’t gonna need it”
- DRY: “Do not Repeat Yourself”

## Features purposed

- Provide a way to look to all the albums of a given user.
- Provide a way to see the photo in full size.
- Provide a way to search photos by title and to show their thumbnails.
- Show all the words of the titles that was filtered by the searched in an italicized way.

## Bonus features and implementations

- High level of quality (strong eslint/typescript rules, scaffolding, separation of responsabilities, tests, pre-commit with type-check/linting/tests etc).
- Create a lot of components through the styled-components with a well organized structure of files (instead of using third part libraries).
- Unity tests not only about the API consumption, but also the component styles, behaviors, snapshots etc.
- Global tests configuration that provides a simple and standardized way to render the components through the React Testing Renderer or through React Testing Library, with the theme provider already embedded.
- Server setup to allow testing the API calls in a easier way.
- Create a thematization structure that allows to create how many themes that you want.
- Create a customized theme interface with some structures implemented (borders, colors and typography).
- Create a menu to switch between the available themes.
- Allow to filter the albums and photos by text, by user and by album.
- Load more albums and photos only when the user click in "Load more...". Looks like infinity scroll.
- Implements responsivity to allow any screen size by using @media queries and the Grid Layout.
- Usage of React Context, React Hooks.
- Usage of Typescript generics, union type and interface manipulation and interesting Type utilities.

## Endpoints consumed

- Albums: [https://jsonplaceholder.typicode.com/albums](https://jsonplaceholder.typicode.com/albums)
- Users: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
- Photos: [https://jsonplaceholder.typicode.com/albums/{albumId}/photos](https://jsonplaceholder.typicode.com/albums/{albumId}/photos)

## Trade-offs and assumptions

- As long new albums and new users are not created frequently, I keep their data locally.
- Instead of recording the photo's data locally to avoid API calls I prefered to to simulate a real system that get the newest data every time.
- To avoid a low performance I implemented the "Load more..." functionality.
- I had no time to create more themes and to equalize the light and dark themes, so I just showed the dark ones.
- I had no time to create more unity tests, but I know that there are some more to do.
- I had no time to get some fancy fonts to the site look better.
- I did the components layout very simple, I know that there are a lot of aesthetic improvements to do.

## Installation

- Make sure that you have nodejs installed in you computer. Preference: node 16.
- `yarn install` if you have the yarn installed globally or `npx yarn install`, if not.

## Running

- `yarn start` or `npm start`

## Another scripts

- Typescript type check: `yarn type-check`
- Prettier formating: `yarn format`
- Linting code: `yarn lint`
- Build: `yarn build`
- Tests: `yarn test`
- Scaffolding: `yarn g`
