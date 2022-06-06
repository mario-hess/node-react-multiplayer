import { World, Vec3, Body, Plane } from 'cannon-es'

export const world = new World({
  gravity: new Vec3(0, -9.82, 0),
})

export const buildWorld = () => {
  const groundBody = new Body({
    type: Body.STATIC,
    shape: new Plane(),
  })
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
  groundBody.position.set(0, -3, 0)
  world.addBody(groundBody)
}
