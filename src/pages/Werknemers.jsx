import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Register from './Register'; // Zorg ervoor dat de Register component beschikbaar is

const url = new URL("https://geoprofs-backend.vacso.cloud/api/users");

const headers = {
    "Authorization": "Bearer f4bQSBpfssoJEsvhdzqyI4VYQGCLI8gTcKhkbhJo297ef086",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response => response.json()).then(data => console.log(data));

const werknemers = [
    { naam: "Nick Verbeek", email: "nick@geoprofs.com", groep: "GeoICT > Ontwikkeling" },
    { naam: "Finn Swanenberg", email: "Finn@geoprofs.com", groep: "GeoICT > Scanning" },
    { naam: "Finn Swanenberg", email: "Finn@geoprofs.com", groep: "GeoICT > Testing" },
];

const WerknemerKaart = ({ naam, email }) => (
    <div className="werknemer-kaart">
        <img
            src="images/harold-jonker-vierkant.jpg"
            alt="Profielfoto"
            className="werknemer-foto"
        />
        <div className="werknemer-info">
            <h4>{naam}</h4>
            <p>{email}</p>
        </div>
    </div>
);

const WerknemerGroep = ({ groepNaam, werknemers }) => (
    <div className="werknemer-groep">
        <div className="groep-naam">
            <h3>{groepNaam}</h3>
            <hr />
        </div>
        <div className="werknemer-lijst">
            {werknemers.map((werknemer, index) => (
                <WerknemerKaart key={index} naam={werknemer.naam} email={werknemer.email} />
            ))}
        </div>
    </div>
);

const Werknemers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const gegroepeerdeWerknemers = werknemers.reduce((groepen, werknemer) => {
        if (!groepen[werknemer.groep]) {
            groepen[werknemer.groep] = [];
        }
        groepen[werknemer.groep].push(werknemer);
        return groepen;
    }, {});

    return (
        <section className='werknemers'>
            <header className="header">
                <h1 className='werknemers-header'>Werknemers</h1>
                <button className="toevoegen-knop" onClick={handleModalOpen}>
                    <FontAwesomeIcon className='icon-plus' icon={faPlus} />
                    Werknemer toevoegen
                </button>
            </header>

            {Object.entries(gegroepeerdeWerknemers).map(([groepNaam, groepWerknemers], index) => (
                <WerknemerGroep key={index} groepNaam={groepNaam} werknemers={groepWerknemers} />
            ))}

            {/* Modal voor Register Formulier */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={handleModalClose} className="close-button">Sluiten</button>
                        <Register />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Werknemers;
