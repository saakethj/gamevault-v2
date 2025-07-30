import { auth, db } from './firebase';
import Login from './pages/auth/Login';


function App() {
  console.log('Firebase Auth:', auth)
  console.log('Firebase DB:', db)
  
  return <Login />;
  
}

export default App