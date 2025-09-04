import { Button } from "@chakra-ui/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";
import { useSelector } from "react-redux";

const TodoPdf = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  //PDF forrm
  const handlePDFDownload = () => {
    const doc = new jsPDF();
    //title
    doc.setFontSize(18);
    doc.text(`My To-Do List`, 14, 20);

    //date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

    //Table
    const tableColumn = ["#", "Task", "Status", "Priority"];
    const tableRows = [];
    tasks.forEach((task, i) => {
      const row = [
        i + 1,
        task.text,
        task.completed ? "Completed" : "Pending",
        task.priority ? task.priority : "Low",
      ];
      tableRows.push(row);
    });
    autoTable(doc, {
      startY: 35,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { bottom: 25 }, // little space
    });

    //footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      //Page Number
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - 20,
        doc.internal.pageSize.getHeight() - 10
      );
      //Motivational quoate
      doc.setFontSize(11);
      doc.setTextColor(100);

      doc.text(
        `Small steps every day lead to big results`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    doc.save("To-Do list.pdf");
  };

  return (
    <Button
      ml={2}
      mr={2}
      color={"whiteAlpha.900"}
      bgGradient={"to-br"}
      gradientFrom={"green.500"}
      gradientTo={"teal.600"}
      borderRadius={'2xl'}
      _hover={{
        bgGradient:"to-r",
        gradientFrom:"blue.500",
        gradientTo:"purple.600",
        color:"whiteAlpha.800",
        fontWeight:"bolder"
      }}
      onClick={handlePDFDownload}
    >
      Download
    </Button>
  );
};

export default TodoPdf;
