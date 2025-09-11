import frappe
from frappe.utils.pdf import get_pdf
from frappe.utils.file_manager import save_file
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
def get_mom_data(from_date=None, to_date=None):
    sql_query = """
    SELECT 
    name as mom_id,
    custom_date_of_mom as custom_date_of_mom,
    custom_order_name as custom_order_name,
    custom_order_number as custom_order_number
        
    FROM `tabTask`
    WHERE 1=1
    """
    
   
     # Build conditions dynamically
    if from_date and not to_date:
        sql_query += f" AND custom_date_of_mom >= '{from_date}'"
    elif to_date and not from_date:
        sql_query += f" AND custom_date_of_mom <= '{to_date}'"
    elif from_date and to_date:
        sql_query += f" AND custom_date_of_mom BETWEEN '{from_date}' AND '{to_date}'"
        
    data = frappe.db.sql(sql_query, as_dict=True)
    # Format dates
    for row in data:
        if row.get("custom_date_of_mom"):
            row["custom_date_of_mom"] = row["custom_date_of_mom"].strftime("%d-%m-%Y")

    return data