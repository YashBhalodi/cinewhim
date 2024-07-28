# Welcom to CineWhim

This is a showcase app built with [Expo](https://expo.dev), [React Native](https://reactnative.dev/), [Expo router](https://docs.expo.dev/router/introduction/), [React Query](https://tanstack.com/query/v3). This application uses [TMDB](https://developer.themoviedb.org/reference/intro/getting-started) api as backend to allow users to explore all movies.

## Features

- Has "Now Playing", "Top Rated", "Popular", "Upcoming" movie lists with infinite pagination for boundless exploration
- Allows reading full details of a movie
  - If a movie is a part of collection, then shows the list of movies belonging in the collections
  - Also shows similar movies as recommendations list
- Unit tests for utils and functions
- Snapshot tests for base components

## Direct Usage

### Android:

For android, I have built an apk which you can directly install to your application and use the app directly.
[APK Link](https://expo.dev/accounts/yashbhalodi007/projects/cinewhim/builds/91405d09-cb2c-4b4a-a0a5-8fbb1a712dec)

### iOS:

Since I do not have [Apple Developer Program Membership](https://developer.apple.com/programs) yet, I am unable to build for iOS that can be used directly. As an alternative, you can run the app locally on your machine by performing the following steps.

## Development and Contribution

Clone the repo and run following in project root directory

```bash
nvm use 18
npm install
npm run start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

Add `.env` file containing the TMDB API key and token to project root directory

```
EXPO_PUBLIC_API_KEY=YOUR_TMDB_API_KEY
EXPO_PUBLIC_API_TOKEN=YOUR_TMDB_API_TOKEN
```

## Roadmap

### Core

- [ ] Refactor `Loader.tsx` component to use Skeleton loading instead of native `ActivityIndicator`
- [ ] Integrate Sentry for error monitoring
- [ ] Further Optimize UI for tablet devices
- [ ] More details in movie details screen
- [ ] Handle edge-cases scenarios in data such as missing poster image, missing release dates, etc.
- [ ] Allow searching for a movie

### Animation and UX Enhancements

- Show/hide the header and bottom tab bar with animation while user is scrolling the movie feed

### Personalisation

- [ ] Allow user to create and maintain favourite movie list
- [ ] Allow rating movies
