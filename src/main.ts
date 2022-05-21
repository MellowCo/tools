import { createApp } from 'vue'
import App from './App.vue'
import router from '~/router'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

// 解决tailwind的reset样式冲突
// https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)

app.use(router)
app.mount('#app')
