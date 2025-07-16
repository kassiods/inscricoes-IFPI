import { useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({
    nome_equipe: '',
    responsavel: '',
    telefone: '',
    bairro: '',
    jogadores: Array(10).fill(''),
  })

  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target

    if (name.startsWith('jogador')) {
      const index = parseInt(name.replace('jogador', '')) - 1
      const newJogadores = [...form.jogadores]
      newJogadores[index] = value
      setForm({ ...form, jogadores: newJogadores })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const jogadoresFiltrados = form.jogadores.filter(j => j.trim() !== '')

    const res = await fetch('/api/inscricao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, jogadores: jogadoresFiltrados }),
    })

    const data = await res.json()

    if (res.ok) {
      setMessage({ type: 'success', text: data.message })
      setForm({
        nome_equipe: '',
        responsavel: '',
        telefone: '',
        bairro: '',
        jogadores: Array(10).fill(''),
      })
    } else {
      setMessage({ type: 'error', text: data.error || 'Erro desconhecido' })
    }

    setLoading(false)
  }

  return (
    <div className="container">
      <h1>Inscrição Campeonato IFPI</h1>

      {message && (
        <p className={message.type === 'error' ? 'error-msg' : 'success-msg'}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Nome da Equipe:</label><br />
        <input
          type="text"
          name="nome_equipe"
          value={form.nome_equipe}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Responsável:</label><br />
        <input
          type="text"
          name="responsavel"
          value={form.responsavel}
          onChange={handleChange}
        />
        <br /><br />

        <label>Telefone:</label><br />
        <input
          type="text"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
        />
        <br /><br />

        <label>Instituição/Bairro:</label><br />
        <input
          type="text"
          name="bairro"
          value={form.bairro}
          onChange={handleChange}
        />
        <br /><br />

        <label>Jogadores (10 nomes):</label><br />
        {form.jogadores.map((j, i) => (
          <input
            key={i}
            type="text"
            name={`jogador${i + 1}`}
            value={j}
            onChange={handleChange}
            placeholder={`Jogador ${i + 1}`}
          />
        ))}
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Inscrição'}
        </button>
      </form>

      <style jsx>{`
        .container {
          max-width: 700px;
          margin: 50px auto;
          padding: 20px;
          background-color: #121212;
          color: #a6f080;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          border-radius: 12px;
          box-shadow: 0 0 15px #4caf50aa;
          animation: fadeIn 1s ease;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
          font-size: 2.5rem;
          color: #7ed957;
          text-shadow: 0 0 8px #7ed957aa;
        }
        label {
          font-weight: 600;
          text-shadow: 0 0 4px #4caf50bb;
        }
        input {
          width: 100%;
          padding: 10px;
          border: 2px solid #4caf50;
          border-radius: 6px;
          background-color: #222;
          color: #a6f080;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        input:focus {
          outline: none;
          border-color: #7ed957;
          box-shadow: 0 0 8px #7ed957cc;
        }
        button {
          background-color: #4caf50;
          color: #121212;
          font-weight: 700;
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: background-color 0.3s ease;
          width: 100%;
          box-shadow: 0 0 12px #4caf50cc;
        }
        button:hover:not(:disabled) {
          background-color: #7ed957;
          box-shadow: 0 0 20px #7ed957dd;
        }
        button:disabled {
          background-color: #2e7d32;
          cursor: not-allowed;
          box-shadow: none;
        }
        .error-msg {
          background-color: #b71c1c;
          color: #fff;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          text-shadow: 0 0 5px #a00000;
          animation: shake 0.4s ease;
        }
        .success-msg {
          background-color: #2e7d32;
          color: #d0f0a0;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          text-shadow: 0 0 8px #7ed957;
          animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
