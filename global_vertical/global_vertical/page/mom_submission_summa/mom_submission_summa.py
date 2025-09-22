import frappe
from frappe.utils.pdf import get_pdf
from frappe.utils.file_manager import save_file
from frappe.utils import now
import base64

@frappe.whitelist()
def generate_pdf(html, page_name):
    """
    Convert given HTML to PDF using Frappe's default PDF engine
    and return a URL to open the PDF.
    """
    try:
        # Generate PDF
        pdf_content = get_pdf(html)

        # Save PDF in private files
        filename = f"{page_name}.pdf"
        file_doc = save_file(filename, pdf_content, None, None, is_private=0)

        # Return public URL
        return file_doc.file_url

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "PDF Generation Error")
        frappe.throw("An error occurred while generating the PDF.")
        
        
@frappe.whitelist()
def generate_and_save_pdf(html, page_name, from_date=None, to_date=None,service_engineer=None,branch=None):
    """Generate PDF and save as attachment with MOM Submission Summary record"""
    try:
        # Generate PDF
        if not from_date or not to_date:
            frappe.msgprint("Both From Date and To Date are required to generate and save the PDF.")
            return  

        # Create new MOM Submission Summary record
        doc = frappe.new_doc("MOM Submission Summary")
        doc.from_date = from_date
        doc.to_date = to_date
        doc.service_engineer = service_engineer
        doc.branch = branch
        doc.save(ignore_permissions=True)

        html = html.replace('<td class="docname" colspan="2" style="text-align: center;"></td>',
    f'<td colspan="2" style="text-align: center;">{doc.name}</td>')

        pdf_content = get_pdf(html)

        # Create file attachment
        filename = f"{page_name}_{now()}.pdf"
        file_doc = save_file(
            filename,
            pdf_content,
            "MOM Submission Summary",
                doc.name,
        )

        # Update mom_report field
        doc.mom_report = file_doc.file_url
        doc.save(ignore_permissions=True)

        frappe.db.commit()

        return file_doc.file_url

    except Exception as e:
        frappe.log_error(message=frappe.get_traceback(), title="MOM PDF Generation Error")
        frappe.throw(f"An error occurred while generating and saving the PDF")
        


@frappe.whitelist()
def get_mom_data(from_date=None, to_date=None, service_engineer=None, branch =None):
    sql_query = """
    SELECT 
        name as mom_id,
        custom_date_of_mom as custom_date_of_mom,
        custom_order_name as custom_order_name,
        custom_order_number as custom_order_number,
        owner as service_engineer,
        custom_branch as branch
    FROM `tabTask`
    WHERE 1=1
    """
    
    # Date filters
    if from_date and not to_date:
        sql_query += f" AND custom_date_of_mom >= '{from_date}'"
    elif to_date and not from_date:
        sql_query += f" AND custom_date_of_mom <= '{to_date}'"
    elif from_date and to_date:
        sql_query += f" AND custom_date_of_mom BETWEEN '{from_date}' AND '{to_date}'"

    # Service Engineer filter
    if service_engineer:
        sql_query += f" AND owner = '{service_engineer}'"

    if branch:
        sql_query += f" AND custom_branch = '{branch}'"

    data = frappe.db.sql(sql_query, as_dict=True)

    # Format dates
    for row in data:
        if row.get("custom_date_of_mom"):
            row["custom_date_of_mom"] = row["custom_date_of_mom"].strftime("%d-%m-%Y")

    return data
