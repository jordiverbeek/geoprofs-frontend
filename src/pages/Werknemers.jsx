import React from 'react';

const werknemers = [
    { naam: "Nick Verbeek", email: "nick@geoprofs.com", groep: "GeoICT > Ontwikkeling" },
    { naam: "Finn Swanenberg", email: "Finn@geoprofs.com", groep: "GeoICT > Scanning" },
    { naam: "Finn Swanenberg", email: "Finn@geoprofs.com", groep: "GeoICT > Testing" },
];

const url = new URL("https://geoprofs-backend.vacso.cloud/api/users");

const headers = {
    "Authorization": "Bearer 8hIKDjTaA6aMLLKb0eo3lOBqKBNhwBHWyx8CKFy3f9b16dd8",
}

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
                <WerknemerKaart
                    key={index}
                    naam={werknemer.naam}
                    email={werknemer.email}
                />
            ))}
        </div>
    </div>
);

const Werknemers = () => {
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
                <h1>Werknemers</h1>
                <button className="toevoegen-knop">Werknemer toevoegen</button>
            </header>
            {Object.entries(gegroepeerdeWerknemers).map(([groepNaam, groepWerknemers], index) => (
                <WerknemerGroep
                    key={index}
                    groepNaam={groepNaam}
                    werknemers={groepWerknemers}
                />
            ))}
        </section>
    );
};

export default Werknemers;
