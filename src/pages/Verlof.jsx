import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Verlof = () => {
     const [verlofAanvragen, setVerlofAanvragen] = useState([]); // Stores all leave requests
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          fetchVerlofAanvragen();
     }, []);

     const fetchVerlofAanvragen = () => {
          setLoading(true);
          axios.get("https://geoprofs-backend.vacso.cloud/api/attendance", {
                    headers: {
                         authorization: `Bearer ${Cookies.get("bearer_token")}`,
                    },
               })
               .then((response) => {
                    setVerlofAanvragen(response.data.attendances);
                    console.log(response.data.attendances);
               })
               .catch((error) => {
                    console.error("Error:", error);
               })
               .finally(() => {
                    setLoading(false);
               });

     };

     const handleAction = (id, status) => {

          if (status === "goedgekeurd") {
               axios.post(`https://geoprofs-backend.vacso.cloud/api/attendance/${id}/approve`, {
                    id: id,
                    count_to_total: true,
               }, {
                    headers: {
                         authorization: `Bearer ${Cookies.get("bearer_token")}`,
                    },
               })
                    .then((response) => {
                         console.log(response);
                         fetchVerlofAanvragen();
                    })
                    .catch((error) => {
                         console.error("Error:", error);
                    });
          } else if (status === "afgewezen") {
               axios.post(`https://geoprofs-backend.vacso.cloud/api/attendance/${id}/deny`,  {
                    id: id,
               }, {
                    headers: {
                         authorization: `Bearer ${Cookies.get("bearer_token")}`,
                    },
               })
                    .then((response) => {
                         console.log(response);
                         fetchVerlofAanvragen();
                    })
                    .catch((error) => {
                         console.error("Error:", error);
                    });
          } else {

          }
     };

     return (
          <section className="verlof">
               <div className="header-verlof">
                    <h2>Verlof</h2>
               </div>
               <div className="verlof-content">
                    <div className="verlof-aanvragen">
                         <div className="verlof-aanvragen-content">
                              {loading ? (
                                   <p>Loading...</p>
                              ) : verlofAanvragen.length > 0 ? (
                                   <>
                                        {verlofAanvragen.map((aanvraag) => (
                                             <div key={aanvraag.id} className="verlof-card">
                                                  <p><strong>Naam:</strong> {aanvraag.user.first_name + " " + aanvraag.user.sure_name}</p>
                                                  {aanvraag.morning === aanvraag.afternoon ? (
                                                       <p><strong>Heledag:</strong> {aanvraag.morning}</p>
                                                       
                                                  ) : (
                                                       <>
                                                            <p><strong>Ochtend:</strong> {aanvraag.morning}</p>
                                                            <p><strong>Middag:</strong> {aanvraag.afternoon}</p>

                                                       </>
                                                  )}
                                                  <p><strong>Datum:</strong> {aanvraag.day.date}</p>
                                                  <p><strong>Status:</strong> {aanvraag.attendance_status}</p>

                                                  {/* Buttons for manager actions */}
                                                  {aanvraag.status === "goedgekeurd" ? (
                                                       <p className="approved-text">✅ Goedgekeurd</p>
                                                  ) : aanvraag.status === "afgewezen" ? (
                                                       <p className="rejected-text">❌ Afgewezen</p>
                                                  ) : (
                                                       <div className="button-container">
                                                            <button className="approve-btn" onClick={() => handleAction(aanvraag.id, "goedgekeurd")}>Toestaan</button>
                                                            <button className="reject-btn" onClick={() => handleAction(aanvraag.id, "afgewezen")}>Afwijzen</button>
                                                       </div>
                                                  )}
                                             </div>
                                        ))}
                                   </>
                              ) : (
                                   <p>Geen verlof aanvragen beschikbaar.</p>
                              )}
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Verlof;
