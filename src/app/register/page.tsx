'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { message } from 'antd'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('patient')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    })

    const data = await res.json()

    if (res.ok) {
      router.push('/login')
    } else {
      setError(data.message || 'Register failed')
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
        backgroundColor: '#000', // Tailwind bg-white
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
          Бүртгүүлэх
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
          onSubmit={handleRegister}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem' // Tailwind space-y-4
          }}
        >
          <input
            type="text"
            placeholder="Нэр"
            value={name}
            onChange={e => setName(e.target.value)}
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
            <option value="patient">Өвчтөн</option>
            <option value="doctor">Эмч</option>
            <option value="pharmacy">Эмийн сан</option>
          </select>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#16a34a', // Tailwind bg-green-600
              color: '#000', // Tailwind text-white
              padding: '0.5rem', // Tailwind py-2
              borderRadius: '0.5rem', // Tailwind rounded-lg
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Бүртгүүлэх
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
            Аль хэдийн бүртгэлтэй юу?
            <button
              style={{
                color: '#2563eb', // Tailwind text-blue-600
                textDecoration: 'none',
                marginLeft: '0.25rem', // Tailwind ml-1
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => router.push('/login')}
            >
              Нэвтрэх
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}