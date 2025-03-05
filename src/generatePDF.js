import { jsPDF } from 'jspdf';
//import html2canvas from 'html2canvas';
import foto from './fotoCV.jpg';
import experiencias from './experiencias';
import estudios from './estudios';
import aptitudes from './aptitudes';
import perfil from './perfil';

// Función para agregar la imagen al PDF (base64)
const addImageToPDF = (doc, imgSrc, x, y, width, height) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      doc.addImage(img, 'JPEG', x, y, width, height);
      resolve();
    };
  });
};

// Función principal para generar el PDF
const generatePDF = async (aptitudesRef) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let yPosition = 10;


  // Encabezado del PDF
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Mariano Barone', 20, yPosition);
  yPosition += 8;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Ingeniero en Informática | Project Manager', 20, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.text('Email: marianobarone@gmail.com', 20, yPosition);
  yPosition += 5;
  doc.text('LinkedIn: linkedin.com/in/mariano-barone-b5171338', 20, yPosition);
  yPosition += 10;

  // Foto
  await addImageToPDF(doc, foto, 160, 10, 30, 30);

  // Perfil Profesional
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Perfil Profesional', 20, yPosition);
  yPosition += 1.5; // Espacio fijo para título

  // Línea divisoria
  doc.setLineWidth(0.3);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  perfil.forEach((parrafo) => {
    const lines = doc.splitTextToSize(parrafo, 170);
    doc.text(lines, 20, yPosition, { align: 'justify', maxWidth: 170, lineHeightFactor: 1.3 }); // Justifica dentro de 170 mm    
    yPosition += lines.length * 4; // Aumentamos de 5mm a 6mm por línea para más espacio
    yPosition += 3; // Espacio extra entre párrafos (aumentado de 2mm a 3mm)
  });
  yPosition += 5;

  // Experiencia Laboral
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Experiencia Laboral', 20, yPosition);
  yPosition += 1.5; // Espacio fijo para título
  // Línea divisoria
  doc.setLineWidth(0.3);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  experiencias.forEach((exp) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 255)
    doc.text(`${exp.cargo} (${exp.fecha})`, 20, yPosition);
    yPosition += 6; // Espacio fijo para subtítulo
    doc.setTextColor(0, 0, 0);

    // Tareas
    doc.setFont('helvetica', 'bold');
    doc.text('Tareas:', 20, yPosition);

    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    exp.tareas.forEach((tarea) => {
        const lines = doc.splitTextToSize(`• ${tarea}`, 165); // Cambio de "-" a "•"
        doc.text(lines, 20, yPosition, { align: 'justify', maxWidth: 170, lineHeightFactor: 1.3 }); // Justifica dentro de 170 mm
      yPosition += lines.length * 5; // Aumentamos de 4mm a 5mm por línea
    });
    yPosition += 3;

    // Logros (si existen)
    if (exp.logros && exp.logros.length > 0) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.text('Logros:', 20, yPosition);
      yPosition += 5;
      exp.logros.forEach((logro) => {
        const lines = doc.splitTextToSize(`• ${logro}`, 165); // Cambio de "-" a "•"
        doc.setFont('helvetica', 'italic');
        doc.text(lines, 20, yPosition, { align: 'justify', maxWidth: 170, lineHeightFactor: 1.3 }); // Justifica dentro de 170 mm

        yPosition += lines.length * 5; // Aumentamos de 4mm a 5mm por línea
      });
      yPosition += 3;
    }
    yPosition += 2; // Espacio entre experiencias
  });

  // Estudios
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Estudios', 20, yPosition);
  yPosition += 1.5; // Espacio fijo para título
  // Línea divisoria
  doc.setLineWidth(0.3);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  estudios.forEach((estudio) => {
    doc.setFont('helvetica', 'bold');
    doc.text(estudio.titulo, 20, yPosition);
    yPosition += 5; // Espacio fijo para subtítulo

    doc.setFont('helvetica', 'normal');
    if (estudio.subtitulo) {
      const lines = doc.splitTextToSize(estudio.subtitulo, 165);
      doc.text(lines, 20, yPosition);
      yPosition += lines.length * 5; // Aumentamos de 4mm a 5mm por línea
    }
    if (estudio.detalle) {
      const lines = doc.splitTextToSize(estudio.detalle, 165);
      doc.text(lines, 20, yPosition, { align: 'justify', maxWidth: 170, lineHeightFactor: 1.3 }); // Justifica dentro de 170 mm
      yPosition += lines.length * 5; // Aumentamos de 4mm a 5mm por línea
    }
    yPosition += 3; // Espacio extra entre estudios (aumentado de 2mm a 3mm)
  });

  // Aptitudes (nueva página y captura)
  doc.addPage();
  yPosition = 20;

  // Aptitudes (con círculos en lugar de texto para el nivel)
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Aptitudes', 20, yPosition);
  yPosition += 1.5;

  doc.setLineWidth(0.3);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  Object.entries(aptitudes).forEach(([categoria, lista]) => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.text(categoria, 20, yPosition);
    yPosition += 5;

    doc.setFont('helvetica', 'normal');
    lista.forEach((aptitud) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      // Imprimir el nombre de la aptitud
      const lines = doc.splitTextToSize(aptitud.nombre, 130); // Reducimos el ancho para dejar espacio a los círculos
      doc.text(lines, 25, yPosition);

      // Dibujar círculos para el nivel
      let xPosition = 100; // Posición inicial para los círculos (ajustado para que quepan)
      const circleRadius = 2; // Radio de los círculos
      const circleSpacing = 5; // Espacio entre círculos

      for (let i = 0; i < 5; i++) {
        if (i < aptitud.nivel) {
          doc.circle(xPosition, yPosition - 1, circleRadius, 'F'); // Círculo relleno
        } else {
          doc.circle(xPosition, yPosition - 1, circleRadius, 'S'); // Círculo vacío
        }
        xPosition += circleSpacing; // Avanza para el siguiente círculo
      }

      yPosition += lines.length * 5; // Ajusta según el número de líneas
    });
    yPosition += 3; // Espacio entre categorías
  });
  
  // Guardar el PDF
  doc.save('Mariano_Barone_CV.pdf');
};

export default generatePDF;