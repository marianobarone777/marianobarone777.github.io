import React, { useState } from 'react';
import foto from './fotoCV.jpg';
import experiencias from './experiencias';
import estudios from './estudios';
import aptitudes from './aptitudes';
import perfil from './perfil';
import generatePDF from './generatePDF'; // Importamos la funcion para generar PDF
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    await generatePDF();
    setIsGenerating(false);
  };

  return (
    <div className="App">
      <div className="fixed-container">
        <header className="header">
          <div className="header-content">
            <img src={foto} alt="Mariano Barone" className="foto" />
            <div className="header-text">
              <h1>Mariano Barone</h1>
              <p>Ingeniero en Informática | Project Manager</p>
              <div className="contacto-header">
                <p>Email: <a href="mailto:marianobarone@gmail.com">marianobarone@gmail.com</a></p>
                <p>
                  LinkedIn:{' '}
                  <a href="https://linkedin.com/in/mariano-barone-b5171338" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/mariano-barone
                  </a>
                </p>
              </div>
            </div>
            <button className="pdf-button" onClick={handleGeneratePDF} disabled={isGenerating}>
              {isGenerating ? 'Generando...' : 'Descargar PDF'}
            </button>
          </div>
        </header>
        <div className="tabs">
          <button
            className={activeTab === 'perfil' ? 'active' : ''}
            onClick={() => setActiveTab('perfil')}
          >
            Perfil Profesional
          </button>
          <button
            className={activeTab === 'experiencia' ? 'active' : ''}
            onClick={() => setActiveTab('experiencia')}
          >
            Experiencia Laboral
          </button>
          <button
            className={activeTab === 'estudios' ? 'active' : ''}
            onClick={() => setActiveTab('estudios')}
          >
            Estudios
          </button>
          <button
            className={activeTab === 'aptitudes' ? 'active' : ''}
            onClick={() => setActiveTab('aptitudes')}
          >
            Aptitudes
          </button>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'perfil' && (
          <section className="perfil">
            <ul>
              {perfil.map((parrafo, index) => (
                <li key={index}>{parrafo}</li>
              ))}
            </ul>
          </section>
        )}
        {activeTab === 'experiencia' && (
          <section className="experiencia">
            {experiencias.map((exp, index) => (
              <div key={index} className="experiencia-item">
                <strong>{exp.cargo} ({exp.fecha})</strong>
                <table className="experiencia-table">
                  <thead>
                    <tr>
                      <th>Tareas</th>
                      <th>Logros</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exp.tareas.map((tarea, i) => (
                      <tr key={i}>
                        <td>{tarea}</td>
                        <td>{exp.logros && exp.logros[i] ? exp.logros[i] : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </section>
        )}
        {activeTab === 'estudios' && (
          <section className="estudios">
            <ul>
              {estudios.map((estudio, index) => (
                <li key={index}>
                  <strong>{estudio.titulo}</strong>
                  {estudio.subtitulo && <p>{estudio.subtitulo}</p>}
                  {estudio.detalle && <p className="detalle">{estudio.detalle}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
        {activeTab === 'aptitudes' && (
          <section className="aptitudes">
            {Object.entries(aptitudes).map(([categoria, lista], catIndex) => (
              <div key={catIndex} className="categoria">
                <h3>{categoria}</h3>
                {lista.map((aptitud, index) => (
                  <div key={index} className="skill">
                    <span className="skill-name">{aptitud.nombre}</span>
                    <div className={`circles ${categoria.toLowerCase().replace(/\s+/g, '-')}`}>
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`circle ${i < aptitud.nivel ? 'filled' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default App;