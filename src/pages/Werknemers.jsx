import React from 'react';

const werknemers = [
    { naam: "Nick Verbeek", email: "nick@geoprofs.com", groep: "GeoICT > Ontwikkeling" },
    { naam: "Jordi Josten", email: "Jordi@geoprofs.com", groep: "GeoICT > Ontwikkeling" },
    { naam: "Jordi Josten", email: "Jordi@geoprofs.com", groep: "GeoICT > Ontwikkeling" },
    { naam: "Jordi Josten", email: "Jordi@geoprofs.com", groep: "GeoICT > Ontwikkeling" },
    { naam: "Jordi Josten", email: "Jordi@geoprofs.com", groep: "GeoICT > Ontwikkeling" },
    { naam: "Jordi Josten", email: "Jordi@geoprofs.com", groep: "GeoICT > Ontwikkeling" },
    { naam: "Jordi Josten", email: "Jordi@geoprofs.com", groep: "GeoICT > Ontwikkeling" },
    { naam:     "Jordi Josten", email: "Jordi@geoprofs.com", groep: "GeoICT > Ontwikkeling" },
    { naam: "Finn Swanenberg", email: "Finn@geoprofs.com", groep: "GeoICT > Scanning" },
    // Voeg meer werknemers toe hier...
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
        <div className="app">
            <header className="app-header">
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
        </div>
    );
};

export default Werknemers;
