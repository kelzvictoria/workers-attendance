import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const doc = new jsPDF();

const generatePDF = async (entity, data, d) => {
    let tableColumn;
    let tableRows = [];

    switch (entity) {
        case "workers":
            tableColumn = ["", "Firstname", "Middlename", "Lastname", "Ministry Arms", "Role"]
            await data.forEach((d, i) => {
                const dd = [
                    i + 1,
                    d.first_name,
                    d.middle_name,
                    d.last_name,
                    d.ministry_arm.map(m => m, ", "),
                    d.role.map(r => r, ", "),
                ];
                tableRows.push(dd);
            });
            break;

        case "ministry_arms":
            tableColumn = ["", "Ministry", "Directorate", "Ministry Head"];
            await data.forEach((d, i) => {
                const dd = [
                    i + 1,
                    d.name,
                    d.directorate_details.name,
                    d.director_details.first_name + " " + d.director_details.last_name,
                ];
                tableRows.push(dd);
            });
            break;

        case "directorates":
            tableColumn = ["", "Name", "Head"];
            await data.forEach((d, i) => {
                const dd = [
                    i + 1,
                    d.name,
                    d.director_details.first_name + " " + d.director_details.last_name,
                ];
                tableRows.push(dd);
            });
            break;

        case "attendance":
            tableColumn = ["", "Worker", "Ministry", "Time In"];
            await data.forEach((d, i) => {
                const dd = [
                    i + 1,
                    d.worker_details.first_name + " " + d.worker_details.last_name,
                    d.worker_details.ministry_arm.map(m => m, ", "),
                    new Date(`${d.date_created}`).toLocaleTimeString()
                ];
                tableRows.push(dd);
            });
            break;

        case "attendance-range":
            tableColumn = ["", "Worker", "Ministry", "Date", "Time In"];
            await data.forEach((d, i) => {
                const dd = [
                    i + 1,
                    d.worker_details.first_name + " " + d.worker_details.last_name,
                    d.worker_details.ministry_arm.map(m => m, ", "),
                    new Date(`${d.date_created}`).toLocaleDateString(),
                    new Date(`${d.date_created}`).toLocaleTimeString()
                ];
                tableRows.push(dd);
            });
            break;
        default:
            tableColumn = [];
            tableRows = [];
            break;

    }

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        margin: {
            top: 20
        },
        // styles: {
        //     marginTop: 30
        // }
    })

    const date = //new Date().toISOString()
    d.
    //split("T")[0].
    split("-");
    const dateStr = date[2] + "-" +  date[1] + "-" + date[0];

    doc.text("Workers", 14, 15);
    doc.save(`workers_meeting_${dateStr}.pdf`);
};

export default generatePDF;