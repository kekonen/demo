// file:///home/daniil/code/projects/demo/index.htm

//       |
//       |
//       |
// ------------>x
//       |
//       |
//       |
//       \/ y

const c = b.getContext("2d")
hz = 24
G = 6.67//6.67

class Planet {
  constructor(context, x, y, r, m=5000, n='A', initial){
    this.c = context;
    this.x = x;
    this.y = y;
    this.r = r;
    this.m = m;
    this.n = n;

    this.S = initial.S?initial.S:{x:0,y:0}
    this.Forces = {original: initial.A?initial.A:{x:0,y:0}}
  }

  interact(planet) {
  	const dX = -(this.x-planet.x)
  	const dY = -(this.y-planet.y)

  	const rad = Math.atan2(dY, dX);

  	const dXupdate = Math.cos(rad)
  	const dYupdate = Math.sin(rad)



  	const Rsqred = (dX)**2 + (dY)**2 //Math.sqrt()
  	const a = G*planet.m/Rsqred

  	
  	this.Forces[planet.n] = {x:dXupdate*a, y:dYupdate*a}
  	
  	console.log(`${this.n}, pl:${planet.n}, a:${a},r2:${Rsqred},p{x:${this.x},y:${this.y}}, d{x:${dX},y:${dY}}, rad:${rad}, ux:${dXupdate*a}, uy:${dYupdate*a}`)


  	// if (dX >= dY) {
  	// 	dY /= dX | 0.001 
  	// 	// dX = 1
  	// 	console.log(`${this.n}: v1 x:${dX},y:${dY}, p{x:${this.x},y:${this.y}}`)
  	// } else {
  	// 	dX /= dY | 0.001
  	// 	// dY = 1
  	// 	console.log(`${this.n}: v2 x:${dX},y:${dY}, p{x:${this.x},y:${this.y}}`)
  	// }
  	// file:///home/daniil/code/projects/demo/index.htm
  	// console.log(`${this.n}, pl:${planet.n}, a:${a},r2:${Rsqred},p{x:${this.x},y:${this.y}}, d{x:${dX*a},y:${dY*a}}`)

  }

  interactWithObjects() {
  	this.planets.forEach(planet => {if (planet.n!= this.n) this.interact(planet)})
  }

  accelerate() {
    // console.log(Object.values(this.Forces))

  	Object.values(this.Forces).forEach(forceVector => {
  		// console.log(this.n, forceVector)
  		this.S.x += forceVector.x
  		this.S.y += forceVector.y
  	})
  	// this.S.x += this.A.x
  	// this.S.y += this.A.y
  }

  move() {
  	this.x += this.S.x
  	this.y += this.S.y
  }

  clear() {
  	this.c.clearRect(this.x-this.r -1, this.y-this.r -1 , this.r*2+2, this.r*2+2)
  }
  
  render() {
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    // this.
    this.c.fillStyle="#FF0000";
    this.c.fill();
  }

  update() {
  	this.clear()
  	this.accelerate()
  	this.move()
  	this.render()
  	// this.
  }
}

const planets = [new Planet(c, 0, 0 , 60, 1000, 'a',{S:{x:0, y:0}}), new Planet(c, 300, 300 , 20, 1000, 'b',{S:{x:50/hz, y:-100/hz}} ), new Planet(c, -300, -300 , 20, 1000, 'c',{S:{x:-50/hz, y:100/hz}})]  //S={x:0,y:1/hz}, A={x:0,y:9/hz}


onload = function update() {
	const H = b.height = innerHeight;
	const W = b.width = 0 | H * innerWidth / innerHeight

	c.translate(W/2, H/2);

	planets.forEach(planet => planet.planets=planets)

	// c.strokeStyle = '#fff';

	// c.strokeText([W,H], 0, 0 )

	// planets.forEach(planet => planet.update())
	// setTimeout(() => {
	// 	planets.forEach(planet => planet.clear())
	// },3000)
	const interval = setInterval(() => {
		planets.forEach(planet => planet.interactWithObjects())
		planets.forEach(planet => planet.update())
	}, 1000/hz)
	
	setTimeout(()=>{clearInterval(interval)}, 160000)
}

