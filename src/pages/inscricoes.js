import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Inscricoes() {
  const [inscricoes, setInscricoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchInscricoes() {
      const { data, error } = await supabase
        .from('inscricoes_futsal')
        .select('*')
        .order('data_inscricao', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setInscricoes(data)
      }
      setLoading(false)
    }

    fetchInscricoes()
  }, [])

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <style jsx>{`
          .loader-container {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #121212;
          }
          .loader {
            width: 50px;
            height: 50px;
            border: 6px solid #4caf50;
            border-top: 6px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    )

  if (error)
    return (
      <div className="error-container">
        <p>Erro: {error}</p>
        <style jsx>{`
          .error-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            color: #b71c1c;
            font-weight: bold;
            font-size: 1.2rem;
            background: #2c0a0a;
            border-radius: 8px;
            border: 1px solid #f5c6cb;
            text-align: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
        `}</style>
      </div>
    )

  return (
    <div className="container">
      <h1>Inscrições Recebidas</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Equipe</th>
              <th>Responsável</th>
              <th>Telefone</th>
              <th>Bairro</th>
              <th>Jogadores</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {inscricoes.map((inscricao) => (
              <tr key={inscricao.id}>
                <td>{inscricao.nome_equipe}</td>
                <td>{inscricao.responsavel || '-'}</td>
                <td>{inscricao.telefone || '-'}</td>
                <td>{inscricao.bairro || '-'}</td>
                <td>
                  <ul>
                    {inscricao.jogadores?.map((jogador, i) => (
                      <li key={i}>{jogador}</li>
                    ))}
                  </ul>
                </td>
                <td>{new Date(inscricao.data_inscricao).toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #121212;
          color: #a6f080;
          border-radius: 12px;
          box-shadow: 0 0 15px #4caf50aa;
          animation: fadeIn 1s ease;
        }
        h1 {
          text-align: center;
          color: #7ed957;
          margin-bottom: 30px;
          font-size: 2.4rem;
          text-shadow: 0 0 8px #7ed957aa;
        }
        .table-wrapper {
          overflow-x: auto;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }
        thead tr {
          background-color: #4caf50;
          color: #121212;
          font-weight: 700;
          user-select: none;
        }
        th, td {
          padding: 14px 16px;
          border-bottom: 1px solid #2c2c2c;
          vertical-align: top;
        }
        tbody tr:nth-child(even) {
          background-color: #1e1e1e;
        }
        tbody tr:hover {
          background-color: #306230;
          transition: background-color 0.3s ease;
          cursor: default;
        }
        ul {
          margin: 0;
          padding-left: 18px;
          list-style-type: disc;
        }
        li {
          margin-bottom: 4px;
        }
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
      `}</style>
    </div>
  )
}
