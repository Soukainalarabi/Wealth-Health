import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button` width: 29px !important;
height: 26px !important;
&.jourNumber{
  border: none;
  background-color: white;
}
&.jourNumber-actuel {
  background-color: #6e8511;
}
`;

const StyledTable = styled.table`border-collapse: collapse;
border: 2px solid #6e8511;
  padding: 10px;
  width: 100%;
  th,
td {
    border: 1px solid #6e8511;
    padding: 8px;
  
}
  `;
const StyledBody = styled.tbody`  border: 2px solid #6e8511;
  `;

export default function Calendrier({ onButtonClick }) {
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
  const firstDay = new Date(annee, mois, 1).getDay();
  const lastDay = new Date(annee, mois + 1, 0).getDate();

  const joursDansMois = useMemo(() => {
    const joursPrecedents = Array.from({ length: firstDay }, () => null);
    const joursCourants = Array.from({ length: lastDay }, (_, index) => index + 1);
    return [...joursPrecedents, ...joursCourants];
  }, [firstDay, lastDay]);
  const dateAujourdui = `${moisNames[mois]} ${annee}`;

  const handleMoisPrecedent = () => {
    const nouveauMois = (mois - 1 + 12) % 12;
    setMois(nouveauMois);
  };

  const handleAnneePrecedente = () => {
    const nouvelleAnnee = (annee - 1);
    setAnnee(nouvelleAnnee);
  };

  const handleAnneeSuivante = () => {
    const nouvelleAnnee = (annee + 1);
    setAnnee(nouvelleAnnee);
  };

  const handleMoisSuivant = () => {
    const nouveauMois = (mois + 1 + 12) % 12;
    setMois(nouveauMois);
  };

  const handleButtonClick = (jourDuMois) => {
    const formattedDate = `${mois + 1}/${jourDuMois}/${annee}`;
    onButtonClick(new Date(formattedDate));
  };

  return (
    <div className="container">
      <StyledTable className="cal_calendrier">
        <StyledBody id="cal_body">
          <tr>
            <th colSpan="1">
              <button className="buttonMois" type="button" onClick={handleAnneePrecedente}>{'<<'}</button>
            </th>
            <th colSpan="1">
              <button className="buttonMois" type="button" onClick={handleMoisPrecedent}>{'<'}</button>
            </th>
            <th colSpan="3">{dateAujourdui}</th>
            <th colSpan="1">
              <button className="buttonMois" type="button" onClick={handleMoisSuivant}>
                {' '}
                {'>'}
              </button>
            </th>
            <th colSpan="1">
              {' '}
              <button className="buttonMois" type="button" onClick={handleAnneeSuivante}>
                {' '}
                {'>>'}
              </button>
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
          {/* //Définir la longueur du tab */}
          {Array.from({ length: joursDansMois.length / 6 }, (row, rowIndex) => (
            <tr className={`semaine${rowIndex}`} key={`semaine${rowIndex}`}>
              {joursDansMois.slice(rowIndex * 7, (rowIndex + 1) * 7).map((jourDuMois, index) => (
                <td key={`jour${jourDuMois !== null ? jourDuMois : `null${index}`}`} className={`jour${jourDuMois !== null ? jourDuMois : `null${index}`}`}>
                  {jourDuMois !== null ? (
                    <StyledButton
                      className={jour === jourDuMois ? 'jourNumber-actuel' : 'jourNumber'}
                      type="button"
                      onClick={() => handleButtonClick(jourDuMois)}
                    >
                      {jourDuMois}
                    </StyledButton>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}

        </StyledBody>
      </StyledTable>
    </div>
  );
}
Calendrier.propTypes = {
  onButtonClick: PropTypes.func,
};
Calendrier.defaultProps = {
  onButtonClick: () => { },
};
