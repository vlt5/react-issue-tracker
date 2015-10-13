# react-issue-viewer
A sample issue viewer built with React with pagination. (Built with ES6, webpack, live reload, less, mocha etc...)


## Steps
```
# clone this repo
git clone https://github.com/vlt5/react-issue-tracker.git

# installation
npm install

# start the dev server
npm start  
(Browser should automatically open http://localhost:3000/ )

# test cases
npm run test
(Then visit http://localhost:3001/webpack-dev-server/test/test.html)

```


## About
I've been hesitating on below when I get started:
    - Shall I need to use [Flux](https://facebook.github.io/flux/) 
    - Shall I need to use [React Router](https://github.com/rackt/react-router)
    - Shall I need to use CSS frameworks

But finally I deceided to keep it simple according to project requirement:
    - Pass down callback instead of using flux
    - Use light weight client-side routing libruary [page](https://visionmedia.github.io/page.js/) instead of react-router
    - No CSS frameworks included

Lastly, there're many boilerplates out there that has already integrated with React, ES6, live reload, gulp etc... But again, I kind of feel it's too much for this simple project, so I make my own boilerplate. Whenever I need something, I simply `npm install --save` it and it's much more fun!  

