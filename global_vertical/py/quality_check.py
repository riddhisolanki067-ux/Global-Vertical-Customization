import frappe
import json
import base64
import requests
from frappe.utils.pdf import get_pdf

@frappe.whitelist()
def get_installation_checklist_status(task_name):
    try:
        # Get parent document by task field, not by name
        parent_docs = frappe.get_all("Installation Checklist Status", 
                                   filters={"task": task_name}, 
                                   limit=1)
        
        if parent_docs:
            parent_doc = frappe.get_doc("Installation Checklist Status", parent_docs[0].name)
            return parent_doc.installation_checklist
        return []
        
    except Exception as e:
        frappe.log_error("Error: While Getting Installation Checklist", str(e))
        return []

@frappe.whitelist()
def set_installation_checklist_status(task_name, selected_items):
    try:
        parent_docs = frappe.get_all("Installation Checklist Status", 
                                   filters={"task": task_name}, 
                                   limit=1)
        
        if parent_docs:
            parent_doc = frappe.get_doc("Installation Checklist Status", parent_docs[0].name)
            # Clear existing child table entries
            parent_doc.installation_checklist = []
        else:
            parent_doc = frappe.new_doc("Installation Checklist Status")
            parent_doc.task = task_name
        
        for item in json.loads(selected_items):
            parent_doc.append("installation_checklist", {
                "code": item["code"],
                "work_description": item["work_description"],
                "checkbox_type": item["checkbox_type"],
                "is_checked": item["is_checked"]
            })
            
        parent_doc.save(ignore_permissions=True)
        frappe.db.commit()
        
        return "Success"
    
    except Exception as e:
        frappe.log_error("Error: While Setting Installation Checklist", str(e))
        return str(e)
    
    
@frappe.whitelist()
def download_and_attach_task_pdf(task_name):
    """
    Directly download PDF from Frappe's default endpoint
    and attach it to Task without re-generating.
    """
    try:
        # Build the URL dynamically
        site_url = frappe.utils.get_url()
        pdf_url = f"{site_url}/api/method/frappe.utils.print_format.download_pdf"
        params = {
            "doctype": "Task",
            "name": task_name,
            "format": "MOM TABLE",
            "no_letterhead": 1,
            "letterhead": "No"
        }

        # Get the PDF file directly from endpoint
        response = requests.get(pdf_url, params=params, cookies={'sid': frappe.session.sid})
        response.raise_for_status()
        
        pdf_content = response.content
        filename = f"{task_name}.pdf"

        # Save as attachment
        frappe.get_doc({
            "doctype": "File",
            "file_name": filename,
            "attached_to_doctype": "Task",
            "attached_to_name": task_name,
            "is_private":0,
            "content": pdf_content
        }).insert(ignore_permissions=True)

        # Return base64 to frontend for direct browser download
        return base64.b64encode(pdf_content).decode('utf-8')

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Task PDF Download Error")
        raise e


import subprocess

@frappe.whitelist()
def check_wkhtml_version():
    try:
        return subprocess.getoutput("wkhtmltopdf --version")
    except Exception as e:
        return f"Error: {e}"
