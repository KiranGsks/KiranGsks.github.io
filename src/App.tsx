import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="app-shell">
          <main className="app-main">
            <AppRoutes />
          </main>
        </div>
      </HashRouter>
    </AuthProvider>
  )
}
