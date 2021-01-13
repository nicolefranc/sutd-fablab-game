# Fablab Game

# Prerequisites
- Node.js
- npm

## Getting Started
Go to project folder after cloning the repo and install dependencies
```bash
npm install
```

Start development server
```bash
npm run start
```

To create a production build:
```
npm run build
```

Production files will be placed in the `dist` folder. Then upload those files to a web server. 🎉

## Project Structure
```
    .
    ├── dist
    ├── node_modules
    ├── public
    │   ├── images
    │   ├── music
    │   ├── sfx
    │   ├── sprites
    ├── src
    │   ├── scenes
    │   │   ├── Game.js
    │   │   ├── TitleScene.js
    │   ├── index.html
    │   ├── main.js
    ├── package.json
```