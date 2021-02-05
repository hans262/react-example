import { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

const Tensorflow = lazy(() => import('./tensorflow'))
const Test = lazy(() => import('./test/Test'))
const Reduxd = lazy(() => import('./reduxd'))
const Paperd = lazy(() => import('./paperd'))
const Rxjsd = lazy(() => import('./rxjsd'))
const Game = lazy(()=> import('./game'))

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={'路由加载中'}>
        <Switch>
          <Route exact path="/" component={Tensorflow} />
          <Route path="/tensorflow" component={Tensorflow} />
          <Route path="/test" component={Test} />
          <Route path="/reduxd" component={Reduxd} />
          <Route path="/paperd" component={Paperd} />
          <Route path="/rxjsd" component={Rxjsd} />
          <Route path="/game" component={Game} />

          <Redirect from="*" to="/tensorflow"></Redirect>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}