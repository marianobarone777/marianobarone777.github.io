import { jsPDF } from 'jspdf';
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
const generatePDF = async () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let yPosition = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Función para verificar si hay espacio suficiente
  const checkPageBreak = (spaceNeeded) => {
    if (yPosition + spaceNeeded > 280) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // Primera página: Encabezado principal
  await addImageToPDF(doc, foto, pageWidth - margin - 25, 15, 25, 25); // Foto más pequeña y alineada a la derecha

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 58, 138); // Azul oscuro (#1E3A8A)
  doc.text('Mariano Barone', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139); // Gris oscuro (#64748B)
  doc.text('Ingeniero en Informática | Project Manager', margin, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Email: marianobarone@gmail.com', margin, yPosition);
  yPosition += 5;
  doc.text('LinkedIn: linkedin.com/in/mariano-barone-b5171338', margin, yPosition);
  yPosition += 10;

  // Perfil Profesional
  checkPageBreak(20);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 58, 138); // Azul oscuro
  doc.text('Perfil Profesional', margin, yPosition);
  yPosition += 2;
  doc.setLineWidth(0.3);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  perfil.forEach((parrafo) => {
    checkPageBreak(15);
    const lines = doc.splitTextToSize(parrafo, contentWidth);
    doc.text(lines, margin, yPosition, { align: 'justify', maxWidth:170, lineHeightFactor: 1.4 });
    yPosition += lines.length * 5 + 3;
  });

  // Experiencia Laboral
  yPosition += 5;
  checkPageBreak(20);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 58, 138);
  doc.text('Experiencia Laboral', margin, yPosition);
  yPosition += 2;
  doc.setLineWidth(0.3);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  experiencias.forEach((exp, index) => {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 58, 138);
    doc.text(`${exp.cargo} (${exp.fecha})`, margin, yPosition);
    yPosition += 6;

    // Tareas
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Tareas:', margin, yPosition);
    yPosition += 5;
    exp.tareas.forEach((tarea) => {
      checkPageBreak(10);
      const lines = doc.splitTextToSize(`• ${tarea}`, contentWidth - 5);
      doc.text(lines, margin + 5, yPosition, { align: 'justify', maxWidth:170, lineHeightFactor: 1.4 }); // Agregamos el max with para que quede justificado al mismo nivel que la linea
      yPosition += lines.length * 5;
    });
    yPosition += 3;

    // Logros
    if (exp.logros && exp.logros.length > 0) {
      checkPageBreak(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Logros:', margin, yPosition);
      yPosition += 5;
      exp.logros.forEach((logro) => {
        checkPageBreak(10);
        const lines = doc.splitTextToSize(`• ${logro}`, contentWidth - 5);
        doc.setFont('helvetica', 'italic');
        doc.text(lines, margin + 5, yPosition, { align: 'justify', maxWidth:170, lineHeightFactor: 1.4 });
        yPosition += lines.length * 5;
      });
      yPosition += 5;
    }
  });

  // Estudios
  checkPageBreak(20);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 58, 138);
  doc.text('Estudios', margin, yPosition);
  yPosition += 2;
  doc.setLineWidth(0.3);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  estudios.forEach((estudio) => {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.text(estudio.titulo, margin, yPosition);
    yPosition += 5;

    doc.setFont('helvetica', 'normal');
    if (estudio.subtitulo) {
      const lines = doc.splitTextToSize(estudio.subtitulo, contentWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 5;
    }
    if (estudio.detalle) {
      checkPageBreak(10);
      const lines = doc.splitTextToSize(estudio.detalle, contentWidth);
      doc.text(lines, margin, yPosition, { align: 'justify', maxWidth:170, lineHeightFactor: 1.4 });
      yPosition += lines.length * 5;
    }
    yPosition += 3;
  });

  // Aptitudes
  yPosition += 5;
  checkPageBreak(20);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 58, 138);
  doc.text('Aptitudes', margin, yPosition);
  yPosition += 2;
  doc.setLineWidth(0.3);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  Object.entries(aptitudes).forEach(([categoria, lista]) => {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.text(categoria, margin, yPosition);
    yPosition += 6;

    doc.setFont('helvetica', 'normal');
    lista.forEach((aptitud) => {
      checkPageBreak(10);
      const lines = doc.splitTextToSize(aptitud.nombre, contentWidth - 40); // Espacio para círculos
      doc.text(lines, margin + 5, yPosition);

      let xPosition = margin + 130;
      const circleRadius = 2;
      const circleSpacing = 5;
      for (let i = 0; i < 5; i++) {
        doc.setFillColor(i < aptitud.nivel ? 16 : 224, i < aptitud.nivel ? 185 : 224, i < aptitud.nivel ? 129 : 224); // Verde esmeralda (#10B981) o gris claro
        doc.circle(xPosition, yPosition - 1, circleRadius, 'F');
        xPosition += circleSpacing;
      }
      yPosition += lines.length * 5 + 2;
    });
    yPosition += 3;
  });

  // Guardar el PDF
  doc.save('Mariano_Barone_CV.pdf');
};

export default generatePDF;