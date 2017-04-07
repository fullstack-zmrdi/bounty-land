import { Navigation } from 'react-native-navigation'
import Drawer from './Drawer'
import Home from './Home'
import SignIn from './SignIn'
import Profile from './Profile'
import AddChallenge from './AddChallenge'
import ChallengeDetail from './ChallengeDetail'
import Challenges from './Challenges'
import Wallet from './Wallet'
import About from './About'

export const registerScreens = () => {
  Navigation.registerComponent('SIGN_IN', () => SignIn)
  Navigation.registerComponent('PROFILE', () => Profile)
  Navigation.registerComponent('DRAWER', () => Drawer)
  Navigation.registerComponent('ABOUT', () => About)

  Navigation.registerComponent('HOME', () => Home)
  Navigation.registerComponent('ADD_CHALLENGE', () => AddChallenge)
  Navigation.registerComponent('CHALLENGE_DETAIL', () => ChallengeDetail)
  Navigation.registerComponent('CHALLENGES', () => Challenges)
  Navigation.registerComponent('WALLET', () => Wallet)
}
