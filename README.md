# canvas2d-wrapper

> A React Wrapper to use HTML5 canvas with mouse move and zoom abilities.

[![NPM](https://img.shields.io/npm/v/canvas2d-wrapper.svg)](https://www.npmjs.com/package/canvas2d-wrapper)  
[![Reliability Rating](https://sonar.dysnomia.studio/api/project_badges/measure?project=canvas2d-wrapper&metric=reliability_rating)](https://sonar.dysnomia.studio/dashboard?id=canvas2d-wrapper) [![Maintainability Rating](https://sonar.dysnomia.studio/api/project_badges/measure?project=canvas2d-wrapper&metric=sqale_rating)](https://sonar.dysnomia.studio/dashboard?id=canvas2d-wrapper) [![Security Rating](https://sonar.dysnomia.studio/api/project_badges/measure?project=canvas2d-wrapper&metric=security_rating)](https://sonar.dysnomia.studio/dashboard?id=canvas2d-wrapper)  
[![Duplicated Lines (%)](https://sonar.dysnomia.studio/api/project_badges/measure?project=canvas2d-wrapper&metric=duplicated_lines_density)](https://sonar.dysnomia.studio/dashboard?id=canvas2d-wrapper) [![Coverage](https://sonar.dysnomia.studio/api/project_badges/measure?project=canvas2d-wrapper&metric=coverage)](https://sonar.dysnomia.studio/dashboard?id=canvas2d-wrapper)


Do you want an example app made with this library ? Check out my game Alchemistry on [Steam](https://store.steampowered.com/app/1730540/Alchemistry/) or on [itch.io](https://elanis.itch.io/alchemistry).

## Install

```bash
npm install --save canvas2d-wrapper
```

## Usage

```jsx
import React from 'react'

import { Canvas2D, CanvasImage, Circle, Polygon, Rect } from 'canvas2d-wrapper'
import 'canvas2d-wrapper/dist/index.css'

const App = () => {
  const elements = [];
  for(let i = 0; i < 998; i++) {
    let object = null;
    if(Math.random() > 0.5) {
      object = new Rect({
        id: i,
        x: 50 - Math.round(Math.random() * 100),
        y: 50 - Math.round(Math.random() * 100),
        width: 1,
        height: 1,
        fill: (Math.random() > 0.5) ? 'black' : undefined,
        stroke: (Math.random() > 0.5) ? 'black' : undefined
      });
    } else {
      object = new Circle({
        id: i,
        x: 50 - Math.round(Math.random() * 100),
        y: 50 - Math.round(Math.random() * 100),
        radius: 0.5,
        fill: (Math.random() > 0.5) ? 'black' : undefined,
        stroke: (Math.random() > 0.5) ? 'black' : undefined
      });
    }

    if(!object.fill && !object.stroke) {
      object.fill = 'green';
    }

    elements.push(object);
  }

  const points = [];
  for(let i = 0; i < 5; i++) {
    points.push({
      x: 50 - Math.round(Math.random() * 100),
      y: 50 - Math.round(Math.random() * 100),
    });
  }

  const polygon = new Polygon({
    id: 'poly',
    points,
    stroke: 'red',
  });
  elements.push(polygon);

  const polygon2 = new Polygon({
    id: 'poly',
    points,
    fill: 'orange',
    zIndex: -1,
  });
  elements.push(polygon2);

  return (
    <Canvas2D 
      elements={elements}
      width={1200}
      height={700}
      minZoom={0.25}
      maxZoom={4}
      tileSize={32}
      onClick={(e) => {
        console.log('Click event:', e);
      }}
    />
  );
}

export default App;
```

## License

MIT © [Elanis](https://github.com/Elanis)
