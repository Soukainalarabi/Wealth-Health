import React, {  useMemo, useState } from 'react';

export default function Calendrier({ onButtonClick })  {

  const date = new Date();
  const [mois, setMois] = useState(date.getMonth()); 
  const [annee, setAnnee] = useState(date.getFullYear()); 


  const jour = date.getDate();
  const moisNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  const joursDansMois = useMemo(() => {
    const firstDay = new Date(annee, mois, 1).getDay();
    const lastDay = new Date(annee, mois + 1, 0).getDate();
    const jours = [];

    for (let i = 0; i < firstDay; i++) {
      jours.push(null); // Ajouter des espaces vides pour les jours du mois précédent
    }

    for (let i = 1; i <= lastDay; i++) {
      jours.push(i); // Ajouter les jours du mois en cours
    }

    return jours;
  }, [annee, mois]);

  const dateAujourdui = `${moisNames[mois]} ${annee}`;
  const handleMoisPrecedent = () => {
    const nouveauMois = (mois - 1 + 12) % 12;
    setMois(nouveauMois);
  };
  const handleAnneePrecedente = () => {
    const nouvelleAnnee = (annee - 1)
    setAnnee(nouvelleAnnee);
  };
  const handleAnneeSuivante = () => {
    const nouvelleAnnee = (annee + 1)
    setAnnee(nouvelleAnnee);
  };
  const handleMoisSuivant = () => {
    const nouveauMois = (mois + 1 + 12) % 12;
    setMois(nouveauMois);
  };
  const handleButtonClick = (jourDuMois) => {
    const formattedDate = `${jourDuMois}/${mois + 1}/${annee}`;
    onButtonClick(formattedDate); 
  };
  return (
    <div className="container">
      <table className="cal_calendrier">
        <tbody id="cal_body">
          <tr>
            <th colSpan="1">
            <button className="buttonMois" type="button" onClick={handleAnneePrecedente}>{"<<"}</button>
            </th>
            <th colSpan="1"> 
            <button className="buttonMois" type="button" onClick={handleMoisPrecedent}>{"<"}</button>
            </th>
            <th colSpan="3">{dateAujourdui}</th>
            <th colSpan="1">              
            <button className="buttonMois" type="button" onClick={handleMoisSuivant}> {">"}</button>
            </th>
            <th colSpan="1">              <button className="buttonMois" type="button" onClick={handleAnneeSuivante}> {">>"}</button>
            </th>


          </tr>
          <tr className="cal_j_semaines">
            <th>Dim</th>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mer</th>
            <th>Jeu</th>
            <th>Ven</th>
            <th>Sam</th>
          </tr>
          {joursDansMois.map((jourDuMois, index) => (
              <React.Fragment key={index}>

              {/* Retourner à la ligne après chaque rangée de 7 jours  */}
              {index % 7 === 0 && <tr />}
              <td key={index}>
                {jourDuMois !== null ? (
                  <button
                    className={jour === jourDuMois ? "jourNumber-actuel" : "jourNumber"}
                    type="button" onClick={() => handleButtonClick(jourDuMois)}
                  >
                    {jourDuMois}
                  </button>
                ) : null}
              </td>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}