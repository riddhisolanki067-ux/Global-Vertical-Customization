import frappe
import json

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