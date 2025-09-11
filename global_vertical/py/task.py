import frappe

@frappe.whitelist()
def get_session_user_initials(doc,method):
    """
    Get initials of the logged-in user based on first, middle, and last names.
    """
    try:
        if not doc.custom_s_no:
            # ---- STEP 1: Get session user's initials ----
            user_id = frappe.session.user

            user_doc = frappe.get_doc("User", user_id)

            # Helper function to get the first character safely
            def get_initial(name):
                return name[0].upper() if name and len(name) > 0 else ""

            # Generate initials
            initials = (
                get_initial(user_doc.first_name) +
                get_initial(user_doc.middle_name) +
                get_initial(user_doc.last_name)
            )
            
            # ---- STEP 2: Get current number from Auto Generation Data ----
            auto_gen = frappe.get_doc("Auto Generation Data", "Auto Generation Data")

            current_number = auto_gen.mom_s_no

            # If field is blank, start from 1234
            if not current_number:
                current_number = 1234
            else:
                current_number = int(current_number)

            # Generate the code
            code = f"{initials} {current_number}"

            # ---- STEP 3: Increment the number ----
            next_number = current_number + 1
            if next_number > 9999:  # reset after 9999
                next_number = 1234

            # Update the Auto Generation Data record
            auto_gen.mom_s_no = next_number
            auto_gen.save(ignore_permissions=True)
            frappe.db.commit()

            # ---- STEP 4: Update the Task record ----
            doc.custom_s_no = code
            
            return code


    except Exception as e:
        frappe.log_error(message=str(e), title="Get Session User Initials Error")
        return {
            "error": "Unable to fetch user initials",
            "details": str(e)
        }
