frappe.pages['mom-submission-summa'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'MOM Submission Summary Report',
		single_column: true
	});

	var from_date = ''
	var to_date = ''

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

    function check_filters(){
        if(from_date !== null && to_date !== null ){
            get_data(from_date, to_date);
        } else {
            get_data(null, null); // Pass null values to indicate filters are not applied
        }
    }

    function get_data(from_date, to_date){
        frappe.call({
            method: 'global_vertical.global_vertical.page.mom_submission_summa.mom_submission_summa.get_mom_data',
            args: {
                from_date: from_date,
                to_date: to_date
            },
            callback: function (response) {
                var momdata = response.message || [];

                // Remove old content
                $("#report_table").remove();

                // Render template and pass filters to HTML
                $(frappe.render_template("mom_submission_summa", {
                    momdata: momdata,
                    filter_from_date: formatDateForDisplay(from_date),
                    filter_to_date: formatDateForDisplay(to_date)
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
    get_data(null, null);

	// $(frappe.render_template("mom_submission_summa")).appendTo(page.body);

	// Add printer icon button
    page.set_primary_action(__('Print'), function() {
        generatePagePDF();
    }, 'printer');
}


function generatePagePDF() {
    // Capture the content of the page
    
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
            /* Keep only one border */
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
                
            /* Remove any ERPNext default borders */
            .print-format table, 
            .print-format th, 
            .print-format td {
                border: none !important;
            }
        }
				
        </style>
    `;

    // Final HTML to send for PDF generation
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

    frappe.call({
        method: "global_vertical.global_vertical.page.mom_submission_summa.mom_submission_summa.generate_pdf",
        args: {
            html: finalHTML,
            page_name: "MOM Submission Summary"
        },
        callback: function(r) {
            if (r.message) {
                window.open(r.message, '_blank');
            } else {
                frappe.msgprint(__('Failed to generate PDF.'));
            }
        }
    });
}
