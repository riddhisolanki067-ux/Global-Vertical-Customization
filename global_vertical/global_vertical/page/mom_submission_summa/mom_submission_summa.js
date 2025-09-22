frappe.pages['mom-submission-summa'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'MOM Submission Summary Report',
		single_column: true
	});

	var from_date = ''
	var to_date = ''
    var service_engineer = ''
    var branch = ''

	let f_date = page.add_field({
        label: 'From Date',
        fieldtype: 'Date',
        fieldname: 'from_date',
        change() {
            from_date = f_date.get_value()
            check_filters()
        }
    });

	let t_date = page.add_field({
        label: 'To Date',
        fieldtype: 'Date',
        fieldname: 'to_date',
        change() {
            to_date = t_date.get_value()
            check_filters()
        }
    });

    let se_field = page.add_field({
        label: 'Service Engineer',
        fieldtype: 'Link',
        options: 'User',
        fieldname: 'service_engineer',
        change() {
            service_engineer = se_field.get_value()
            check_filters()
        }
    });

    let b_field = page.add_field({
        label: 'Branch',
        fieldtype: 'Link',
        options: 'Branch',
        fieldname: 'branch',
        change() {
            branch = b_field.get_value()
            check_filters()
        }
    });

    function check_filters(){
        if(from_date !== null && to_date !== null  && service_engineer !== null && branch !== null){
            get_data(from_date, to_date, service_engineer, branch);
        } else {
            get_data(null, null, null, null); // Pass null values to indicate filters are not applied
        }
    }

    function get_data(from_date, to_date, service_engineer, branch){
        frappe.call({
            method: 'global_vertical.global_vertical.page.mom_submission_summa.mom_submission_summa.get_mom_data',
            args: {
                from_date: from_date,
                to_date: to_date,
                service_engineer: service_engineer,
                branch: branch
            },
            callback: function (response) {
                var momdata = response.message || [];

                // Remove old content
                $("#report_table").remove();

                // Render template and pass filters to HTML
                $(frappe.render_template("mom_submission_summa", {
                    momdata: momdata,
                    filter_from_date: formatDateForDisplay(from_date),
                    filter_to_date: formatDateForDisplay(to_date),
                    filter_branch: branch
                })).appendTo(page.body);

                console.log("Filtered data:", response.message);
            }
        })
    }  

    // Utility function to format date from YYYY-MM-DD → DD-MM-YYYY
    function formatDateForDisplay(dateStr) {
        if (!dateStr) return "";
        let parts = dateStr.split("-");
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    get_data(null, null, null, null); // Initial load without filters

	// $(frappe.render_template("mom_submission_summa")).appendTo(page.body);

	// Add Print Button
    page.set_primary_action(__('Print'), function() {
        generatePagePDF(false, from_date, to_date, service_engineer, branch); // Open in new tab
    }, 'printer');

    // Add Download Button
    page.set_secondary_action(__('Download'), function() {
        generatePagePDF(true, from_date, to_date, service_engineer, branch); // Download directly
    });

}

function generatePagePDF(isDownload = false, from_date = null, to_date = null, service_engineer = null, branch = null) {
    const pageContent = document.querySelector('#report_table').outerHTML;

    // Capture styles (ERPNext default + page styles)
    let styles = `
        <link rel="stylesheet" type="text/css" href="/assets/frappe/css/print_format.css">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
            body {
                font-family: 'Roboto', Arial, sans-serif;
            }
            table {
                table-layout:fixed;
                border-collapse: collapse;
                width: 100%;
            }
            table, th, td {
                font-size: 12px;
            }
            @media print {
                table, th, td {
                    border: 1px solid black !important;
                    border-collapse: collapse !important;
                }
                table, th, td {
                font-size: 12px;
                border: 1px solid black;
                padding: 8px; /* Added padding */
                    text-align: left;
                }
                .print-format table,
                .print-format th,
                .print-format td {
                    border: none !important;
                }
            }
        </style>
    `;

    const finalHTML = `
        <html>
        <head>
            <meta charset="UTF-8">
            ${styles}
        </head>
        <body>
            ${pageContent}
        </body>
        </html>
    `;

   



    // Freeze UI while processing
    frappe.dom.freeze(__('Generating PDF... Please wait'));

    if (isDownload) {
        frappe.call({
            method: "global_vertical.global_vertical.page.mom_submission_summa.mom_submission_summa.generate_and_save_pdf",
            args: {
                html: finalHTML,
                page_name: "MOM Submission Summary",
                from_date: from_date,
                to_date: to_date,
                service_engineer: service_engineer,
                branch: branch
            },
            callback: function (r) {
                frappe.dom.unfreeze();

                if (r.message) {
                    const file_url = r.message;

                    // Force download
                    const a = document.createElement('a');
                    a.href = file_url;
                    a.download = "MOM_Submission_Summary.pdf";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    frappe.show_alert({
                        message: __("PDF has been generated and saved successfully!"),
                        indicator: "green"
                    }, 5);
                } else {
                    frappe.msgprint(__('Failed to generate and save PDF.'));
                }
            },
            error: function () {
                frappe.dom.unfreeze();
                frappe.msgprint(__('An error occurred while generating the PDF.'));
            }
        });

    } else {
        frappe.call({
            method: "global_vertical.global_vertical.page.mom_submission_summa.mom_submission_summa.generate_pdf",
            args: {
                html: finalHTML,
                page_name: "MOM Submission Summary"
            },
            callback: function (r) {
                frappe.dom.unfreeze();

                if (r.message) {
                    window.open(r.message, '_blank');
                } else {
                    frappe.msgprint(__('Failed to generate PDF for printing.'));
                }
            },
            error: function () {
                frappe.dom.unfreeze();
                frappe.msgprint(__('An error occurred while generating the PDF for print.'));
            }
        });
    }
}
