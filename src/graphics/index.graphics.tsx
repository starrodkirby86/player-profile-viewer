import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { useReplicant } from '@nodecg/react-hooks';
import { PlayerProfile } from '../types/schemas';
import { ToJson } from './util';
import Placeholder from './placeholder.png';
import './index.graphics.css';

type PlayerProfileJson = ToJson<PlayerProfile>;

function numberToOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const Index = () => {
  const [playerProfile, setPlayerProfile] = useReplicant<PlayerProfileJson>('playerProfile', {
    bundle: "Kirby's Quickstart",
  });

  if (!playerProfile) return <div />;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#4f7cac] p-6 rounded-lg w-full max-w-[80%] h-[80vh]">
        <div className="flex space-x-4">
          <div className="avatar">
            <div className="w-64 rounded">
              <img
                src={playerProfile.profile_picture ? playerProfile.profile_picture : Placeholder}
              />
            </div>
          </div>
          <div>
            <h1 className="text-white text-8xl font-rem font-black">
              {playerProfile.team && `${playerProfile.team} | `}
              {playerProfile.gamertag}
            </h1>
            <h3 className="text-blue-200 text-6xl font-rem font-italic font-bold">
              {playerProfile.region}{' '}
              {playerProfile.seed && `(${numberToOrdinal(playerProfile.seed)} seed)`}
            </h3>
          </div>
        </div>
        <p className="text-white mt-4 text-6xl font-semibold whitespace-pre-line">
          {playerProfile.description}
        </p>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Index />);
