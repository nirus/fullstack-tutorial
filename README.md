## Controlling Apollo inflight request's using [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) API 

This project is to illustrates the example to <b>cancel the Apollo request</b> using AbortController thus preventing duplicates  for the same request.

Important files to watch for:

1. Core library- [cancelRequest.ts](https://github.com/nirus/fullstack-tutorial/blob/master/final/client/src/cancelRequest.ts)
2. Component usage - [login.tsx](https://github.com/nirus/fullstack-tutorial/blob/master/final/client/src/pages/login.tsx)
3. Final middleware wiring - [index.tsx](https://github.com/nirus/fullstack-tutorial/blob/master/final/client/src/index.tsx)


## Apollo tutorial

This is the fullstack app for the [Apollo tutorial](http://apollographql.com/docs/tutorial/introduction.html). 🚀

## File structure

The app is split out into two folders:
- `start`: Starting point for the tutorial
- `final`: Final version

From within the `start` and `final` directories, there are two folders (one for `server` and one for `client`).

## Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd final/server && npm i && npm start
```

and

```bash
cd final/client && npm i && npm start
```
