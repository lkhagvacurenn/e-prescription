'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('doctor')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, role })
})

const data = await res.json()

if (res.ok) {
  localStorage.setItem('token', data.token)
  router.push(`/${role}`)  // жишээ нь /doctor/page гэх мэт
} else {
  setError(data.message || 'Login failed')
}

  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6' // Tailwind bg-gray-100
    }}>
      <div style={{
        backgroundColor: '#ffffff', // Tailwind bg-white
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Tailwind shadow-lg
        borderRadius: '0.5rem', // Tailwind rounded-lg
        padding: '2rem', // Tailwind p-8
        width: '100%',
        maxWidth: '28rem' // Tailwind max-w-md
      }}>
        <h1 style={{
          fontSize: '1.5rem', // Tailwind text-2xl
          fontWeight: '700', // Tailwind font-bold
          marginBottom: '1.5rem', // Tailwind mb-6
          textAlign: 'center',
          color: '#1f2937' // Tailwind text-gray-800
        }}>
          Нэвтрэх
        </h1>
        {error && (
          <p style={{
            marginBottom: '1rem', // Tailwind mb-4
            color: '#ef4444', // Tailwind text-red-500
            fontSize: '0.875rem', // Tailwind text-sm
            textAlign: 'center'
          }}>
            {error}
          </p>
        )}

        <form
          onSubmit={handleLogin}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem' // Tailwind space-y-4
          }}
        >
          <input
            type="email"
            placeholder="И-мэйл"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem 1rem', // Tailwind px-4 py-2
              border: '1px solid #d1d5db', // Tailwind border-gray-300
              borderRadius: '0.5rem', // Tailwind rounded-lg
              outline: 'none',
              color:'#000'
            }}
          />

          <input
            type="password"
            placeholder="Нууц үг"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem 1rem', // Tailwind px-4 py-2
              border: '1px solid #d1d5db', // Tailwind border-gray-300
              borderRadius: '0.5rem', // Tailwind rounded-lg
              outline: 'none',
              color:'#000'
            }}
          />

          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 1rem', // Tailwind px-4 py-2
              border: '1px solid #d1d5db', // Tailwind border-gray-300
              borderRadius: '0.5rem', // Tailwind rounded-lg
              outline: 'none',
              color:'#000'
            }}
          >
            <option value="doctor">Эмч</option>
            <option value="patient">Өвчтөн</option>
            <option value="pharmacy">Эмийн сан</option>
          </select>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#2563eb', // Tailwind bg-blue-600
              color: '#ffffff', // Tailwind text-white
              padding: '0.5rem', // Tailwind py-2
              borderRadius: '0.5rem', // Tailwind rounded-lg
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Нэвтрэх
          </button>
        </form>

        <div style={{
          marginTop: '1rem', // Tailwind mt-4
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.875rem', // Tailwind text-sm
            color: '#4b5563' // Tailwind text-gray-600
          }}>
            Бүртгэлгүй юу?
            <button
              style={{
                color: '#2563eb', // Tailwind text-blue-600
                textDecoration: 'none',
                marginLeft: '0.25rem', // Tailwind ml-1
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => router.push('/register')}
            >
              Бүртгүүлэх
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}