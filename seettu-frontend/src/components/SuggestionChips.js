import React from 'react';
import { useTranslation } from 'react-i18next';

function SuggestionChips({ onSelectChip }) {
  const { t } = useTranslation();

  const chips = [
    { id: 'balance', labelKey: 'suggestions.balance' },
    { id: 'payment', labelKey: 'suggestions.payment' },
    { id: 'score', labelKey: 'suggestions.score' }
  ];

  return (
    <div className="suggestion-chips">
      {chips.map((chip) => (
        <button
          key={chip.id}
          className="chip-btn"
          onClick={() => onSelectChip(t(chip.labelKey))}
        >
          {t(chip.labelKey)}
        </button>
      ))}
    </div>
  );
}

export default SuggestionChips;