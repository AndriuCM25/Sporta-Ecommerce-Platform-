import { Ruler, Info, Footprints, Edit3, Move, Phone, Repeat, Activity, Users, Lightbulb, Clock, Shirt } from 'lucide-react'

const SizeGuide = () => {
  return (
    <>
      <style>{`
        .size-page {
          background: #080808;
          min-height: 100vh;
          padding: 6rem 2rem 4rem;
          font-family: 'DM Sans', sans-serif;
        }
        .size-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .size-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .size-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          letter-spacing: 3px;
          color: #fff;
          margin: 0 0 1rem 0;
        }
        .size-title span {
          color: #FF4500;
        }
        .size-subtitle {
          color: rgba(255,255,255,0.5);
          font-size: 1.1rem;
          margin: 0;
        }
        .size-section {
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 2rem;
        }
        .size-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 2px;
          color: #fff;
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .size-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1.5rem;
          overflow-x: auto;
          display: block;
        }
        .size-table table {
          width: 100%;
          min-width: 600px;
        }
        .size-table th,
        .size-table td {
          padding: 1rem;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .size-table th {
          background: rgba(255,69,0,0.1);
          color: #FF4500;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .size-table td {
          color: rgba(255,255,255,0.8);
          font-size: 0.95rem;
        }
        .size-table tr:hover td {
          background: rgba(255,255,255,0.02);
        }
        .highlight-box {
          background: rgba(255,69,0,0.1);
          border-left: 4px solid #FF4500;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 1.5rem;
        }
        .highlight-box p {
          margin: 0 0 0.5rem 0;
          color: rgba(255,255,255,0.8);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .highlight-box p:last-child {
          margin-bottom: 0;
        }
        .highlight-box strong {
          color: #FF4500;
        }
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .tip-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .tip-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }
        .tip-title {
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
        }
        .tip-desc {
          color: rgba(255,255,255,0.6);
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .size-page {
            padding: 5rem 1.5rem 3rem;
          }
          .size-section {
            padding: 1.5rem;
          }
          .size-table {
            font-size: 0.85rem;
          }
        }
      `}</style>

      <div className="size-page">
        <div className="size-container">
          {/* Header */}
          <div className="size-header">
            <h1 className="size-title">
              GUÍA DE <span>TALLAS</span>
            </h1>
            <p className="size-subtitle">
              Encuentra tu talla perfecta con nuestras tablas de medidas
            </p>
          </div>

          {/* Calzado Hombre */}
          <div className="size-section">
            <h2 className="size-section-title">
              <Ruler size={24} />
              Calzado Hombre
            </h2>
            
            <div className="size-table">
              <table>
                <thead>
                  <tr>
                    <th>US</th>
                    <th>UK</th>
                    <th>EUR</th>
                    <th>CM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>6</td>
                    <td>5.5</td>
                    <td>38.5</td>
                    <td>24.0</td>
                  </tr>
                  <tr>
                    <td>6.5</td>
                    <td>6</td>
                    <td>39</td>
                    <td>24.5</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>6.5</td>
                    <td>40</td>
                    <td>25.0</td>
                  </tr>
                  <tr>
                    <td>7.5</td>
                    <td>7</td>
                    <td>40.5</td>
                    <td>25.5</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>7.5</td>
                    <td>41</td>
                    <td>26.0</td>
                  </tr>
                  <tr>
                    <td>8.5</td>
                    <td>8</td>
                    <td>42</td>
                    <td>26.5</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>8.5</td>
                    <td>42.5</td>
                    <td>27.0</td>
                  </tr>
                  <tr>
                    <td>9.5</td>
                    <td>9</td>
                    <td>43</td>
                    <td>27.5</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>9.5</td>
                    <td>44</td>
                    <td>28.0</td>
                  </tr>
                  <tr>
                    <td>10.5</td>
                    <td>10</td>
                    <td>44.5</td>
                    <td>28.5</td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>10.5</td>
                    <td>45</td>
                    <td>29.0</td>
                  </tr>
                  <tr>
                    <td>11.5</td>
                    <td>11</td>
                    <td>45.5</td>
                    <td>29.5</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>11.5</td>
                    <td>46</td>
                    <td>30.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Calzado Mujer */}
          <div className="size-section">
            <h2 className="size-section-title">
              <Ruler size={24} />
              Calzado Mujer
            </h2>
            
            <div className="size-table">
              <table>
                <thead>
                  <tr>
                    <th>US</th>
                    <th>UK</th>
                    <th>EUR</th>
                    <th>CM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>5</td>
                    <td>2.5</td>
                    <td>35</td>
                    <td>22.0</td>
                  </tr>
                  <tr>
                    <td>5.5</td>
                    <td>3</td>
                    <td>35.5</td>
                    <td>22.5</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>3.5</td>
                    <td>36</td>
                    <td>23.0</td>
                  </tr>
                  <tr>
                    <td>6.5</td>
                    <td>4</td>
                    <td>37</td>
                    <td>23.5</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>4.5</td>
                    <td>37.5</td>
                    <td>24.0</td>
                  </tr>
                  <tr>
                    <td>7.5</td>
                    <td>5</td>
                    <td>38</td>
                    <td>24.5</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>5.5</td>
                    <td>38.5</td>
                    <td>25.0</td>
                  </tr>
                  <tr>
                    <td>8.5</td>
                    <td>6</td>
                    <td>39</td>
                    <td>25.5</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>6.5</td>
                    <td>40</td>
                    <td>26.0</td>
                  </tr>
                  <tr>
                    <td>9.5</td>
                    <td>7</td>
                    <td>40.5</td>
                    <td>26.5</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>7.5</td>
                    <td>41</td>
                    <td>27.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cómo medir */}
          <div className="size-section">
            <h2 className="size-section-title">
              <Info size={24} />
              Cómo Medir Tu Pie
            </h2>
            
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon"><Ruler size={32} color="#FF4500" /></div>
                <h3 className="tip-title">1. Prepara los Materiales</h3>
                <p className="tip-desc">
                  Necesitas una hoja de papel, un lápiz y una regla o cinta métrica.
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon"><Footprints size={32} color="#FF4500" /></div>
                <h3 className="tip-title">2. Coloca el Pie</h3>
                <p className="tip-desc">
                  Párate sobre la hoja con el talón contra la pared. Usa calcetines si planeas usarlos.
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon"><Edit3 size={32} color="#FF4500" /></div>
                <h3 className="tip-title">3. Marca el Punto</h3>
                <p className="tip-desc">
                  Marca el punto más largo de tu pie (generalmente el dedo gordo).
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon"><Move size={32} color="#FF4500" /></div>
                <h3 className="tip-title">4. Mide la Longitud</h3>
                <p className="tip-desc">
                  Mide desde el talón hasta la marca. Usa la tabla para encontrar tu talla.
                </p>
              </div>
            </div>

            <div className="highlight-box">
              <p>
                <Lightbulb size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} color="#FF4500" />
                <strong>Consejo:</strong> Mide ambos pies y usa la medida del pie más grande.
              </p>
              <p>
                <Clock size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} color="#FF4500" />
                <strong>Mejor Momento:</strong> Mide tus pies al final del día cuando están más hinchados.
              </p>
              <p>
                <Shirt size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} color="#FF4500" />
                <strong>Con Calcetines:</strong> Si usarás calcetines deportivos, mídetelos puestos.
              </p>
            </div>
          </div>

          {/* Consejos adicionales */}
          <div className="size-section">
            <h2 className="size-section-title">
              <Info size={24} />
              Consejos para Elegir la Talla Correcta
            </h2>
            
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon"><Footprints size={32} color="#FF4500" /></div>
                <h3 className="tip-title">Espacio en la Punta</h3>
                <p className="tip-desc">
                  Debe haber aproximadamente 1 cm de espacio entre tu dedo más largo y la punta del zapato.
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon"><Activity size={32} color="#FF4500" /></div>
                <h3 className="tip-title">Tipo de Actividad</h3>
                <p className="tip-desc">
                  Para running, considera media talla más grande. Para basketball, elige tu talla exacta.
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon"><Repeat size={32} color="#FF4500" /></div>
                <h3 className="tip-title">Varía por Marca</h3>
                <p className="tip-desc">
                  Las tallas pueden variar ligeramente entre marcas. Consulta las especificaciones de cada producto.
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon"><Phone size={32} color="#FF4500" /></div>
                <h3 className="tip-title">¿Dudas?</h3>
                <p className="tip-desc">
                  Contáctanos por WhatsApp y te ayudaremos a elegir la talla perfecta para ti.
                </p>
              </div>
            </div>

            <div className="highlight-box">
              <p>
                <Repeat size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} color="#FF4500" />
                <strong>Cambios Gratis:</strong> Si la talla no te queda bien, puedes cambiarla sin costo 
                adicional dentro de los 30 días.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SizeGuide
