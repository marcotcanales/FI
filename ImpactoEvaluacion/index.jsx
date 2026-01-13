import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, PenTool, Layout, Quote, ArrowRight, BarChart2, Users, AlertCircle } from 'lucide-react';

// --- COLORES Y CONFIGURACIÓN ---
const COLORS = {
  primary: '#0088FE',
  secondary: '#00C49F',
  tertiary: '#FFBB28',
  quaternary: '#FF8042',
  neutral: '#9ca3af',
  red: '#ef4444'
};

const PIE_COLORS = [COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.neutral];

// --- DATOS ---

// Datos Comparativos (Preguntas L)
const comparativeData = [
  {
    id: "L1",
    question: "Entendimiento profundo (más allá de fórmulas)",
    data: [
      { name: 'Trayectoria A', 'Totalmente de acuerdo': 66, 'De acuerdo': 0, 'Neutro': 33 },
      { name: 'Trayectoria B', 'Totalmente de acuerdo': 100, 'De acuerdo': 0, 'Neutro': 0 },
      { name: 'Trayectoria C', 'Totalmente de acuerdo': 0, 'De acuerdo': 100, 'Neutro': 0 },
    ],
    keys: ['Totalmente de acuerdo', 'De acuerdo', 'Neutro']
  },
  {
    id: "L2",
    question: "Análisis como proceso de idealización vs matemático",
    data: [
      { name: 'Trayectoria A', 'Totalmente de acuerdo': 33, 'De acuerdo': 33, 'Neutro': 33 },
      { name: 'Trayectoria B', 'Totalmente de acuerdo': 100, 'De acuerdo': 0, 'Neutro': 0 },
      { name: 'Trayectoria C', 'Totalmente de acuerdo': 50, 'De acuerdo': 50, 'Neutro': 0 },
    ],
    keys: ['Totalmente de acuerdo', 'De acuerdo', 'Neutro']
  },
  {
    id: "L3",
    question: "Capacidad de toma de decisiones (info incompleta)",
    data: [
      { name: 'Trayectoria A', 'Totalmente de acuerdo': 33, 'De acuerdo': 33, 'Neutro': 33 },
      { name: 'Trayectoria B', 'Totalmente de acuerdo': 50, 'De acuerdo': 50, 'Neutro': 0 },
      { name: 'Trayectoria C', 'Totalmente de acuerdo': 0, 'De acuerdo': 100, 'Neutro': 0 },
    ],
    keys: ['Totalmente de acuerdo', 'De acuerdo', 'Neutro']
  },
  {
    id: "L4",
    question: "Consideración de uso real y seguridad",
    data: [
      { name: 'Trayectoria A', 'Totalmente de acuerdo': 66, 'De acuerdo': 33, 'Neutro': 0 },
      { name: 'Trayectoria B', 'Totalmente de acuerdo': 100, 'De acuerdo': 0, 'Neutro': 0 },
      { name: 'Trayectoria C', 'Totalmente de acuerdo': 0, 'De acuerdo': 0, 'Neutro': 100 },
    ],
    keys: ['Totalmente de acuerdo', 'De acuerdo', 'Neutro']
  },
  {
    id: "L5",
    question: "Responsabilidad ética y seguridad pública",
    data: [
      { name: 'Trayectoria A', 'Totalmente de acuerdo': 100, 'De acuerdo': 0 },
      { name: 'Trayectoria B', 'Totalmente de acuerdo': 100, 'De acuerdo': 0 },
      { name: 'Trayectoria C', 'Totalmente de acuerdo': 50, 'De acuerdo': 50 },
    ],
    keys: ['Totalmente de acuerdo', 'De acuerdo']
  },
  {
    id: "L6",
    question: "Aplicabilidad a situaciones nuevas",
    data: [
      { name: 'Trayectoria A', 'Totalmente de acuerdo': 100, 'De acuerdo': 0 },
      { name: 'Trayectoria B', 'Totalmente de acuerdo': 100, 'De acuerdo': 0 },
      { name: 'Trayectoria C', 'Totalmente de acuerdo': 0, 'De acuerdo': 100 },
    ],
    keys: ['Totalmente de acuerdo', 'De acuerdo']
  },
  {
    id: "L7",
    question: "Percepción del Esfuerzo Requerido",
    data: [
      { name: 'Trayectoria A', 'Esfuerzo similar': 100, 'Mucho más esfuerzo': 0, 'Mucho menos esfuerzo': 0 },
      { name: 'Trayectoria B', 'Esfuerzo similar': 50, 'Mucho más esfuerzo': 50, 'Mucho menos esfuerzo': 0 },
      { name: 'Trayectoria C', 'Esfuerzo similar': 50, 'Mucho más esfuerzo': 0, 'Mucho menos esfuerzo': 50 },
    ],
    keys: ['Mucho más esfuerzo', 'Esfuerzo similar', 'Mucho menos esfuerzo']
  },
  {
    id: "L8",
    question: "Decisión de volver a elegir el método",
    data: [
      { name: 'Trayectoria A', 'Mismo método': 0, 'Tal vez cambiaría': 66, 'Cambiaría': 33 },
      { name: 'Trayectoria B', 'Mismo método': 100, 'Tal vez cambiaría': 0, 'Cambiaría': 0 },
      { name: 'Trayectoria C', 'Mismo método': 50, 'Tal vez cambiaría': 0, 'Cambiaría': 50 },
    ],
    keys: ['Mismo método', 'Tal vez cambiaría', 'Cambiaría']
  }
];

// Datos Trayectorias Individuales
const trajectoryData = {
  A: {
    title: "Trayectoria A - Solo Examen",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Estudiantes que optaron únicamente por la evaluación tradicional mediante exámenes.",
    pieCharts: [
      {
        title: "PA1 - Motivo para NO intentar el proyecto",
        data: [
          { name: 'Factor Tiempo', value: 66 },
          { name: 'Costumbre/Examen', value: 33 }
        ]
      }
    ],
    quotes: [
      {
        question: "PA2 - ¿Sentiste que perdiste oportunidad de desarrollar habilidades 'reales'?",
        responses: [
          "Al final sentí que era mejor opción el proyecto por la toma de decisiones y si volviera a haber la oportunidad escogería el proyecto",
          "Si, la verdad que sentí que mis compañeros que realizaron el proyecto pudieron trabajar de manera más cercana a lo que nos espera en un ambiente laboral",
          "Quizás sí pero el tiempo fue un factor"
        ]
      },
      {
        question: "PA3 - ¿El examen evaluó criterio o cálculo?",
        responses: [
          "El examen si tenía el mismo nivel de dificultad que el proyecto pero el factor tiempo... y la facilidad de obtener una mejor nota y tener retroalimentación era mejor en el proyecto",
          "No",
          "Capacidad de modelación"
        ]
      },
      {
        question: "OA1 - Reflexión sobre cambios al curso",
        responses: [
          "No cambiaría nada porque el desarrollo del curso estuvo bien explicado...",
          "Que si se da la opción de un proyecto sea como el del segundo parcial, elegir el modelo",
          "Creo que nada"
        ]
      }
    ]
  },
  B: {
    title: "Trayectoria B - Solo Proyecto",
    icon: <Layout className="w-6 h-6" />,
    description: "Estudiantes que realizaron proyectos individuales y grupales simulando un rol de consultor.",
    pieCharts: [
      {
        title: "PB1 - Carga de trabajo vs Exámenes",
        data: [
          { name: 'Inversión Alta (Más horas, más aprendizaje)', value: 100 }
        ]
      }
    ],
    quotes: [
      {
        question: "PB2 - Rol de Consultor vs Estudiante",
        responses: [
          "Si, sentí más que todo en el primer proyecto... hasta a otros ingenieros le preguntamos a ver su opinión.",
          "Sí. Con los proyectos sentí que ya no estaba pensando solo en la nota, sino en resolver un problema real.",
          "Si ya que realmente así es como vamos a diseñar, con los planos y la computadora, no como una evaluación",
          "Si, fue necesario empezar a revisar de una manera mas profunda para poder detectar si habia algun error."
        ]
      },
      {
        question: "PB3 - Motivación (Roles y Situaciones Reales)",
        responses: [
          "En motivación pues fue mejor... gran satisfacción cuando habían resultados viables.",
          "Me motivó más que un problema de libro porque se sentía real... ver la estructura en persona hizo que los planos y cálculos tuvieran sentido.",
          "Es una manera de ver las cosas más aplicadas.",
          "El hecho de que el proyecto se haya basado en una estructura que nosotros podemos ver hace que sienta mas motivación."
        ]
      },
      {
        question: "OB1 - Cambios sugeridos a la metodología",
        responses: [
          "Usaría el método de los Foros, del segundo parcial... había más orden y coordinación.",
          "Tal vez se podría incluir más tiempo para preguntas o discusión.",
          "La verdad que estoy muy satisfecho en cómo llevamos el curso",
          "Considero que fue una clase muy productiva... la combinación entre el STAAD y los calculos manuales fue excelente."
        ]
      }
    ]
  },
  C: {
    title: "Trayectoria C - Mixto (Examen y Proyecto)",
    icon: <PenTool className="w-6 h-6" />,
    description: "Estudiantes que experimentaron ambos métodos de evaluación durante el curso.",
    pieCharts: [
      {
        title: "PC1 - ¿Cuál generó mayor ansiedad/estrés?",
        data: [
          { name: 'El Examen', value: 50 },
          { name: 'El Proyecto', value: 50 }
        ]
      },
      {
        title: "PC2 - ¿Cuál obligó a entender la física real?",
        data: [
          { name: 'El Proyecto', value: 100 }
        ]
      },
      {
        title: "PC3 - ¿Cuál generó más orgullo?",
        data: [
          { name: 'El Proyecto', value: 100 }
        ]
      }
    ],
    quotes: [
      {
        question: "PC4 - Motivo del cambio de método",
        responses: [
          "En el primero hice examen porque vi que era mucho trabajo... En el segundo hice proyecto porque ya le entendía más a la clase.",
          "Hice El primer proyecto pero no hice el segundo, principalmente por mi computadora."
        ]
      },
      {
        question: "OC1 - Cambios sugeridos a la metodología",
        responses: [
          "Nada, todo me pareció bien explicado a pesar que fuera una clase bien analítica.",
          "Más tiempo para hacer el primer proyecto."
        ]
      }
    ]
  }
};

// --- COMPONENTES AUXILIARES ---

const QuoteCard = ({ text }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500 mb-3 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-2">
      <Quote size={20} className="text-indigo-300 min-w-[20px]" />
      <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">"{text}"</p>
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
    {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

// --- COMPONENTE PRINCIPAL ---

const App = () => {
  const [activeTab, setActiveTab] = useState('comparative');
  const [selectedQuestion, setSelectedQuestion] = useState(comparativeData[0].id);

  const renderContent = () => {
    if (activeTab === 'comparative') {
      const currentQData = comparativeData.find(d => d.id === selectedQuestion);

      return (
        <div className="animate-in fade-in duration-500">
          <SectionHeader 
            title="Análisis Comparativo (Preguntas L)" 
            subtitle="Comparación de percepciones entre las tres trayectorias de aprendizaje."
          />
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            {/* Selector de Pregunta */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona una métrica para comparar:</label>
              <select 
                value={selectedQuestion} 
                onChange={(e) => setSelectedQuestion(e.target.value)}
                className="w-full md:w-1/2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer"
              >
                {comparativeData.map(q => (
                  <option key={q.id} value={q.id}>{q.id} - {q.question}</option>
                ))}
              </select>
            </div>

            {/* Gráfico */}
            <div className="h-[400px] w-full mt-4">
              <h3 className="text-center font-semibold text-gray-800 mb-4">{currentQData.question}</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={currentQData.data}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} unit="%" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                    cursor={{fill: 'transparent'}}
                  />
                  <Legend />
                  {currentQData.keys.map((key, index) => (
                    <Bar 
                      key={key} 
                      dataKey={key} 
                      stackId="a" 
                      fill={
                        key.includes("Totalmente") || key.includes("Mismo") ? COLORS.secondary :
                        key.includes("De acuerdo") || key.includes("Similar") ? COLORS.primary :
                        key.includes("Neutro") || key.includes("Tal vez") ? COLORS.neutral :
                        key.includes("Cambiaría") || key.includes("menos") ? COLORS.red :
                        COLORS.quaternary
                      } 
                      animationDuration={1500}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
               <AlertCircle className="text-blue-600 mt-1 flex-shrink-0" size={20}/>
               <div>
                 <h4 className="font-semibold text-blue-900">Observación Clave</h4>
                 <p className="text-blue-800 text-sm">
                   {selectedQuestion === "L1" && "La Trayectoria B (Solo Proyecto) muestra un 100% de acuerdo total en el entendimiento profundo, superando a la opción de solo examen."}
                   {selectedQuestion === "L5" && "Tanto la Trayectoria A como la B sienten una responsabilidad ética total (100%), sugiriendo que ambos métodos transmiten la gravedad de la ingeniería."}
                   {selectedQuestion === "L7" && "Perciben el esfuerzo de manera distinta: Para el grupo de Proyecto (B), la mitad sintió que fue 'Mucho más esfuerzo', mientras que para el examen fue 'Similar'."}
                   {selectedQuestion === "L8" && "El 100% de los estudiantes de Proyecto volverían a elegir su método. En contraste, el 99% de los de Examen cambiaría o duda de su decisión."}
                   {!["L1", "L5", "L7", "L8"].includes(selectedQuestion) && "Analiza cómo varía la confianza y la percepción según el método de evaluación elegido."}
                 </p>
               </div>
            </div>
          </div>
        </div>
      );
    } else {
      const data = trajectoryData[activeTab];
      return (
        <div className="animate-in slide-in-from-right duration-500">
           <div className="flex items-center gap-3 mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
              {data.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
              <p className="text-gray-500">{data.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráficos de Pastel */}
            <div className="space-y-6">
              {data.pieCharts.map((chart, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BarChart2 size={18} className="text-indigo-500"/>
                    {chart.title}
                  </h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chart.data}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {chart.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>

            {/* Citas y Respuestas Abiertas */}
            <div className="space-y-6">
              {data.quotes.map((q, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-4 text-lg">{q.question}</h3>
                  <div className="space-y-2">
                    {q.responses.map((resp, i) => (
                      <QuoteCard key={i} text={resp} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
      {/* Header */}
      <header className="bg-indigo-700 text-white pt-10 pb-20 px-4 md:px-8 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2 opacity-80">
            <Users size={20} />
            <span className="text-sm font-medium tracking-wide uppercase">Estudio de Caso Educativo</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Impacto de la Evaluación</h1>
          <p className="text-xl text-indigo-100 max-w-2xl">
            Comparativa de aprendizaje entre Exámenes, Proyectos y Modelos Mixtos en Ingeniería Estructural.
            <span className="block text-sm mt-2 opacity-75">(n=9 Estudiantes)</span>
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 -mt-10">
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 flex flex-wrap md:flex-nowrap gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('comparative')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'comparative' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <BarChart2 size={18} />
            Comparativa (L)
          </button>
          <button
            onClick={() => setActiveTab('A')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'A' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <BookOpen size={18} />
            Trayectoria A
          </button>
          <button
            onClick={() => setActiveTab('B')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'B' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Layout size={18} />
            Trayectoria B
          </button>
          <button
            onClick={() => setActiveTab('C')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'C' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <PenTool size={18} />
            Trayectoria C
          </button>
        </div>

        {/* Dynamic Content */}
        {renderContent()}

      </main>
    </div>
  );
};

export default App;