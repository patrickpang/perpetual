import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import 'normalize.css'
import 'material-design-icons/iconfont/material-icons.css'
import { setup } from './helpers/styles'

setup()

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
