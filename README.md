# Wave Terrain Editor

An editor for waves-based terrain generation.

## Setup

### Installing

Download [Node.js](https://nodejs.org/en/) v8.XX.X or higher and verify the installation.

```
node --version

// v8.11.3
```

Clone this repository and cd into the root folder.

```
git clone https://github.com/svntax/WaveTerrainEditor.git
cd WaveTerrainEditor
```

Install dependencies using npm.

```
npm install
```

## Running

For local testing, run the following in the root folder:

```
npm run start
```

and visit http://localhost:8080

## Deployment

In the root folder, run the following:

```
npm run build
```

to have Babel and Webpack bundle the project into the /dist/ folder.
