import { World, Vec3 } from 'cannon-es'

export const world = new World({
  gravity: new Vec3(0, -9.82, 0),
})

export const tick = () => {
  setImmediate(tick)

  world.fixedStep()
}

tick()
