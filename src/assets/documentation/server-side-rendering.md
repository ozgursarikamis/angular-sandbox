# Server-side Rendering

## Introduction

Server-side rendering (SSR) is a popular technique for rendering a normally client-side only single page app (SPA) on the server and then sending a fully rendered page to the client. The client's JavaScript bundle can then take over and the SPA can operate as normal.

SSR is a great technique for improving the perceived performance of a web app. It can also be useful for improving SEO for content that is only available in the client bundle.

## How it works

The `@angular/platform-server` package provides a Node.js server platform that can be used to render an Angular application on the server. The server platform renders your app and returns the HTML for the client to display.

## Benefits

- **Performance**: SSR can improve perceived performance by serving the client app's shell and initial page content on the initial request. This avoids the extra round trip needed for the client app to bootstrap and render itself.

- **SEO**: Search engines have trouble indexing client-side only apps. SSR can be used to provide search engines with a fully rendered page that they can index.

## Drawbacks

- **Performance**: SSR can increase the load on your server since it is rendering pages on the fly. This can be mitigated by using a caching server in front of your app server or by using a pre-rendering solution.

- **Complexity**: SSR requires a Node.js server to render the app. This can add complexity to your deployment process.

## Challenges and Considerations

- **Third-party libraries**: Some third-party libraries may not work in a server-side rendered app. This is because they may depend on the DOM or other browser APIs that are not available in Node.js. You may need to find alternative libraries that work in a server-side environment.

- **Browser-only code**: Some code may only be intended to run in the browser. This code will need to be refactored to run in a server-side environment.

- **Global state**: Global state can be problematic in a server-side rendered app. This is because the server will be rendering multiple pages at the same time. If global state is mutated during the rendering process, it can cause unexpected results. You may need to refactor your app to avoid global state.

- **Third-party authentication**: If your app uses third-party authentication, you may need to find a way to share authentication state between the server and the client. This can be done by using a cookie or by using a shared storage mechanism such as Redis.
