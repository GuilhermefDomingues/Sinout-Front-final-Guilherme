import { HistoryItem, Patient, Rule } from "./types";

export const mockPatient: Patient = {
    _id: 2,
    nome: "Private Patient",
    id_cuidador: 11,
    data_cadastro: "2025-11-19T19:04:58.969+00:00",
    status: true,
    informacoes_adicionais: null,
    foto_perfil: null,
    criado_por: "self"
};

export const mockRules: Rule[] = [
    {
        _id: "691de9f5404192217234036e",
        id_usuario: 1,
        emocao: "neutral",
        nivel_intensidade: "superior",
        percentual_minimo: 50,
        mensagem: "Estou me sentindo calmo e focado.",
        prioridade: 1,
        ativo: true,
        data_criacao: "2025-11-19T16:01:57.353+00:00",
        data_atualizacao: null
    },
    {
        _id: "691de9f5404192217234036f",
        id_usuario: 1,
        emocao: "happy",
        nivel_intensidade: "superior",
        percentual_minimo: 70,
        mensagem: "Estou muito feliz!",
        prioridade: 2,
        ativo: true,
        data_criacao: "2025-11-20T10:00:00.000+00:00",
        data_atualizacao: null
    },
    {
        _id: "691de9f54041922172340370",
        id_usuario: 1,
        emocao: "sad",
        nivel_intensidade: "superior",
        percentual_minimo: 60,
        mensagem: "Preciso de atenção.",
        prioridade: 2,
        ativo: true,
        data_criacao: "2025-11-20T11:00:00.000+00:00",
        data_atualizacao: null
    }
];

// Helper to generate mock history data for the last 24 hours
const generateMockHistory = (): HistoryItem[] => {
    const items: HistoryItem[] = [];
    const now = new Date();
    const emotionsList = ['neutral', 'happy', 'sad', 'angry', 'fear', 'surprise', 'disgust'];

    for (let i = 0; i < 50; i++) {
        const time = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000);
        const dominant = emotionsList[Math.floor(Math.random() * emotionsList.length)];
        const percent = 50 + Math.random() * 50;

        items.push({
            _id: `hist_${i}`,
            id_usuario: 1,
            nome_paciente: "Dashboard",
            timestamp: time.toISOString(),
            emocoes_detectadas: {
                angry: dominant === 'angry' ? percent : Math.random() * 10,
                disgust: dominant === 'disgust' ? percent : Math.random() * 10,
                fear: dominant === 'fear' ? percent : Math.random() * 10,
                happy: dominant === 'happy' ? percent : Math.random() * 10,
                neutral: dominant === 'neutral' ? percent : Math.random() * 10,
                sad: dominant === 'sad' ? percent : Math.random() * 10,
                surprise: dominant === 'surprise' ? percent : Math.random() * 10,
            },
            emocao_dominante: dominant,
            percentual_dominante: percent,
            mensagem_disparada: Math.random() > 0.7 ? "Mensagem automática disparada" : null,
            regra_acionada_id: Math.random() > 0.7 ? 1 : null
        });
    }
    return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate mock data on module load (server-side) - this will be the same for SSR
export const mockHistory = generateMockHistory();
