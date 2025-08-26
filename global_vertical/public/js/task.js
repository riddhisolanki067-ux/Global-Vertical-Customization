
frappe.ui.form.on("Task", {
    refresh: (frm) => {
        installationCheckList(frm)
    },
    custom_downloadd: (frm) => {
        downloadChecklistHTML(frm)
    },
    custom_clear_table: (frm) => {
        clearChecklist(frm)
    },
})

function installationCheckList(frm) {
  const checklisthtml = `
    <div class="installation-checklist-container">
        <style>
            .installation-checklist-container {
                font-family: Arial, Helvetica, sans-serif;
                background: #fff;
                color: #222;
                padding: 18px;
                box-sizing: border-box;
            }
            .installation-checklist-container * {
                box-sizing: border-box;
            }
            .checklist-container {
                max-width: 1000px;
                margin: 0 auto;
               
            }
            .checklist-top-note {
                background: #f4f7fb;
                padding: 10px;
                border-radius: 4px;
                margin-bottom: 10px;
                font-size: 13px;
            }
            .checklist-title {
                background: #0b66b3;
                color: #fff;
                padding: 10px 12px;
                border-radius: 4px;
                font-weight: 700;
                font-size: 13px;
                margin-bottom: 8px;
                text-align: center;
            }
            .checklist-two-col {
                display: flex;
                gap: 12px;
            }
            .checklist-panel {
                flex: 1;
                border: 1px solid #c9dcea;
                border-radius: 4px;
                overflow: hidden;
            }
            .checklist-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
            }
            .checklist-table th,
            .checklist-table td {
                border-bottom: 1px solid #e6eef7;
                padding: 6px 8px;
                text-align: left;
            }
            .checklist-table th {
                background: #f0f8ff;
                color: #17364a;
                font-weight: 700;
                font-size: 12px;
            }
            .checklist-table .code {
                width: 60px;
                font-weight: 700;
                color: #0b63a8;
            }
            .checklist-table .checkbox-col {
                text-align: center;
                width: 52px;
            }
            .checklist-table input[type="checkbox"] {
                transform: scale(1.05);
                margin: 0;
                vertical-align: middle;
            }
            @media (max-width: 800px) {
                .checklist-two-col {
                    flex-direction: column;
                }
            }
        </style>
        
        <div class="checklist-container">
            <div class="checklist-top-note">
                As per our meeting & discussions today at site, please complete the following Pending Civil & Electrical works marked as ...NO... An early action shall be highly appreciated.
            </div>
            
            <div class="checklist-title">CIVIL WORKS REQUIRED TO BE COMPLETED BEFORE START OF INSTALLATION</div>
            
            <div class="checklist-two-col">
                <!-- LEFT COLUMN -->
                <div class="checklist-panel">
                    <table class="checklist-table">
                        <thead>
                            <tr>
                                <th class="code">CODE</th>
                                <th>LIST OF WORKS</th>
                                <th class="checkbox-col">N/A</th>
                                <th class="checkbox-col">YES</th>
                                <th class="checkbox-col">NO</th>
                            </tr>
                        </thead>
                        <tbody>
                                        <tr>
                                            <td class="code">C1</td>
                                            <td class="work-desc">Lift Shaft, Pit, Over Head 100% Ready as per GAD</td>
                                            <td class="checkbox-col">
                                                <input type="checkbox" data-code="C1" data-type="na" data-work="Lift Shaft, Pit, Over Head 100% Ready as per GAD">
                                            </td>
                                            <td class="checkbox-col">
                                                <input type="checkbox" data-code="C1" data-type="yes" data-work="Lift Shaft, Pit, Over Head 100% Ready as per GAD">
                                            </td>
                                            <td class="checkbox-col">
                                                <input type="checkbox" data-code="C1" data-type="no" data-work="Lift Shaft, Pit, Over Head 100% Ready as per GAD">
                                            </td>
                                        </tr>
                                        <tr>
                                              <td class="code">C2</td>
                                              <td class="work-desc">Safe, Clear & Unobstructed Access to Lift Shaft / Pit</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C2" data-type="na"  data-work="Safe, Clear & Unobstructed Access to Lift Shaft / Pit"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C2" data-type="yes" data-work="Safe, Clear & Unobstructed Access to Lift Shaft / Pit"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C2" data-type="no"  data-work="Safe, Clear & Unobstructed Access to Lift Shaft / Pit"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C3</td>
                                              <td class="work-desc">Storage Space marked up with paint available near Lift Shaft for unloading Heavy Material (Guide Rails, Machine, Filler Weights, Car CW Frames etc.)</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C3" data-type="na"  data-work="Storage Space marked up with paint available near Lift Shaft for unloading Heavy Material (Guide Rails, Machine, Filler Weights, Car CW Frames etc.)"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C3" data-type="yes" data-work="Storage Space marked up with paint available near Lift Shaft for unloading Heavy Material (Guide Rails, Machine, Filler Weights, Car CW Frames etc.)"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C3" data-type="no"  data-work="Storage Space marked up with paint available near Lift Shaft for unloading Heavy Material (Guide Rails, Machine, Filler Weights, Car CW Frames etc.)"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C4</td>
                                              <td class="work-desc">Pit Depth available as per GAD</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C4" data-type="na"  data-work="Pit Depth available as per GAD"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C4" data-type="yes" data-work="Pit Depth available as per GAD"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C4" data-type="no"  data-work="Pit Depth available as per GAD"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C5</td>
                                              <td class="work-desc">Pit Floor designed to take Load reactions as per GAD</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C5" data-type="na"  data-work="Pit Floor designed to take Load reactions as per GAD"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C5" data-type="yes" data-work="Pit Floor designed to take Load reactions as per GAD"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C5" data-type="no"  data-work="Pit Floor designed to take Load reactions as per GAD"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C6</td>
                                              <td class="work-desc">Pit – Clean (No Malba / Debris)</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C6" data-type="na"  data-work="Pit – Clean (No Malba / Debris)"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C6" data-type="yes" data-work="Pit – Clean (No Malba / Debris)"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C6" data-type="no"  data-work="Pit – Clean (No Malba / Debris)"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C7</td>
                                              <td class="work-desc">Pit – Water Free and Dry</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C7" data-type="na"  data-work="Pit – Water Free and Dry"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C7" data-type="yes" data-work="Pit – Water Free and Dry"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C7" data-type="no"  data-work="Pit – Water Free and Dry"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C8</td>
                                              <td class="work-desc">Pit – Water Proofing of Lift Pit Provided</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C8" data-type="na"  data-work="Pit – Water Proofing of Lift Pit Provided"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C8" data-type="yes" data-work="Pit – Water Proofing of Lift Pit Provided"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C8" data-type="no"  data-work="Pit – Water Proofing of Lift Pit Provided"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C9</td>
                                              <td class="work-desc">Any extra Rebar (steel) projecting in Lift Shaft removed</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C9" data-type="na"  data-work="Any extra Rebar (steel) projecting in Lift Shaft removed"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C9" data-type="yes" data-work="Any extra Rebar (steel) projecting in Lift Shaft removed"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C9" data-type="no"  data-work="Any extra Rebar (steel) projecting in Lift Shaft removed"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C10</td>
                                              <td class="work-desc">Hoisting Beams / Hooks available as per GAD</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C10" data-type="na"  data-work="Hoisting Beams / Hooks available as per GAD"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C10" data-type="yes" data-work="Hoisting Beams / Hooks available as per GAD"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C10" data-type="no"  data-work="Hoisting Beams / Hooks available as per GAD"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C11</td>
                                              <td class="work-desc">Smoke Vent 450mm x 450mm in OH provided as per GAD</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C11" data-type="na"  data-work="Smoke Vent 450mm x 450mm in OH provided as per GAD"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C11" data-type="yes" data-work="Smoke Vent 450mm x 450mm in OH provided as per GAD"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C11" data-type="no"  data-work="Smoke Vent 450mm x 450mm in OH provided as per GAD"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C12</td>
                                              <td class="work-desc">FFL Marking on all Floors Provided</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C12" data-type="na"  data-work="FFL Marking on all Floors Provided"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C12" data-type="yes" data-work="FFL Marking on all Floors Provided"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C12" data-type="no"  data-work="FFL Marking on all Floors Provided"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C13</td>
                                              <td class="work-desc">Plastering in Lift Shaft Completed</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C13" data-type="na"  data-work="Plastering in Lift Shaft Completed"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C13" data-type="yes" data-work="Plastering in Lift Shaft Completed"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C13" data-type="no"  data-work="Plastering in Lift Shaft Completed"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C14</td>
                                              <td class="work-desc">Rope Cutouts in Floor Slab in MR</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C14" data-type="na"  data-work="Rope Cutouts in Floor Slab in MR"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C14" data-type="yes" data-work="Rope Cutouts in Floor Slab in MR"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C14" data-type="no"  data-work="Rope Cutouts in Floor Slab in MR"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C15</td>
                                              <td class="work-desc">Safe Staircase, Doors in MR</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C15" data-type="na"  data-work="Safe Staircase, Doors in MR"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C15" data-type="yes" data-work="Safe Staircase, Doors in MR"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C15" data-type="no"  data-work="Safe Staircase, Doors in MR"></td>
                                          </tr>
                                          <tr>
                                              <td class="code">C16</td>
                                              <td class="work-desc">Cutout in Front Wall on Top Floor for fixing Controller size and position as per GAD. Position – LEFT / RIGHT</td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C16" data-type="na"  data-work="Cutout in Front Wall on Top Floor for fixing Controller size and position as per GAD. Position – LEFT / RIGHT"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C16" data-type="yes" data-work="Cutout in Front Wall on Top Floor for fixing Controller size and position as per GAD. Position – LEFT / RIGHT"></td>
                                              <td class="checkbox-col"><input type="checkbox" data-code="C16" data-type="no"  data-work="Cutout in Front Wall on Top Floor for fixing Controller size and position as per GAD. Position – LEFT / RIGHT"></td>
                                          </tr>
                                         
                            <!-- Add more rows for C2-C17 following the same pattern -->
                        </tbody>
                    </table>
                </div>
                
                <!-- RIGHT COLUMN -->
                <div class="checklist-panel">
                    <table class="checklist-table">
                        <thead>
                            <tr>
                                <th class="code">CODE</th>
                                <th>LIST OF WORKS</th>
                                <th class="checkbox-col">N/A</th>
                                <th class="checkbox-col">YES</th>
                                <th class="checkbox-col">NO</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr>
                                <td class="code">C17</td>
                                <td class="work-desc">Cutout with 50 mm Pipe on Top Floor for Taking Wiring / Cables (Behind both Controller bottom & MCB Box bottom)</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C17" data-type="na"  data-work="Cutout with 50 mm Pipe on Top Floor for Taking Wiring / Cables (Behind both Controller bottom & MCB Box bottom)"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C17" data-type="yes" data-work="Cutout with 50 mm Pipe on Top Floor for Taking Wiring / Cables (Behind both Controller bottom & MCB Box bottom)"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C17" data-type="no"  data-work="Cutout with 50 mm Pipe on Top Floor for Taking Wiring / Cables (Behind both Controller bottom & MCB Box bottom)"></td>
                            </tr>

                            <tr>
                                <td class="code">C18</td>
                                <td class="work-desc">White Washing / Painting Lift Shaft</td>
                                <td class="checkbox-col">
                                    <input type="checkbox" data-code="C18" data-type="na" data-work="White Washing / Painting Lift Shaft">
                                </td>
                                <td class="checkbox-col">
                                    <input type="checkbox" data-code="C18" data-type="yes" data-work="White Washing / Painting Lift Shaft">
                                </td>
                                <td class="checkbox-col">
                                    <input type="checkbox" data-code="C18" data-type="no" data-work="White Washing / Painting Lift Shaft">
                                </td>
                            </tr>
                            <tr>
                                <td class="code">C19</td>
                                <td class="work-desc">Scaffolding & Safety Baricading provided</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C19" data-type="na"  data-work="Scaffolding & Safety Baricading provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C19" data-type="yes" data-work="Scaffolding & Safety Baricading provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C19" data-type="no"  data-work="Scaffolding & Safety Baricading provided"></td>
                            </tr>
                            <tr>
                                <td class="code">C20</td>
                                <td class="work-desc">Lockable Store Room available Near Lift Shaft (Rain water & weather protected)</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C20" data-type="na"  data-work="Lockable Store Room available Near Lift Shaft (Rain water & weather protected)"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C20" data-type="yes" data-work="Lockable Store Room available Near Lift Shaft (Rain water & weather protected)"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C20" data-type="no"  data-work="Lockable Store Room available Near Lift Shaft (Rain water & weather protected)"></td>
                            </tr>
                            <tr>
                                <td class="code">C21</td>
                                <td class="work-desc">Door Lintel on Every Floor available</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C21" data-type="na"  data-work="Door Lintel on Every Floor available"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C21" data-type="yes" data-work="Door Lintel on Every Floor available"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C21" data-type="no"  data-work="Door Lintel on Every Floor available"></td>
                            </tr>
                            <tr>
                                <td class="code">C22</td>
                                <td class="work-desc">Door Lintel height as per GAD</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C22" data-type="na"  data-work="Door Lintel height as per GAD"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C22" data-type="yes" data-work="Door Lintel height as per GAD"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C22" data-type="no"  data-work="Door Lintel height as per GAD"></td>
                            </tr>
                            <tr>
                                <td class="code">C23</td>
                                <td class="work-desc">Front Entrance Walls all Floors as per GAD</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C23" data-type="na"  data-work="Front Entrance Walls all Floors as per GAD"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C23" data-type="yes" data-work="Front Entrance Walls all Floors as per GAD"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C23" data-type="no"  data-work="Front Entrance Walls all Floors as per GAD"></td>
                            </tr>
                            <tr>
                                <td class="code">C24</td>
                                <td class="work-desc">Door Opening Full Width at GF available</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C24" data-type="na"  data-work="Door Opening Full Width at GF available"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C24" data-type="yes" data-work="Door Opening Full Width at GF available"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C24" data-type="no"  data-work="Door Opening Full Width at GF available"></td>
                            </tr>
                            <tr>
                                <td class="code">C25</td>
                                <td class="work-desc">Suitable Notch in Sill Fixing area Provided</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C25" data-type="na"  data-work="Suitable Notch in Sill Fixing area Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C25" data-type="yes" data-work="Suitable Notch in Sill Fixing area Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C25" data-type="no"  data-work="Suitable Notch in Sill Fixing area Provided"></td>
                            </tr>
                            <tr>
                                <td class="code">C26</td>
                                <td class="work-desc">Cut Out for LOP on Front Walls Provided</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C26" data-type="na"  data-work="Cut Out for LOP on Front Walls Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C26" data-type="yes" data-work="Cut Out for LOP on Front Walls Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C26" data-type="no"  data-work="Cut Out for LOP on Front Walls Provided"></td>
                            </tr>
                            <tr>
                                <td class="code">C27</td>
                                <td class="work-desc">Supply of M/C Support Beams Completed</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C27" data-type="na"  data-work="Supply of M/C Support Beams Completed"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C27" data-type="yes" data-work="Supply of M/C Support Beams Completed"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C27" data-type="no"  data-work="Supply of M/C Support Beams Completed"></td>
                            </tr>
                            <tr>
                                <td class="code">C28</td>
                                <td class="work-desc">Marking of Cutouts for M/C Support Beam</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C28" data-type="na"  data-work="Marking of Cutouts for M/C Support Beam"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C28" data-type="yes" data-work="Marking of Cutouts for M/C Support Beam"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C28" data-type="no"  data-work="Marking of Cutouts for M/C Support Beam"></td>
                            </tr>
                            <tr>
                                <td class="code">C29</td>
                                <td class="work-desc">Cutouts for M/C Support Beams Provided</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C29" data-type="na"  data-work="Cutouts for M/C Support Beams Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C29" data-type="yes" data-work="Cutouts for M/C Support Beams Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C29" data-type="no"  data-work="Cutouts for M/C Support Beams Provided"></td>
                            </tr>
                            <tr>
                                <td class="code">C30</td>
                                <td class="work-desc">Grouting of M/C Support Beams Completed</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C30" data-type="na"  data-work="Grouting of M/C Support Beams Completed"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C30" data-type="yes" data-work="Grouting of M/C Support Beams Completed"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C30" data-type="no"  data-work="Grouting of M/C Support Beams Completed"></td>
                            </tr>
                            <tr>
                                <td class="code">C31</td>
                                <td class="work-desc">Plastering of Walls & Roof in MR Completed</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C31" data-type="na"  data-work="Plastering of Walls & Roof in MR Completed"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C31" data-type="yes" data-work="Plastering of Walls & Roof in MR Completed"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C31" data-type="no"  data-work="Plastering of Walls & Roof in MR Completed"></td>
                            </tr>
                            <tr>
                                <td class="code">C32</td>
                                <td class="work-desc">White Washing / Painting in MR Completed</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C32" data-type="na"  data-work="White Washing / Painting in MR Completed"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C32" data-type="yes" data-work="White Washing / Painting in MR Completed"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C32" data-type="no"  data-work="White Washing / Painting in MR Completed"></td>
                            </tr>
                            <tr>
                                <td class="code">C33</td>
                                <td class="work-desc">Rain Water Protection provided on Top Floor especially on Terrace Floor for Doors & Controller</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C33" data-type="na"  data-work="Rain Water Protection provided on Top Floor especially on Terrace Floor for Doors & Controller"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C33" data-type="yes" data-work="Rain Water Protection provided on Top Floor especially on Terrace Floor for Doors & Controller"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C33" data-type="no"  data-work="Rain Water Protection provided on Top Floor especially on Terrace Floor for Doors & Controller"></td>
                            </tr>
                            <tr>
                                <td class="code">C34</td>
                                <td class="work-desc">Rain water Protection provided on Landing Doors when opening towards outside building</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C34" data-type="na"  data-work="Rain water Protection provided on Landing Doors when opening towards outside building"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C34" data-type="yes" data-work="Rain water Protection provided on Landing Doors when opening towards outside building"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C34" data-type="no"  data-work="Rain water Protection provided on Landing Doors when opening towards outside building"></td>
                            </tr>

                            <!-- Add more rows for C19-C34 following the same pattern -->
                        </tbody>
                    </table>
                </div>
            </div>

            <div style="margin-top:10px" class="checklist-title">ELECTRICAL WORKS REQUIRED BEFORE START OF INSTALLATION</div>

            <div class="checklist-two-col">
                <!-- LEFT COLUMN -->
                <div class="checklist-panel">
                    <table class="checklist-table">
                        <thead>
                            <tr>
                                <th class="code">CODE</th>
                                <th>LIST OF WORKS</th>
                                <th class="checkbox-col">N/A</th>
                                <th class="checkbox-col">YES</th>
                                <th class="checkbox-col">NO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="code">E1</td>
                                <td class="work-desc">Permanent Lights in Lift Shaft provided as per GAD</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E1" data-type="na" data-work="Permanent Lights in Lift Shaft provided as per GAD"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E1" data-type="yes" data-work="Permanent Lights in Lift Shaft provided as per GAD"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E1" data-type="no" data-work="Permanent Lights in Lift Shaft provided as per GAD"></td>
                            </tr>
                            <tr>
                                <td class="code">E2</td>
                                <td class="work-desc">Earthing on Steel Scaffolding provided (Two Points Pit & OH)</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E2" data-type="na" data-work="Earthing on Steel Scaffolding provided (Two Points Pit & OH)"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E2" data-type="yes" data-work="Earthing on Steel Scaffolding provided (Two Points Pit & OH)"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E2" data-type="no" data-work="Earthing on Steel Scaffolding provided (Two Points Pit & OH)"></td>
                            </tr>
                            <tr>
                                <td class="code">E3</td>
                                <td class="work-desc">Earthing Brackets near Controller Provided</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E3" data-type="na" data-work="Earthing Brackets near Controller Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E3" data-type="yes" data-work="Earthing Brackets near Controller Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E3" data-type="no" data-work="Earthing Brackets near Controller Provided"></td>
                            </tr>
                            <tr>
                                <td class="code">E4</td>
                                <td class="work-desc">Exhaust Fan provided in Lift Shaft / MR</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E4" data-type="na" data-work="Exhaust Fan provided in Lift Shaft / MR"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E4" data-type="yes" data-work="Exhaust Fan provided in Lift Shaft / MR"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E4" data-type="no" data-work="Exhaust Fan provided in Lift Shaft / MR"></td>
                            </tr>
                            <tr>
                                <td class="code">E5</td>
                                <td class="work-desc">Double Earthing Strips / Wires from Earthing Pits connected to Earthing Brackets near Controller</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E5" data-type="na" data-work="Double Earthing Strips / Wires from Earthing Pits connected to Earthing Brackets near Controller"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E5" data-type="yes" data-work="Double Earthing Strips / Wires from Earthing Pits connected to Earthing Brackets near Controller"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E5" data-type="no" data-work="Double Earthing Strips / Wires from Earthing Pits connected to Earthing Brackets near Controller"></td>
                            </tr>
                            <tr>
                                <td class="code">E6</td>
                                <td class="work-desc">Danger Plate (440 V) on Controller / MR</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E6" data-type="na" data-work="Danger Plate (440 V) on Controller / MR"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E6" data-type="yes" data-work="Danger Plate (440 V) on Controller / MR"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E6" data-type="no" data-work="Danger Plate (440 V) on Controller / MR"></td>
                            </tr>
                            <tr>
                                <td class="code">E7</td>
                                <td class="work-desc">Permanent Lights in Controller Area on Top Floor</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E7" data-type="na" data-work="Permanent Lights in Controller Area on Top Floor"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E7" data-type="yes" data-work="Permanent Lights in Controller Area on Top Floor"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E7" data-type="no" data-work="Permanent Lights in Controller Area on Top Floor"></td>
                            </tr>
                            <tr>
                                <td class="code">E8</td>
                                <td class="work-desc">Separate & Dedicated 2 Nos Earthing Pits Provided for Lift</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E8" data-type="na" data-work="Separate & Dedicated 2 Nos Earthing Pits Provided for Lift"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E8" data-type="yes" data-work="Separate & Dedicated 2 Nos Earthing Pits Provided for Lift"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E8" data-type="no" data-work="Separate & Dedicated 2 Nos Earthing Pits Provided for Lift"></td>
                            </tr>

                          

                        </tbody>
                    </table>
                </div>
                
                <!-- RIGHT COLUMN -->
                <div class="checklist-panel">
                    <table class="checklist-table">
                        <thead>
                            <tr>
                                <th class="code">CODE</th>
                                <th>LIST OF WORKS</th>
                                <th class="checkbox-col">N/A</th>
                                <th class="checkbox-col">YES</th>
                                <th class="checkbox-col">NO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="code">E9</td>
                                <td class="work-desc">Single Phase Power Switch / Socket Provided</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E9" data-type="na" data-work="Single Phase Power Switch / Socket Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E9" data-type="yes" data-work="Single Phase Power Switch / Socket Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E9" data-type="no" data-work="Single Phase Power Switch / Socket Provided"></td>
                            </tr>
                            <tr>
                                <td class="code">E10</td>
                                <td class="work-desc">3 Phase Power + MCB & RCCB as per GAD</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E10" data-type="na" data-work="3 Phase Power + MCB & RCCB as per GAD"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E10" data-type="yes" data-work="3 Phase Power + MCB & RCCB as per GAD"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E10" data-type="no" data-work="3 Phase Power + MCB & RCCB as per GAD"></td>
                            </tr>
                            <tr>
                                <td class="code">E11</td>
                                <td class="work-desc">MCB box provided with cover as per GAD</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E11" data-type="na" data-work="MCB box provided with cover as per GAD"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E11" data-type="yes" data-work="MCB box provided with cover as per GAD"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E11" data-type="no" data-work="MCB box provided with cover as per GAD"></td>
                            </tr>
                            <tr>
                                <td class="code">E12</td>
                                <td class="work-desc">Permanent Lights in Machine Room provided</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E12" data-type="na" data-work="Permanent Lights in Machine Room provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E12" data-type="yes" data-work="Permanent Lights in Machine Room provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E12" data-type="no" data-work="Permanent Lights in Machine Room provided"></td>
                            </tr>
                            <tr>
                                <td class="code">E13</td>
                                <td class="work-desc">Electrical Fire Extinguisher near controller Provided</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E13" data-type="na" data-work="Electrical Fire Extinguisher near controller Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E13" data-type="yes" data-work="Electrical Fire Extinguisher near controller Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E13" data-type="no" data-work="Electrical Fire Extinguisher near controller Provided"></td>
                            </tr>
                            <tr>
                                <td class="code">E14</td>
                                <td class="work-desc">Exhaust Fan provided in Lift Shaft / MR</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E14" data-type="na" data-work="Exhaust Fan provided in Lift Shaft / MR"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E14" data-type="yes" data-work="Exhaust Fan provided in Lift Shaft / MR"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E14" data-type="no" data-work="Exhaust Fan provided in Lift Shaft / MR"></td>
                            </tr>
                            <tr>
                                <td class="code">E15</td>
                                <td class="work-desc">Louvers on Smoke Vent in Lift Shaft provided</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E15" data-type="na" data-work="Louvers on Smoke Vent in Lift Shaft provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E15" data-type="yes" data-work="Louvers on Smoke Vent in Lift Shaft provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E15" data-type="no" data-work="Louvers on Smoke Vent in Lift Shaft provided"></td>
                            </tr>
                            <tr>
                                <td class="code">E16</td>
                                <td class="work-desc">Louvers provided on Exhaust Fan</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E16" data-type="na" data-work="Louvers provided on Exhaust Fan"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E16" data-type="yes" data-work="Louvers provided on Exhaust Fan"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="E16" data-type="no" data-work="Louvers provided on Exhaust Fan"></td>
                            </tr>

                          
                        </tbody>
                    </table>
                </div>
            </div>
            <div style="margin-top:10px" class="checklist-title">CIVIL WORKS REQUIRED DURING INSTALLATION</div>
            
            <div class="checklist-two-col">
                <!-- LEFT COLUMN -->
                <div class="checklist-panel">
                    <table class="checklist-table">
                        <thead>
                            <tr>
                                <th class="code">CODE</th>
                                <th>LIST OF WORKS</th>
                                <th class="checkbox-col">N/A</th>
                                <th class="checkbox-col">YES</th>
                                <th class="checkbox-col">NO</th>
                            </tr>
                        </thead>
                        <tbody>
                         <tr>
                            <td class="code">C35</td>
                            <td class="work-desc">Door Cladding / Architraves provided on all Floors</td>
                            <td class="checkbox-col"><input type="checkbox" data-code="C35" data-type="na" data-work="Door Cladding / Architraves provided on all Floors"></td>
                            <td class="checkbox-col"><input type="checkbox" data-code="C35" data-type="yes" data-work="Door Cladding / Architraves provided on all Floors"></td>
                            <td class="checkbox-col"><input type="checkbox" data-code="C35" data-type="no" data-work="Door Cladding / Architraves provided on all Floors"></td>
                        </tr>
                        <tr>
                            <td class="code">C36</td>
                            <td class="work-desc">Buffer Block (RCC) in Pit as per GAD</td>
                            <td class="checkbox-col"><input type="checkbox" data-code="C36" data-type="na" data-work="Buffer Block (RCC) in Pit as per GAD"></td>
                            <td class="checkbox-col"><input type="checkbox" data-code="C36" data-type="yes" data-work="Buffer Block (RCC) in Pit as per GAD"></td>
                            <td class="checkbox-col"><input type="checkbox" data-code="C36" data-type="no" data-work="Buffer Block (RCC) in Pit as per GAD"></td>
                        </tr>
                        <tr>
                            <td class="code">C37</td>
                            <td class="work-desc">Dismantling of Scaffolding Completed</td>
                            <td class="checkbox-col"><input type="checkbox" data-code="C37" data-type="na" data-work="Dismantling of Scaffolding Completed"></td>
                            <td class="checkbox-col"><input type="checkbox" data-code="C37" data-type="yes" data-work="Dismantling of Scaffolding Completed"></td>
                            <td class="checkbox-col"><input type="checkbox" data-code="C37" data-type="no" data-work="Dismantling of Scaffolding Completed"></td>
                        </tr>

                          

                        </tbody>
                    </table>
                </div>
                
                <!-- RIGHT COLUMN -->
                <div class="checklist-panel">
                    <table class="checklist-table">
                        <thead>
                            <tr>
                                <th class="code">CODE</th>
                                <th>LIST OF WORKS</th>
                                <th class="checkbox-col">N/A</th>
                                <th class="checkbox-col">YES</th>
                                <th class="checkbox-col">NO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="code">C38</td>
                                <td class="work-desc">Final Painting / Final Finishing Completed</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C38" data-type="na" data-work="Final Painting / Final Finishing Completed"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C38" data-type="yes" data-work="Final Painting / Final Finishing Completed"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C38" data-type="no" data-work="Final Painting / Final Finishing Completed"></td>
                            </tr>
                            <tr>
                                <td class="code">C39</td>
                                <td class="work-desc">Steel Ladder in Lift Pit Provided</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C39" data-type="na" data-work="Steel Ladder in Lift Pit Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C39" data-type="yes" data-work="Steel Ladder in Lift Pit Provided"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C39" data-type="no" data-work="Steel Ladder in Lift Pit Provided"></td>
                            </tr>
                            <tr>
                                <td class="code">C40</td>
                                <td class="work-desc">Cleaning of Pit, Lift Shaft and Door Sills</td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C40" data-type="na" data-work="Cleaning of Pit, Lift Shaft and Door Sills"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C40" data-type="yes" data-work="Cleaning of Pit, Lift Shaft and Door Sills"></td>
                                <td class="checkbox-col"><input type="checkbox" data-code="C40" data-type="no" data-work="Cleaning of Pit, Lift Shaft and Door Sills"></td>
                            </tr>

                          
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`

  frm.set_df_property("custom_quality_checklist", "options", checklisthtml)

  setTimeout(() => {
    bindCheckboxEvents(frm)
    loadSavedChecklist(frm)
  }, 200)
}

function bindCheckboxEvents(frm) {
  $(document).off("change", '.installation-checklist-container input[type="checkbox"]')
  $(document).on("change", '.installation-checklist-container input[type="checkbox"]', function () {
    handleChecklistChange(this, frm)
  })
}

function handleChecklistChange(checkbox, frm) {
  try {
    const $checkbox = $(checkbox)
    const code = $checkbox.data("code")
    const type = $checkbox.data("type")

    if ($checkbox.is(":checked")) {
      // Find all other checkboxes in the same row (same code) and uncheck them
      $(`.installation-checklist-container input[data-code="${code}"]`)
        .not($checkbox)
        .each(function () {
          if ($(this).is(":checked")) {
            $(this).prop("checked", false)
            // Show brief message about switching selection
            // frappe.show_alert(
            //   {
            //     message: `Switched ${code} selection to ${type.toUpperCase()}`,
            //     indicator: "blue",
            //   },
            //   2,
            // )
          }
        })
    }
    var selectedItems = []

    // Get all checked checkboxes
    $('.installation-checklist-container input[type="checkbox"]:checked').each(function () {
      selectedItems.push({
        code: $(this).data("code"),
        work_description: $(this).data("work"),
        checkbox_type: $(this).data("type"),
        is_checked: true,
      })
    })

    frappe.call({
      method: "global_vertical.py.quality_check.set_installation_checklist_status",
      args: {
        task_name: frm.doc.name,
        selected_items: JSON.stringify(selectedItems),
      },
      callback: (response) => {
        console.log("Checklist updated successfully")
      },
      error: (error) => {
        console.error("Error updating checklist:", error)
      },
    })
  } catch (error) {
    console.error("Error in handleChecklistChange:", error)
  }
}

function loadSavedChecklist(frm) {
  if (!frm.doc.name) return

  frappe.call({
    method: "global_vertical.py.quality_check.get_installation_checklist_status",
    args: {
      task_name: frm.doc.name,
    },
    callback: (response) => {
      if (response.message && response.message.length > 0) {
        response.message.forEach((item) => {
          var checkbox = $(
            '.installation-checklist-container input[data-code="' +
              item.code +
              '"][data-type="' +
              item.checkbox_type +
              '"]',
          )
          if (checkbox.length && item.is_checked) {
            checkbox.prop("checked", true)
          }
        })
      }
    },
    error: (error) => {
      console.error("Error loading checklist:", error)
    },
  })
}


function downloadChecklistHTML(frm) {
  try {
    // Check if HTML has data (any checkboxes are checked)
    const checkedBoxes = $('.installation-checklist-container input[type="checkbox"]:checked')

    if (checkedBoxes.length === 0) {
      frappe.show_alert(
        {
          message: "No checklist data found. Please select some items first.",
          indicator: "orange",
        },
        3,
      )
      return
    }

    // Get custom_s_no field value for filename
    const serialNo = frm.doc.custom_s_no || frm.doc.name || "checklist"
    const filename = `Installation_Checklist_${serialNo}.pdf`

    // Generate PDF using Frappe's PDF generation
    generatePDF(frm, filename)
  } catch (error) {
    console.error("Error downloading checklist:", error)
    frappe.show_alert(
      {
        message: "Error downloading checklist",
        indicator: "red",
      },
      3,
    )
  }
}

function generatePDF(frm, filename) {
  const serialNo = frm.doc.custom_s_no || ""
  const htmlContent = generatePDFHTML(frm, serialNo)

  frappe.call({
    method: "global_vertical.py.quality_check.generate_custom_pdf",
    args: {
      name: frm.doc.name,
      html: htmlContent,
      filename: filename,
    },
    freeze: true,  // ✅ shows Frappe’s built-in freeze overlay
    freeze_message: __("Preparing your PDF..."),
    callback: function (r) {
      if (r.message) {
        const pdfBase64 = r.message

        // Create download link for PDF
        const link = document.createElement("a")
        link.href = "data:application/pdf;base64," + pdfBase64
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        frappe.show_alert(
          {
            message: `Checklist downloaded and attached as ${filename}`,
            indicator: "green",
          },
          3,
        )

        frm.reload_doc()
      }
    },
    error: (error) => {
      console.error("Error generating PDF:", error)
      generatePDFViaPrint(frm, filename)
    },
  })
}

function generatePDFViaPrint(frm, filename) {
//   const customerName = frm.doc.customer_name || frm.doc.name
  const serialNo = frm.doc.custom_s_no || ""
//   const currentDate = frappe.datetime.now_datetime()

  // Create a new window with the checklist content
  const printWindow = window.open("", "_blank")
  const htmlContent = generatePDFHTML(frm, serialNo)

  printWindow.document.write(htmlContent)
  printWindow.document.close()

  // Trigger print dialog
  printWindow.onload = () => {
    printWindow.print()
    printWindow.close()
  }

  frappe.show_alert(
    {
      message: "Print dialog opened. Save as PDF from print options.",
      indicator: "blue",
    },
    4,
  )
}

function generatePDFHTML(frm, serialNo) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Installation Checklist - ${serialNo}</title>
    <style>
        @page { margin: 20mm; }
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 0;
            font-size: 12px;
            line-height: 1.4;
        }
        .header { 
            text-align: center; 
            margin-bottom: 20px; 
            border-bottom: 2px solid #0b66b3;
            padding-bottom: 10px;
        }
        .info { 
            background: #f5f5f5; 
            padding: 10px; 
            margin-bottom: 20px; 
            border-radius: 4px;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 20px; 
            font-size: 11px;
        }
        th, td { 
            border: 1px solid #ddd; 
            padding: 6px; 
            text-align: left; 
        }
        th { 
            background-color: #0b66b3; 
            color: white;
            font-weight: bold;
        }
        .checked { 
            background-color: #d4edda; 
            text-align: center;
            font-weight: bold;
        }
        .code { 
            font-weight: bold; 
            color: #0b66b3; 
            text-align: center;
            width: 60px;
        }
        .work-desc { font-size: 10px; }
        .checkbox-col { 
            width: 50px; 
            text-align: center; 
        }
        .section-title {
            background: #0b66b3;
            color: white;
            padding: 8px;
            text-align: center;
            font-weight: bold;
            margin: 20px 0 10px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Installation Checklist - Civil & Electrical</h1>
        <div class="info">
            <strong>Serial No:</strong> ${serialNo} | 
        </div>
    </div>
    <div style="margin-top: 30px; font-size: 10px; color: #666;">
        <p><strong>Note:</strong> As per our meeting & discussions today at site, please complete the following Pending Civil & Electrical works marked as ...NO... An early action shall be highly appreciated.</p>
    </div>`



  const civilBeforeCodes = {}
  const electricalCodes = {}
  const civilDuringCodes = {}

  // Collect and separate codes into 3 groups
  $('.installation-checklist-container input[type="checkbox"]').each(function () {
    const $checkbox = $(this)
    const code = $checkbox.data("code")
    const work = $checkbox.data("work")
    const type = $checkbox.data("type")
    const isChecked = $checkbox.is(":checked")

    let targetObj
    if (code.startsWith("C")) {
      const codeNumber = Number.parseInt(code.substring(1))
      if (codeNumber >= 1 && codeNumber <= 34) {
        targetObj = civilBeforeCodes
      } else if (codeNumber >= 35 && codeNumber <= 40) {
        targetObj = civilDuringCodes
      }
    } else if (code.startsWith("E")) {
      targetObj = electricalCodes
    }

    if (targetObj) {
      if (!targetObj[code]) {
        targetObj[code] = {
          work: work,
          na: false,
          yes: false,
          no: false,
        }
      }

      if (isChecked) {
        targetObj[code][type] = true
      }
    }
  })

  function sortAlphanumeric(a, b) {
    const aMatch = a.match(/^([A-Z]+)(\d+)$/)
    const bMatch = b.match(/^([A-Z]+)(\d+)$/)

    if (aMatch && bMatch) {
      const aPrefix = aMatch[1]
      const bPrefix = bMatch[1]
      const aNumber = Number.parseInt(aMatch[2])
      const bNumber = Number.parseInt(bMatch[2])

      if (aPrefix !== bPrefix) {
        return aPrefix.localeCompare(bPrefix)
      }

      return aNumber - bNumber
    }

    return a.localeCompare(b)
  }

  // Section 1: Civil Works Before Installation (C1-C34)
  if (Object.keys(civilBeforeCodes).length > 0) {
    html += `
    <div class="section-title">CIVIL WORKS REQUIRED TO BE COMPLETED BEFORE START OF INSTALLATION</div>
    <table>
        <thead>
            <tr>
                <th class="code">Code</th>
                <th>Work Description</th>
                <th class="checkbox-col">N/A</th>
                <th class="checkbox-col">YES</th>
                <th class="checkbox-col">NO</th>
            </tr>
        </thead>
        <tbody>`

    Object.keys(civilBeforeCodes)
      .sort(sortAlphanumeric)
      .forEach((code) => {
        const data = civilBeforeCodes[code]
        html += `<tr>
        <td class="code">${code}</td>
        <td class="work-desc">${data.work}</td>
        <td class="checkbox-col ${data.na ? "checked" : ""}">
          ${data.na ? "✓" : ""}
        </td>
        <td class="checkbox-col ${data.yes ? "checked" : ""}">
          ${data.yes ? "✓" : ""}
        </td>
        <td class="checkbox-col ${data.no ? "checked" : ""}">
          ${data.no ? "✓" : ""}
        </td>
      </tr>`
      })

    html += `</tbody></table>`
  }

  // Section 2: Electrical Works (E1-E16)
  if (Object.keys(electricalCodes).length > 0) {
    html += `
    <div class="section-title">ELECTRICAL WORKS REQUIRED BEFORE START OF INSTALLATION</div>
    <table>
        <thead>
            <tr>
                <th class="code">Code</th>
                <th>Work Description</th>
                <th class="checkbox-col">N/A</th>
                <th class="checkbox-col">YES</th>
                <th class="checkbox-col">NO</th>
            </tr>
        </thead>
        <tbody>`

    Object.keys(electricalCodes)
      .sort(sortAlphanumeric)
      .forEach((code) => {
        const data = electricalCodes[code]
        html += `<tr>
        <td class="code">${code}</td>
        <td class="work-desc">${data.work}</td>
        <td class="checkbox-col ${data.na ? "checked" : ""}">
          ${data.na ? "✓" : ""}
        </td>
        <td class="checkbox-col ${data.yes ? "checked" : ""}">
          ${data.yes ? "✓" : ""}
        </td>
        <td class="checkbox-col ${data.no ? "checked" : ""}">
          ${data.no ? "✓" : ""}
        </td>
      </tr>`
      })

    html += `</tbody></table>`
  }

  // Section 3: Civil Works During Installation (C35-C40)
  if (Object.keys(civilDuringCodes).length > 0) {
    html += `
    <div class="section-title">CIVIL WORKS REQUIRED DURING INSTALLATION</div>
    <table>
        <thead>
            <tr>
                <th class="code">Code</th>
                <th>Work Description</th>
                <th class="checkbox-col">N/A</th>
                <th class="checkbox-col">YES</th>
                <th class="checkbox-col">NO</th>
            </tr>
        </thead>
        <tbody>`

    Object.keys(civilDuringCodes)
      .sort(sortAlphanumeric)
      .forEach((code) => {
        const data = civilDuringCodes[code]
        html += `<tr>
        <td class="code">${code}</td>
        <td class="work-desc">${data.work}</td>
        <td class="checkbox-col ${data.na ? "checked" : ""}">
          ${data.na ? "✓" : ""}
        </td>
        <td class="checkbox-col ${data.yes ? "checked" : ""}">
          ${data.yes ? "✓" : ""}
        </td>
        <td class="checkbox-col ${data.no ? "checked" : ""}">
          ${data.no ? "✓" : ""}
        </td>
      </tr>`
      })

    html += `</tbody></table>`
  }

  html += `
    
</body></html>`

  return html
}

function attachPDFToDocument(frm, pdfBase64, filename) {
  frappe.call({
    method: "frappe.handler.upload_file",
    args: {
      filename: filename,
      filedata: pdfBase64,
      attached_to_doctype: frm.doc.doctype,
      attached_to_name: frm.doc.name,
      folder: "Home/Attachments",
      is_private: 0,
    },
    callback: (response) => {
      if (response.message) {
        frm.reload_doc()
      }
    },
  })
}


function clearChecklist(frm) {
  try {
    // 1. Uncheck all checkboxes in the UI
    $('.installation-checklist-container input[type="checkbox"]').prop("checked", false)

    // 2. Clear from backend also
    frappe.call({
      method: "global_vertical.py.quality_check.set_installation_checklist_status",
      args: {
        task_name: frm.doc.name,
        selected_items: JSON.stringify([]), // send empty list to clear
      },
      callback: function (r) {
        frappe.show_alert({ message: "Checklist Cleared successfully", indicator: "green" })
      },
      error: function (err) {
        console.error("Error clearing checklist:", err)
      },
    })
  } catch (error) {
    console.error("Error in clearChecklist:", error)
  }
}
