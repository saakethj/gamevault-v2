import { auth, db } from './firebase'

function App() {
  console.log('Firebase Auth:', auth)
  console.log('Firebase DB:', db)
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">GameVault</h1>
      </div>
    </div>
  )
}

export default App