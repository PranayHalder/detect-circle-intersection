document.addEventListener("click", (e) => {
  const x = e.clientX, y = e.clientY;
  const radius = Math.random() * 71 + 30;
  const [r, g, b] = generateRandomRGB();
  
  const circle = document.createElement('div');
  Object.assign(circle.style, {
      position: 'absolute',
      top: `${y - radius}px`,
      left: `${x - radius}px`,
      width: `${radius * 2}px`,
      height: `${radius * 2}px`,
      borderRadius: '50%',
      backgroundColor: `rgba(${r}, ${g}, ${b}, 1)`
  });
  
  circle.classList.add('circle');
  circle.dataset.x = x;
  circle.dataset.y = y;
  circle.dataset.radius = radius;

  const circles = document.querySelectorAll(".circle");
  circles.length >= 2 
      ? circles.forEach(c => document.body.removeChild(c))
      : circles.forEach(c => {
          const x2 = parseFloat(c.dataset.x), y2 = parseFloat(c.dataset.y);
          const existingRadius = parseFloat(c.dataset.radius);
          if (checkInterceptingCircle(x, x2, y, y2, radius + existingRadius)) {
              console.log("Circles are intercepting");
          }
      });
  
  document.body.appendChild(circle);
});

  

  function generateRandomRGB() {
    return Array.from({ length: 3 }, () => Math.floor(Math.random() * 256));
  }

  function checkInterceptingCircle(x,x1,y,y1,totalRadius)
  {
     const distanceBetweenCircles =  Math.sqrt(Math.pow(x - x1,2) + Math.pow(y - y1,2));
     return totalRadius > distanceBetweenCircles;
  }

 