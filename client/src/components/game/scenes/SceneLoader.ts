import Splash from './OfflineScenes/Splash'
import CharacterMenu from './OfflineScenes/CharacterMenu'
import Lobby from './OnlineScenes/Lobby'
import Winkl7 from './OnlineScenes/Winkl7'

export enum SCENES {
  Splash = 1,
  CharacterMenu,
  Lobby,
  Winkl7,
}

export const SceneLoader = (sceneToLoad: number) => {
  switch (sceneToLoad) {
    case SCENES.Splash:
      return Splash
    case SCENES.CharacterMenu:
      return CharacterMenu
    case SCENES.Lobby:
      return Lobby
    case SCENES.Winkl7:
      return Winkl7
    default:
      return Splash
  }
}
