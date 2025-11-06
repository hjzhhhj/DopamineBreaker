import { Routes, Route } from 'react-router-dom'
import GlobalStyle from './styles/GlobalStyle'
import Layout from './components/Layout'
import Home from './pages/Home'
import Mission from './pages/Mission'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App