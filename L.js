const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

class Pen {
  constructor(x,y,orient_x,orient_y,ctx) {
    this.x = x
    this.y = y
    this.orient_x = orient_x
    this.orient_y = orient_y
    this.path = new Path2D()
    this.path.moveTo(x,y)
  }

  draw(length) {
    const newx = this.x + this.orient_x * length
    const newy = this.y + this.orient_y * length
    this.path.lineTo(newx,newy)
    this.x = newx
    this.y = newy
  }

  turn_right() {
    const new_orient_x = -this.orient_y
    const new_orient_y = this.orient_x
    this.orient_x = new_orient_x
    this.orient_y = new_orient_y
  }

  turn_left() {
    const new_orient_x = this.orient_y
    const new_orient_y = -this.orient_x
    this.orient_x = new_orient_x
    this.orient_y = new_orient_y
  }
  
  drawR() {
    this.turn_right()
    this.draw(1)
  }

  drawL(){
    this.turn_left()
    this.draw(1)
  }
  render() {
    ctx.stroke(this.path)
  }
}

function Rgen(length,x,y) {
  const rpen = new Pen(x,y,0,1,ctx);
  return function R(index) {
    if (index < length) {
      rpen.draw(3)
      Blgen((1/50)*(index/length)*(length-index)**2,rpen.x,rpen.y)(0)
      Brgen((1/50)*(index/length)*(length-index)**2,rpen.x,rpen.y)(0)
      return R(index+1)
    } else {
      rpen.render()
    }
  }
}

function Blgen(length,x,y) {
  const blpen = new Pen(x,y,1,0,ctx)
  return function Bl(index) {
    if (index < length) {
      blpen.draw(1)
      return Bl(index+1)
    } else {
      blpen.render()
    }
  }
}

function Brgen(length,x,y) {
  const brpen = new Pen(x,y,-1,0,ctx)
  return function Bl(index) {
    if (index < length) {
      brpen.draw(1)
      return Bl(index+1)
    } else {
      brpen.render()
    }
  }
}
R = Rgen(150,500,500)
R(0)
