import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { nome_equipe, responsavel, telefone, bairro, jogadores } = req.body

  if (!nome_equipe) {
    return res.status(400).json({ error: 'Nome da equipe é obrigatório.' })
  }

  const { data, error } = await supabase
    .from('inscricoes_futsal')
    .insert([
      {
        nome_equipe,
        responsavel,
        telefone,
        bairro,
        jogadores,
      },
    ])

  if (error) return res.status(500).json({ error: error.message })

  return res.status(200).json({ message: 'Inscrição realizada com sucesso!', data })
}
