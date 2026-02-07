import React from 'react';

function BadgeCard({ badge }) {
  const rarityColors = {
    common: 'bg-gray-100 border-gray-300',
    rare: 'bg-blue-100 border-blue-300',
    epic: 'bg-purple-100 border-purple-300',
    legendary: 'bg-yellow-100 border-yellow-300'
  };

  const rarityIcons = {
    common: '🥉',
    rare: '🥈',
    epic: '🥇',
    legendary: '👑'
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${rarityColors[badge.rarity] || rarityColors.common}`}>
      <div className="text-center">
        <div className="text-3xl mb-2">
          {badge.icon || rarityIcons[badge.rarity] || '🏆'}
        </div>
        <h3 className="font-semibold text-lg mb-1">{badge.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
          badge.rarity === 'legendary' ? 'bg-yellow-200 text-yellow-800' :
          badge.rarity === 'epic' ? 'bg-purple-200 text-purple-800' :
          badge.rarity === 'rare' ? 'bg-blue-200 text-blue-800' :
          'bg-gray-200 text-gray-800'
        }`}>
          {badge.rarity}
        </span>
      </div>
    </div>
  );
}

export default BadgeCard;